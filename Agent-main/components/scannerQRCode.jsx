import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function ScannerQRCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [text, setText] = useState("Aucun QR Code scanné pour l'instant.");

  // Demande de permission pour la caméra
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const parseQrPayload = (raw) => {
    if (!raw) return null;

    // 1) URL with query params
    try {
      const url = new URL(raw);
      if (url.search) {
        const params = new URLSearchParams(url.search);
        return {
          nom: params.get("nom") ?? params.get("name") ?? null,
          prenom: params.get("prenom") ?? params.get("surname") ?? null,
          reservation: params.get("reservation") ?? params.get("num_reservation") ?? null,
          depart: params.get("depart") ?? params.get("lieu_depart") ?? null,
          arrivee: params.get("arrivee") ?? params.get("lieu_arrivee") ?? null,
          bagages: params.get("bagages") ?? params.get("numBags") ?? null,
          fauteuilRoulant: params.get("fauteuilRoulant") ?? params.get("handicap") ?? null,
          mail: params.get("mail") ?? null,
          num: params.get("num") ?? params.get("phone") ?? null,
          handicap: params.get("handicap") ?? null,
          birth: params.get("birth") ?? null,
          contactMail: params.get("contact_mail") ?? null,
          contactNum: params.get("contactnum") ?? params.get("contact_num") ?? null,
        };
      }
    } catch (error) {
      // Not a URL, continue
    }

    // 2) JSON payload
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          nom: parsed.nom ?? parsed.name ?? parsed.client_name ?? null,
          prenom: parsed.prenom ?? parsed.surname ?? parsed.client_surname ?? null,
          reservation: parsed.reservation ?? parsed.num_reservation ?? parsed.id ?? null,
          depart: parsed.depart ?? parsed.lieu_depart ?? null,
          arrivee: parsed.arrivee ?? parsed.lieu_arrivee ?? null,
          bagages: parsed.bagages ?? parsed.numBags ?? null,
          fauteuilRoulant: parsed.fauteuilRoulant ?? parsed.handicap_type ?? null,
          mail: parsed.mail ?? parsed.email ?? null,
          num: parsed.num ?? parsed.phone ?? null,
          handicap: parsed.handicap ?? parsed.handicap_type ?? null,
          birth: parsed.birth ?? null,
          contactMail: parsed.contact_mail ?? parsed.contactMail ?? null,
          contactNum: parsed.contactnum ?? parsed.contact_num ?? parsed.contactNum ?? null,
        };
      }
    } catch (error) {
      // Not JSON, continue
    }

    // 3) Key: Value lines
    const normalized = raw.replace(/\r/g, "");
    const lines = normalized.split("\n").map((line) => line.trim()).filter(Boolean);
    const map = {};
    lines.forEach((line) => {
      const [key, ...rest] = line.split(":");
      if (!key || rest.length === 0) return;
      map[key.trim().toLowerCase()] = rest.join(":").trim();
    });

    if (Object.keys(map).length > 0) {
      return {
        nom: map.nom || map.name || map.client_name || null,
        prenom: map.prénom || map.prenom || map.surname || map.client_surname || null,
        reservation: map.réservation || map.reservation || map.num_reservation || null,
        depart: map.départ || map.depart || map.lieu_depart || null,
        arrivee: map.arrivée || map.arrivee || map.lieu_arrivee || null,
        bagages: map.bagages || map.numbags || null,
        fauteuilRoulant: map["fauteuil roulant"] || map.fauteuilroulant || map.handicap_type || null,
        mail: map.mail || map.email || null,
        num: map.num || map.phone || null,
        handicap: map.handicap || null,
        birth: map.birth || null,
        contactMail: map.contact_mail || map.contactmail || null,
        contactNum: map.contactnum || map.contact_num || null,
      };
    }

    return null;
  };

  const buildInfoLines = (info) => {
    if (!info) return [];
    const lines = [
      { label: "Nom", value: info.nom },
      { label: "Prénom", value: info.prenom },
      { label: "Réservation", value: info.reservation },
      { label: "Départ", value: info.depart },
      { label: "Arrivée", value: info.arrivee },
      { label: "Bagages", value: info.bagages },
      { label: "Fauteuil roulant", value: info.fauteuilRoulant },
    ];
    return lines.map((item) => ({
      label: item.label,
      value: item.value ? String(item.value) : "Non défini",
    }));
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Type:", type);
    console.log("Data:", data);

    try {
      const qrInfo = parseQrPayload(data);
      if (!qrInfo) throw new Error("Le QR Code n'a pas de données lisibles.");

      setQrData(qrInfo);
      setModalVisible(true);

      const lines = buildInfoLines(qrInfo)
        .map((item) => `${item.label} : ${item.value}`)
        .join("\n");
      setText(`Informations du QR Code précédemment scanné :\n\n${lines}`);
    } catch (error) {
      console.error("Erreur lors de l'analyse du QR Code :", error);
      Alert.alert("Erreur", "Le QR Code scanné n'est pas valide ou n'est pas une URL.");
      setText(`Données brutes : ${data}`);
    }
  };

  const handleConfirm = () => {
    setModalVisible(false);
    try {
      navigation.navigate("StartAssistance2", { qrData });
    } catch (error) {
      Alert.alert("Erreur", "L'écran 'scannerQRCodeBaggage' est introuvable.");
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0e27" />
        <View style={styles.container}>
          <Text>Demande de permission pour la caméra...</Text>
        </View>
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0e27" />
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>Accès à la caméra refusé</Text>
          <TouchableOpacity onPress={askForCameraPermission} style={styles.permissionButton}>
            <Text style={styles.permissionButtonText}>Autoriser la caméra</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e27" />
      <View style={styles.container}>
        <Text style={styles.title}>Scanner le QR Code du PMR</Text>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: ["qr"],
          }}
        >
          {/* Overlay for QR Code Detection Box */}
          <View style={styles.overlay}>
            <View style={styles.rectangle} />
          </View>
        </CameraView>

        <Text style={styles.resultText}>
          <Text style={styles.boldLargeText}>{text}</Text>
        </Text>

        {scanned && (
          <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
            <Text style={styles.scanAgainButtonText}>Scanner à nouveau</Text>
          </TouchableOpacity>
        )}

        {/* Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
          transparent={true}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Informations du QR Code</Text>

              {qrData && (
                <View style={styles.modalContent}>
                  {buildInfoLines(qrData).map((item) => (
                    <Text key={item.label} style={styles.modalText}>
                      {item.label} : {item.value}
                    </Text>
                  ))}
                </View>
              )}

              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Accepter</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0a0e27",
  },
  container: {
    flex: 1,
    backgroundColor: "#0a0e27",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F97316",
    borderColor: "#F97316",
    textAlign: "center",
  },
  camera: {
    width: "85%",
    height: 320,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2d3454",
    backgroundColor: "#0f1535",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    color: "#F97316", // Couleur orange
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    width: 250, // Augmenter la largeur du carré
    height: 250, // Augmenter la hauteur du carré
    borderWidth: 4,
    borderColor: "#EF4D20",
    borderRadius: 10,
  },
  resultText: {
    fontSize: 14, // Réduire la taille du texte
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  boldLargeText: {
    fontSize: 18, // Taille du texte plus grande
    fontWeight: "bold", // Texte en gras
    color: "#F97316", // Couleur du texte
  },
  scanAgainButton: {
    backgroundColor: "#F97316",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
  scanAgainButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  permissionButton: {
    backgroundColor: "#F97316",
    padding: 12,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#151b3a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2d3454",
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F97316",
    marginBottom: 20,
  },
  modalContent: {
    marginBottom: 20,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16, // Réduire la taille du texte
    color: "#c7d2e8",
    marginBottom: 10,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#F97316",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#2d3454",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});