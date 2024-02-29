import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import MapView, { PROVIDER_DEFAULT, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const GoTrack = () => {
  const [location, setLocation] = useState(null);
  const [speed, setSpeed] = useState(0); // État pour stocker la vitesse de l'utilisateur
  const [errorMsg, setErrorMsg] = useState(null);
  const [timer, setTimer] = useState(0); // État pour stocker le temps écoulé en secondes
  const [distance, setDistance] = useState(0); // État pour stocker la distance parcourue en mètres

  // Convertir le temps en secondes en format HH:MM:SS
  const formatTimer = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Fonction pour mettre à jour la position de l'utilisateur
    const updateLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setSpeed(currentLocation.coords.speed || 0);

        // Mettre à jour la distance parcourue
        if (location) {
          const prevLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          const newLocation = {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          };
          const newDistance = distance + getDistance(prevLocation, newLocation);
          setDistance(newDistance);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    // Mettre à jour la position toutes les secondes
    const intervalId = setInterval(updateLocation, 1000);

    // Mettre à jour le compteur de temps toutes les secondes
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Nettoyer le setInterval lorsque le composant est démonté
    return () => {
      clearInterval(intervalId);
      clearInterval(timerId);
    };
  }, [location, distance]);

  // Fonction pour calculer la distance entre deux points géographiques en mètres
  const getDistance = (prevLocation, newLocation) => {
    const R = 6371e3; // Rayon de la Terre en mètres
    const lat1 = prevLocation.latitude * Math.PI / 180; // Latitude en radians
    const lat2 = newLocation.latitude * Math.PI / 180;
    const deltaLat = (newLocation.latitude - prevLocation.latitude) * Math.PI / 180;
    const deltaLon = (newLocation.longitude - prevLocation.longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance en mètres
  };

  // Fonction pour centrer la carte sur la position de l'utilisateur avec un zoom plus fort
  const getMapRegion = () => ({
    latitude: location ? location.coords.latitude : 37.78825,
    longitude: location ? location.coords.longitude : -122.4324,
    latitudeDelta: 0.02, // Augmenter cette valeur pour un zoom plus fort
    longitudeDelta: 0.02, // Augmenter cette valeur pour un zoom plus fort
  });

  // Convertir la distance en mètres en kilomètres avec une précision de deux décimales
  const formatDistance = (distance) => {
    const distanceInKm = distance / 1000; // Conversion en kilomètres
    return distanceInKm.toFixed(2); // Deux décimales
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(96, 56, 224, 0.18)", paddingTop: 30, paddingHorizontal: 30 }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between", paddingBottom: 10 }}>
          <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ backgroundColor: "white", padding: 10, borderRadius: 10, alignItems: "center", gap: 20, maxWidth: 100 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }} >
                <Feather name="clock" size={24} color="#6038E0" />
                <Text style={{ fontWeight: "bold" }}>Temps</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }} >
                <Text style={{ fontSize: 12, fontWeight: 700 }}>{formatTimer(timer)}</Text>
              </View>
            </View>
            <View style={{ justifyContent: "center", backgroundColor: "white", padding: 10, borderRadius: 10, alignItems: "center", gap: 20, width: 100 }}>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }} >
                <Text style={{ fontSize: 22, fontWeight: 900 }}>{speed}</Text>
                <Text style={{ fontSize: 16 }}> km/h</Text>
              </View>
            </View>
            <View style={{ backgroundColor: "white", padding: 10, borderRadius: 10, alignItems: "center", gap: 20, maxWidth: 100 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }} >
                <Feather name="compass" size={24} color="#6038E0" />
                <Text style={{ fontWeight: "bold" }}>Distance</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }} >
                <Text style={{ fontSize: 18, fontWeight: 700 }}>{formatDistance(distance)}</Text>
                <Text style={{ fontSize: 10 }}> km</Text>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", backgroundColor: "white", height: 300, borderRadius: 10 }}>
            {location && (
              <MapView
                provider={PROVIDER_DEFAULT}
                style={{ flex: 1 }}
                region={getMapRegion()} // Centrer la carte sur la position de l'utilisateur avec un zoom plus fort
              >
                <Circle
                  center={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                  radius={20} // Augmenter la taille du cercle pour montrer la position de l'utilisateur
                  fillColor="rgba(255, 0, 0, 0.5)" // couleur de remplissage du cercle
                  strokeColor="rgba(255, 0, 0, 0.8)" // couleur de contour du cercle
                  strokeWidth={2} // largeur du contour du cercle en pixels
                />
              </MapView>
            )}
          </View>
          <TouchableOpacity>
            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
              <Feather name="pause-circle" size={28} color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default GoTrack;

const styles = StyleSheet.create({});
