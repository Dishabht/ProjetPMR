import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Background from "../../images/backgroundhome.jpg";
import Background2 from "../../images/Backgroundhome2.jpg";
import Background3 from "../../images/Backroundhome3.jpg";
import { Link } from "react-router-dom";
import Bus from "../../images/Bus.svg";
import Avion from "../../images/Avion.svg";
import Taxi from "../../images/Taxi.svg";
import BackHome2 from "../../images/BackHome2.png";
import { motion, AnimatePresence } from "framer-motion";

mapboxgl.accessToken = 'pk.eyJ1IjoiYnNkOTQiLCJhIjoiY201eHhjdTQ3MDdnZzJscjMyOXo2ZzhleCJ9.7zhgCDOGDcLyat5VdJaLPQ';

const Home = () => {
  const images = [Background, Background2, Background3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(2.3522); // Paris (par défaut)
  const [lat, setLat] = useState(48.8566); // Paris (par défaut)
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    // Initialisation de la carte Mapbox
      const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11", // Style de la carte
      center: [lng, lat],
      zoom: zoom,
    });

    // Ajout d'un marqueur interactif
    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>You are here !</h3>"))
      .addTo(map);

    // Cleanup lors de la destruction du composant
    return () => map.remove();
  }, [lng, lat, zoom]);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          custom={direction}
          variants={transitionImage}
          initial="enter"
          animate="center"
          exit="exit"
          alt="Background"
          className="absolute mt-8 w-full object-cover object-[center_70%] h-[600px]"
        />
      </AnimatePresence>
      <div className="absolute flex flex-col items-center text-left text-white top-60 lg:top-56 3xl:top-44 lg:right-8 right-10 3xl:right-28 lg:items-start">
        <h1 className="font-raleway lg:text-[100px] text-[70px] font-bold mb-4 ">
          Need us ?
        </h1>
        <motion.div
          whileHover={{ scale: 1.1 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
        >
          <Link
            to="/reservation"
            className="px-4 py-2 font-bold text-white rounded font-raleway color-blues-3"
          >
            Reservation
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="mt-160 " // Position initiale de votre section
        whileInView={{
          x: window.innerWidth >= 1024 ? 100 : 5, // Déplace l'élément de 100 pixels vers la droite lorsqu'il entre dans la vue
          y: 0, // Pas de déplacement vertical
          scale: 1, // Taille normale de l'élément
          rotate: 0, // Pas de rotation
        }}
        initial={{ opacity: 0 }} // Démarre l'animation avec une opacité de 0 (invisible)
        animate={{ opacity: 1 }} // Devient visible lorsque l'animation démarre
        transition={{ duration: 1.5 }} // Durée de l'animation (1.5 secondes)
        viewport={{ once: true, amount: 0.5 }} // Active l'animation lorsque 50% de l'élément est visible
      >
        <h1 className="font-raleway ml-2 text-blue lg:text-[75px] text-[43px] ">
          Welcome Back!
        </h1>
        <p className="ml-2 font-semibold font-raleway lg:text-lg text-md">
          PMove supports you in all your travels across France and beyond!
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col mt-20 lg:flex-row lg:justify-around"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Taxi */}
        <motion.div className="text-center" variants={item}>
          <motion.img
            src={Taxi}
            alt="Taxi Icon"
            className="w-32 h-32 mx-auto"
            whileHover={{
              scale: 1.2,
              rotate: 360,
              transition: { duration: 1 },
            }}
            whileTap={{
              scale: 1.2,
              rotate: 360,
              transition: { duration: 3 },
            }}
          />
          <h3 className="mt-4 text-xl font-bold font-extrabold font-raleway text-blue">
            Taxi
          </h3>
          <p className="w-64 mx-auto mt-8 font-bold text-gray-600 font-raleway">
            Our taxi service is available 24/7 to meet all your transportation
            needs, whether for a short ride or a long journey. Our professional
            drivers ensure a comfortable and safe trip.
          </p>
        </motion.div>

        {/* Section Public Transport */}
        <motion.div className="mt-12 text-center lg:mt-1" variants={item}>
          <motion.img
            src={Bus}
            alt="Bus Icon"
            className="w-32 h-32 mx-auto"
            whileHover={{
              scale: 1.2,
              rotate: 360,
              transition: { duration: 1 },
            }}
            whileTap={{
              scale: 0.8,
              rotate: 360,
              transition: { duration: 3 },
            }}
          />
          <h3 className="mt-4 text-xl font-bold font-extrabold font-raleway text-blue">
            Public Transport
          </h3>
          <p className="w-64 mx-auto mt-8 font-bold text-gray-600 font-raleway">
            With our public transport service, you can travel all around the
            city effortlessly. Our buses and trains are modern, comfortable, and
            punctual, ensuring you reach your destination on time.
          </p>
        </motion.div>

        {/* Section Airplane */}
        <motion.div className="mt-12 text-center lg:mt-1" variants={item}>
          <motion.img
            src={Avion}
            alt="Avion Icon"
            className="w-32 h-32 mx-auto"
            whileHover={{
              scale: 1.2,
              rotate: 360,
              transition: { duration: 1 },
            }}
            whileTap={{
              scale: 1.2,
              rotate: 360,
              transition: { duration: 3 },
            }}
          />
          <h3 className="mt-4 text-xl font-bold font-extrabold font-raleway text-blue">
            Airplane
          </h3>
          <p className="w-64 mx-auto mt-8 font-bold text-gray-600 font-raleway">
            Our airplane travel services offer hassle-free journeys with regular
            flights and competitive rates. Enjoy a pleasant flying experience
            with spacious seating and quality services.
          </p>
        </motion.div>
      </motion.div>

    {/* Carte interactive */}
    <div className="relative z-10">
        <h1 className="font-raleway text-blue lg:text-[45px] text-[25px] mt-32 lg:ml-12 ml-4">
          You had no idea which path to take?
        </h1>
        <div className="mt-6 lg:mt-12 w-11/12 h-[400px] mx-auto lg:ml-12 rounded-lg overflow-hidden shadow-lg">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      </div>

      <motion.div
        className="flex items-center justify-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 1 }} // Active l'animation lors du scroll
      >
        <motion.img
          src={BackHome2}
          alt="Brainstorming_image"
          className="absolute w-full opacity-75 mt-72 lg:opacity-100 lg:relative lg:mt-24 lg:-ml-20 lg:w-1/2 lg:h-auto"
          variants={item}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 1 }}
          whileTap={{
            scale: 0.9,
            rotate: -10,
            borderRadius: "20%",
          }}
        />

        <motion.div
          className="flex flex-col items-center"
          variants={item}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-center text-[75px] mt-24 font-raleway font-semibold text-blue">
            Our solution
          </h2>

          <div className="flex items-center justify-center">
            <p className="mt-8 text-[23px] max-w-[450px] leading-relaxed font-raleway text-gray-600 text-center">
              Our solution is designed to make your travels simpler and your
              journeys more enjoyable. Whether you are traveling for work or
              leisure, we offer a range of services tailored to your needs. With
              our intuitive platform, you can easily plan, book, and track your
              trips, whether it's by taxi, public transport, or airplane.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const transitionImage = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    y: 0,
    top: "0%",
  }),
  center: {
    x: 0,
    y: 0,
    top: "0%",

    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%", // L'image sort vers la gauche ou la droite
    top: "0%",
    transition: { duration: 0.5, ease: "easeInOut" },
  }),
};

export default Home;