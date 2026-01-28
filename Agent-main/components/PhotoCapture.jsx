import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';

const PhotoCapture = () => {
  const [photos, setPhotos] = useState({
    person: null,
    idCard: null
  });
  const [selectedType, setSelectedType] = useState('person');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'L\'accès à la caméra est nécessaire');
      return false;
    }
    return true;
  };

  const takePhoto = async (type) => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'person' ? [3, 4] : [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos(prev => ({...prev, [type]: result.assets[0].uri}));
    }
  };

  const getMissingPhotoMessage = () => {
    if (!photos.person && photos.idCard) return "Veuillez prendre le portrait du PMR en photo";
    if (photos.person && !photos.idCard) return "Veuillez prendre la carte d'identité en photo";
    return null;
  };

  const toggleVerification = () => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de votre choix ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        { 
          text: "Oui", 
          onPress: () => {
            setIsLoading(true);
            setTimeout(() => {
              setIsVerified(true);
              setIsLoading(false);
            }, 3000); // 3 secondes de délai
          }
        }
      ]
    );
  };

  const goToNext = () => navigation.navigate('StartAssistance4');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e27" />
      <View style={styles.container}>
        <Text style={styles.title}>Vérification d'identité</Text>

      <View style={styles.selectorContainer}>
        <TouchableOpacity 
          style={[styles.typeButton, selectedType === 'person' && styles.activeType]}
          onPress={() => setSelectedType('person')}>
          <Text style={[styles.typeButtonText, selectedType === 'person' && styles.activeTypeText]}>Portrait</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.typeButton, selectedType === 'idCard' && styles.activeType]}
          onPress={() => setSelectedType('idCard')}>
          <Text style={[styles.typeButtonText, selectedType === 'idCard' && styles.activeTypeText]}>Pièce d'identité</Text>
        </TouchableOpacity>
      </View>

      {getMissingPhotoMessage() && (
        <Text style={styles.warningText}>{getMissingPhotoMessage()}</Text>
      )}

      <View style={styles.photoContainer}>
        {photos[selectedType] ? (
          <View style={styles.previewWrapper}>
            <View style={styles.idFrame}>
              <Image 
                source={{ uri: photos[selectedType] }} 
                style={styles.previewImage} 
                resizeMode="contain"
              />
              {!isVerified && (
                <TouchableOpacity
                  style={styles.retakeButton}
                  onPress={() => takePhoto(selectedType)}>
                  <Text style={styles.retakeText}>Reprendre</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.centeredContent}>
            <View style={styles.idFrame}>
              <Text style={styles.helperText}>
                {selectedType === 'person' 
                  ? 'Alignez le visage dans le cadre' 
                  : 'Cadrez la pièce d\'identité'}
              </Text>

              {selectedType === 'person' && !photos.person && (
                <Text style={styles.privacyWarning}>
                    ⚠️ Attention : Conformément à notre politique de confidentialité,{'\n'} 
                    l'image du PMR ne sera pas conservée après traitement de la demande.
                </Text>
              )}

              <View style={styles.overlay}>
                <View style={styles.guidelineHorizontal} />
                <View style={styles.guidelineVertical} />
              </View>
            </View>
          </View>
        )}

        {!(photos.person && photos.idCard) && (
            <TouchableOpacity 
            style={styles.captureButton} 
            onPress={() => takePhoto(selectedType)}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>Prendre la photo</Text>
            </TouchableOpacity>
        )}
      </View>

      {photos.person && photos.idCard && (
        <View style={styles.verificationSection}>
          {!isVerified ? (
            <TouchableOpacity 
              style={[styles.checkboxContainer, isVerified && styles.checkedContainer]} 
              onPress={toggleVerification}
              activeOpacity={0.7}>
              <View style={[styles.checkbox, isVerified && styles.checked]} />
              <Text style={styles.checkboxText}>Je certifie l'authenticité des documents et de l'identité client.</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.validationContainer}>
              <View style={styles.validationIcon}>
                <Text style={styles.validationCheck}>✓</Text>
              </View>
              <Text style={styles.validationText}>Identité validée</Text>
            </View>
          )}

          {isVerified && (
            <TouchableOpacity 
              style={styles.nextButton} 
              onPress={goToNext}
              activeOpacity={0.7}>
              <Text style={styles.nextButtonText}>Valider et continuer</Text>
            </TouchableOpacity>
          )}

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#EF4D20" />
              <Text style={styles.loadingText}>Validation en cours...</Text>
            </View>
          )}
        </View>
      )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F97316',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Raleway_700Bold',
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  typeButton: {
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#151b3a',
    borderWidth: 1,
    borderColor: '#2d3454',
  },
  activeType: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  typeButtonText: {
    color: '#c7d2e8',
    fontWeight: '500',
    fontFamily: 'Raleway_400Regular',
  },
  activeTypeText: {
    color: '#FFF',
  },
  photoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  idFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#2d3454',
    borderRadius: 4,
    backgroundColor: '#0f1535',
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  helperText: {
    position: 'absolute',
    bottom: 10,
    color: '#c7d2e8',
    fontSize: 14,
    backgroundColor: 'rgba(15, 21, 53, 0.9)',
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
    width: '80%',
    fontFamily: 'Raleway_400Regular',
  },
  captureButton: {
    backgroundColor: '#F97316',
    padding: 18,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Raleway_700Bold',
  },
  verificationSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#2d3454',
    borderRadius: 12,
    backgroundColor: '#151b3a',
    width: '90%',
    marginRight: 12,
  },
  checkedContainer: {
    borderColor: '#F97316',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2d3454',
    marginRight: 15,
  },
  checked: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  checkboxText: {
    fontSize: 16,
    color: '#c7d2e8',
    flex: 1,
    fontFamily: 'Raleway_400Regular',
  },
  nextButton: {
    backgroundColor: '#F97316',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Raleway_700Bold',
  },
  retakeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 4,
  },
  retakeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Raleway_400Regular',
  },
  validationContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  validationIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  validationCheck: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  validationText: {
    fontSize: 18,
    color: '#22c55e',
    fontWeight: 'bold',
    fontFamily: 'Raleway_700Bold',
  },
  warningText: {
    color: '#F97316',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    fontFamily: 'Raleway_400Regular',
  },
  previewWrapper: {
    alignItems: 'center',
  },
  privacyWarning: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: [{ translateY: -50 }],
    color: '#F97316',
    fontSize: 12,
    backgroundColor: 'rgba(15, 21, 53, 0.9)',
    padding: 10,
    borderRadius: 4,
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 16,
    fontFamily: 'Raleway_400Regular',
  },
  loadingText: {
    fontSize: 20,
    color: '#F97316',
    fontWeight: 'bold',
    fontFamily: 'Raleway_700Bold',
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default PhotoCapture;