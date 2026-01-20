import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Map, Marker, NavigationControl, FullscreenControl, Source, Layer } from 'react-map-gl';
import Fuse from 'fuse.js';
import { lineString } from '@turf/turf';
import mapboxClient from '@mapbox/mapbox-sdk/services/directions';
import mapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import "mapbox-gl/dist/mapbox-gl.css";
import sncfData from './data/SNCF.json';
import ratpData from './data/RATP.json';

const directionsClient = mapboxClient({ 
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN || 'pk.eyJ1IjoidHJpYnVubmV4dXMiLCJhIjoiY200OG10bGk1MDFmcjJscjZwczV5MXByOSJ9.QjjFUOHEaNEUw2SfQjCGZw'
});

const geocodingClient = mapboxGeocoding({ 
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN || 'pk.eyJ1IjoidHJpYnVubmV4dXMiLCJhIjoiY200OG10bGk1MDFmcjJscjZwczV5MXByOSJ9.QjjFUOHEaNEUw2SfQjCGZw'
});

const fuseOptions = {
  keys: ['nom', 'stop_name'],
  threshold: 0.3,
  distance: 100
};

const calculateDistance = (point1, point2) => {
  const R = 6371e3;
  const φ1 = point1.lat * Math.PI / 180;
  const φ2 = point2.lat * Math.PI / 180;
  const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
  const Δλ = (point2.lon - point1.lon) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

const findNearestStation = (point, stations, maxDistance = 1000) => {
  const validStations = stations
    .map(station => {
      const coords = station.type === 'SNCF' 
        ? station.position_geographique 
        : station.stop_point_geopoint;
      
      if (!coords || typeof coords.lat !== 'number' || typeof coords.lon !== 'number') return null;

      return {
        ...station,
        distance: calculateDistance(
          { lat: point.lat, lon: point.lon },
          { lat: coords.lat, lon: coords.lon }
        )
      };
    })
    .filter(Boolean)
    .filter(station => station.distance < maxDistance)
    .sort((a, b) => a.distance - b.distance);

  return validStations[0] || null;
};

export default function Itinerary() {
  const [viewport, setViewport] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [routeSteps, setRouteSteps] = useState([]);
  const [isRouting, setIsRouting] = useState(false);
  const [transportMode, setTransportMode] = useState('public');
  const [activeInput, setActiveInput] = useState(null);

  const combinedData = useMemo(() => {
    const sncf = sncfData
      .filter(station => 
        station.position_geographique &&
        typeof station.position_geographique.lat === 'number' &&
        typeof station.position_geographique.lon === 'number'
      )
      .map(station => ({ ...station, type: 'SNCF' }));
    
    const ratp = ratpData
      .filter(station => 
        station.stop_point_geopoint &&
        typeof station.stop_point_geopoint.lat === 'number' &&
        typeof station.stop_point_geopoint.lon === 'number'
      )
      .map(station => ({ ...station, type: 'RATP' }));
    
    return [...sncf, ...ratp];
  }, []);

  const fuse = useMemo(() => new Fuse(combinedData, fuseOptions), [combinedData]);
  
  useEffect(() => {
    if (searchQuery.length > 1) {
      const stationResults = fuse.search(searchQuery).map(r => r.item);
      
      geocodingClient.forwardGeocode({
        query: searchQuery,
        limit: 5,
        countries: ['fr'],
        types: ['address', 'poi', 'place']
      }).send()
      .then(response => {
        if (!response.body?.features) return;
        const geoResults = response.body.features.map(feature => ({
          type: 'geocoded',
          name: feature.place_name,
          coordinates: feature.center
        }));
        setSearchResults([...stationResults, ...geoResults]);
      })
      .catch(error => {
        console.error('Geocoding error:', error);
        setSearchResults(stationResults);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, fuse]);

  const handleResultSelect = useCallback((result) => {
    let point;
    
    if (result.type === 'SNCF' || result.type === 'RATP') {
      const coords = result.type === 'SNCF' 
        ? result.position_geographique 
        : result.stop_point_geopoint;
      if (!coords?.lat || !coords?.lon) return;
      point = { lat: coords.lat, lon: coords.lon, name: result.nom || result.stop_name };
    } else {
      if (!result.coordinates?.[0] || !result.coordinates?.[1]) return;
      point = { lat: result.coordinates[1], lon: result.coordinates[0], name: result.name };
    }

    activeInput === 'start' ? setStartPoint(point) : setEndPoint(point);
    setSearchQuery('');
    setActiveInput(null);
  }, [activeInput]);

  const calculateRoute = useCallback(async () => {
    if (!startPoint || !endPoint) return;

    setIsRouting(true);
    setRouteData(null);
    setRouteSteps([]);

    try {
      if (transportMode === 'driving') {
        const response = await directionsClient.getDirections({
          profile: 'driving',
          waypoints: [
            { coordinates: [startPoint.lon, startPoint.lat] },
            { coordinates: [endPoint.lon, endPoint.lat] }
          ],
          geometries: 'geojson',
          steps: true
        }).send();

        if (response.body.routes?.[0]) {
          setRouteData({
            type: 'FeatureCollection',
            features: [{
              ...response.body.routes[0].geometry,
              properties: { routeType: 'driving' }
            }]
          });
          setRouteSteps(response.body.routes[0].legs[0].steps);
        }
      } else {
        const startStation = findNearestStation(startPoint, combinedData);
        const endStation = findNearestStation(endPoint, combinedData);

        if (!startStation || !endStation) {
          throw new Error('Aucune station trouvée dans un rayon de 1km');
        }

        const getStationCoords = (station) => {
          if (station.type === 'SNCF') {
            return station.position_geographique;
          }
          return station.stop_point_geopoint;
        };

        const startCoords = getStationCoords(startStation);
        const endCoords = getStationCoords(endStation);

        if (!startCoords || !endCoords) {
          throw new Error('Coordonnées de station invalides');
        }

        const [walkToStation, walkFromStation] = await Promise.all([
          directionsClient.getDirections({
            profile: 'walking',
            waypoints: [
              { coordinates: [startPoint.lon, startPoint.lat] },
              { coordinates: [startCoords.lon, startCoords.lat] }
            ],
            geometries: 'geojson',
            steps: true
          }).send(),
          
          directionsClient.getDirections({
            profile: 'walking',
            waypoints: [
              { coordinates: [endCoords.lon, endCoords.lat] },
              { coordinates: [endPoint.lon, endPoint.lat] }
            ],
            geometries: 'geojson',
            steps: true
          }).send()
        ]);

        if (!walkToStation.body.routes?.[0] || !walkFromStation.body.routes?.[0]) {
          throw new Error('Impossible de calculer les trajets piétons');
        }

        const transitRoute = lineString(
          [[startCoords.lon, startCoords.lat], [endCoords.lon, endCoords.lat]],
          { properties: { routeType: 'transit' } }
        );

        setRouteData({
          type: 'FeatureCollection',
          features: [
            { ...walkToStation.body.routes[0].geometry, properties: { routeType: 'walking' } },
            transitRoute,
            { ...walkFromStation.body.routes[0].geometry, properties: { routeType: 'walking' } }
          ]
        });

        const transitDistance = calculateDistance(
          { lat: startCoords.lat, lon: startCoords.lon },
          { lat: endCoords.lat, lon: endCoords.lon }
        );

        const transitDuration = Math.round(transitDistance / 5000 * 60);

        setRouteSteps([
          ...walkToStation.body.routes[0].legs[0].steps,
          {
            maneuver: {
              instruction: `Prendre le ${startStation.type} à ${startStation.nom || startStation.stop_name}`,
              type: 'transit'
            },
            duration: transitDuration,
            distance: transitDistance
          },
          ...walkFromStation.body.routes[0].legs[0].steps
        ]);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setRouteSteps([{ 
        maneuver: { 
          instruction: error.message || 'Erreur lors du calcul de l\'itinéraire' 
        } 
      }]);
    }
    setIsRouting(false);
  }, [startPoint, endPoint, transportMode, combinedData]);

  const renderRoute = () => {
    if (!routeData) return null;

    return (
      <Source id="route" type="geojson" data={routeData}>
        {transportMode === 'driving' ? (
          <Layer
            id="route-driving"
            type="line"
            paint={{
              'line-color': '#FF5722',
              'line-width': 4,
              'line-opacity': 0.8
            }}
            filter={['==', ['get', 'routeType'], 'driving']}
          />
        ) : (
          <>
            <Layer
              id="route-walking"
              type="line"
              paint={{
                'line-color': '#4CAF50',
                'line-width': 4,
                'line-dasharray': [2, 2]
              }}
              filter={['==', ['get', 'routeType'], 'walking']}
            />
            <Layer
              id="route-transit"
              type="line"
              paint={{
                'line-color': '#3F51B5',
                'line-width': 6,
                'line-opacity': 0.7
              }}
              filter={['==', ['get', 'routeType'], 'transit']}
            />
          </>
        )}
      </Source>
    );
  };

  const renderMarkers = () => (
    <>
      {startPoint && (
        <Marker longitude={startPoint.lon} latitude={startPoint.lat}>
          <div style={{ 
            width: 16, 
            height: 16, 
            background: '#4CAF50', 
            borderRadius: '50%', 
            border: '2px solid white',
            boxShadow: '0 0 5px rgba(0,0,0,0.3)'
          }} />
        </Marker>
      )}

      {endPoint && (
        <Marker longitude={endPoint.lon} latitude={endPoint.lat}>
          <div style={{ 
            width: 16, 
            height: 16, 
            background: '#F44336', 
            borderRadius: '50%', 
            border: '2px solid white',
            boxShadow: '0 0 5px rgba(0,0,0,0.3)'
          }} />
        </Marker>
      )}
    </>
  );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ 
        width: '350px', 
        padding: '20px', 
        backgroundColor: 'white', 
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)', 
        overflowY: 'auto'
      }}>
        <h2>Planificateur de trajet</h2>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setTransportMode('driving')}
              style={{
                padding: '8px 16px',
                backgroundColor: transportMode === 'driving' ? '#2196F3' : '#eee',
                color: transportMode === 'driving' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Voiture
            </button>
            <button
              onClick={() => setTransportMode('public')}
              style={{
                padding: '8px 16px',
                backgroundColor: transportMode === 'public' ? '#4CAF50' : '#eee',
                color: transportMode === 'public' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Transports Publics
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <h4>Départ</h4>
            <input
              type="text"
              placeholder="Adresse de départ..."
              value={activeInput === 'start' ? searchQuery : (startPoint?.name || '')}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveInput('start');
              }}
              onFocus={() => {
                setActiveInput('start');
                setSearchQuery(startPoint?.name || '');
              }}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>

          <div>
            <h4>Arrivée</h4>
            <input
              type="text"
              placeholder="Adresse d'arrivée..."
              value={activeInput === 'end' ? searchQuery : (endPoint?.name || '')}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveInput('end');
              }}
              onFocus={() => {
                setActiveInput('end');
                setSearchQuery(endPoint?.name || '');
              }}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>

        {activeInput && searchResults.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            {searchResults.slice(0, 5).map((result, index) => (
              <div
                key={index}
                onClick={() => handleResultSelect(result)}
                style={{
                  padding: '10px',
                  margin: '5px 0',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: '1px solid #eee'
                }}
              >
                <div style={{ fontWeight: '500' }}>
                  {result.type === 'geocoded' ? result.name : (result.nom || result.stop_name)}
                </div>
                <div style={{ fontSize: '0.8em', color: '#666' }}>
                  {result.type === 'geocoded' ? 'Adresse' : result.type}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={calculateRoute}
          disabled={!startPoint || !endPoint || isRouting}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {isRouting ? 'Calcul en cours...' : 'Calculer l\'itinéraire'}
        </button>

        {routeSteps.length > 0 && (
          <div>
            <h3>Instructions :</h3>
            <div style={{ marginTop: '10px' }}>
              {routeSteps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    margin: '8px 0',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    borderLeft: `4px solid ${
                      step.maneuver?.type === 'transit' ? '#3F51B5' : '#4CAF50'
                    }`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {step.maneuver?.type === 'transit' ? (
                      <span style={{ fontSize: '1.2em' }}>🚆</span>
                    ) : (
                      <span style={{ fontSize: '1.2em' }}>🚶</span>
                    )}
                    <div>
                      <div>{step.maneuver?.instruction}</div>
                      {step.distance > 0 && (
                        <div style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>
                          Distance : {(step.distance / 1000).toFixed(1)} km • 
                          Durée : {Math.round(step.duration / 60)} min
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ flexGrow: 1, position: 'relative' }}>
        <Map
          {...viewport}
          onMove={(evt) => setViewport(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          <NavigationControl position="top-left" />
          <FullscreenControl position="top-left" />
          {renderMarkers()}
          {renderRoute()}
        </Map>
      </div>
    </div>
  );
}