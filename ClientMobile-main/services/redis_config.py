import redis
import json

# Connexion à Redis
r = redis.Redis(host='172.20.10.11', port=6379, db=0, password='kaka')

# Supprimer la clé 'Trajet' si elle existe
try:
    r.delete('Trajet')
    print("Key 'Trajet' deleted successfully")
except redis.ConnectionError:
    print("Connection failed")

# Exemple de données 1
data1 = {
    "id_mm": 125,
    "QR_Code": "image_data_here",
    "trajet": [
        {
            "num_etape": 1,
            "num_reservation": 111,
            "id_agent": None,
            "transporteur": "RATP",
            "lieu_depart": "Paris",
            "heure_depart": "2023-10-01 08:00:00",
            "agent_depart": None,
            "lieu_arrivee": "Lyon",
            "heure_arrivee": "2023-10-01 10:00:00",
            "agent_arrivee": None
        },
        {
            "num_etape": 2,
            "num_reservation": 112,
            "id_agent": None,
            "transporteur": "SNCF",
            "lieu_depart": "Lyon",
            "heure_depart": "2023-10-01 11:00:00",
            "agent_depart" : None,
            "lieu_arrivee": "Marseille",
            "heure_arrivee": "2023-10-01 13:00:00",
            "agent_arrivee": None
        }
    ],
    "bagage": [
        {
            "id_bagage": 211,
            "QR_Code": "image_data_here",
            "image": "image_data_here"
        },
        {
            "id_bagage": 212,
            "QR_Code": "image_data_here",
            "image": "image_data_here"
        }
    ],
    "papier": [
        {
            "categorie": "passport",
            "image": "image_data_here"
        },
        {
            "categorie": "visa",
            "image": "image_data_here"
        }
    ]
}

# Exemple de données 2
data2 = {
    "id_mm": 126,
    "QR_Code": "image_data_here",
    "trajet": [
        {
            "num_etape": 1,
            "num_reservation": 113,
            "id_agent": None,
            "transporteur": "RATP",
            "lieu_depart": "Marseille",
            "heure_depart": "2023-10-02 09:00:00",
            "agent_depart": None,
            "lieu_arrivee": "Nice",
            "heure_arrivee": "2023-10-02 11:00:00",
            "agent_arrivee": None
        },
        {
            "num_etape": 2,
            "num_reservation": 114,
            "id_agent": None,
            "transporteur": "SNCF",
            "lieu_depart": "Nice",
            "heure_depart": "2023-10-02 12:00:00",
            "agent_depart": None,
            "lieu_arrivee": "Monaco",
            "heure_arrivee": "2023-10-02 14:00:00",
            "agent_arrivee": None,
        }
    ],
    "bagage": [
        {
            "id_bagage": 213,
            "QR_Code": "image_data_here",
            "image": "image_data_here"
        },
        {
            "id_bagage": 214,
            "QR_Code": "image_data_here",
            "image": "image_data_here"
        }
    ],
    "papier": [
        {
            "categorie": "passport",
            "image": "image_data_here"
        },
        {
            "categorie": "visa",
            "image": "image_data_here"
        }
    ]
}

# Exemple de données 3
data3 = {
    "id_mm": 127,
    "QR_Code": "image_data_here",
    "trajet": [
        {
            "num_etape": 1,
            "num_reservation": 115,
            "id_agent": None,
            "transporteur": "RATP",
            "lieu_depart": "Lille",
            "heure_depart": "2023-10-03 07:00:00",
            "agent_depart" : None,
            "lieu_arrivee": "Bruxelles",
            "heure_arrivee": "2023-10-03 09:00:00",
            "agent_arrivee": None
        },
        {
            "num_etape": 2,
            "num_reservation": 116,
            "id_agent": None,
            "transporteur": "SNCF",
            "lieu_depart": "Bruxelles",
            "heure_depart": "2023-10-03 10:00:00",
            "agent_depart": None,
            "lieu_arrivee": "Amsterdam",
            "heure_arrivee": "2023-10-03 12:00:00",
            "agent_depart": None,
        }
    ],
    "bagage": [
        {
            "id_bagage": 215,
            "QR_Code": "image_data_here",
            "image": "image_data_here"
        },
        {
            "id_bagage": 216,
            "QR_Code": "image_data_here",
            "image": "image_data_here"
        }
    ],
    "papier": [
        {
            "categorie": "passport",
            "image": "image_data_here"
        },
        {
            "categorie": "visa",
            "image": "image_data_here"
        }
    ]
}

# Convertir les données en JSON
data_json1 = json.dumps(data1)
data_json2 = json.dumps(data2)
data_json3 = json.dumps(data3)

# Envoyer les données à Redis sous la clé 'Trajet' avec des sous-clés pour chaque trajet
try:
    r.hset('Trajet', '125', data_json1)
    r.hset('Trajet', '126', data_json2)
    r.hset('Trajet', '127', data_json3)
    print("Data sent to Redis successfully")
except redis.ConnectionError:
    print("Connection failed")