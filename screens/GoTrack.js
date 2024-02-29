import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import MapView, { PROVIDER_DEFAULT, Circle, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const GoTrack = () => {
  const [location, setLocation] = useState(null);
  const [speed, setSpeed] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [timer, setTimer] = useState(0);
  const [distance, setDistance] = useState(0);
  const [initialPosition, setInitialPosition] = useState(null);
  const [route, setRoute] = useState(null);

  const formatTimer = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
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

        if (!initialPosition) {
          setInitialPosition(currentLocation);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    const intervalId = setInterval(updateLocation, 1000);
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timerId);
    };
  }, [location, distance, initialPosition]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (initialPosition && location) {
        try {
          const apiKey = 'AIzaSyBFF_ZF8omNSixAgVPw3ZcsKi6qIYIB9ow';
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${initialPosition.coords.latitude},${initialPosition.coords.longitude}&destination=${location.coords.latitude},${location.coords.longitude}&key=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();
          const route = data.routes[0]?.overview_polyline.points;
          if (route) {
            setRoute(route);
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      }
    };

    fetchRoute();
  }, [initialPosition, location]);

  const getDistance = (prevLocation, newLocation) => {
    const R = 6371e3;
    const lat1 = prevLocation.latitude * Math.PI / 180;
    const lat2 = newLocation.latitude * Math.PI / 180;
    const deltaLat = (newLocation.latitude - prevLocation.latitude) * Math.PI / 180;
    const deltaLon = (newLocation.longitude - prevLocation.longitude) * Math.PI / 180;
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getMapRegion = () => ({
    latitude: location ? location.coords.latitude : 37.78825,
    longitude: location ? location.coords.longitude : -122.4324,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const formatDistance = (distance) => {
    const distanceInKm = distance / 1000;
    return distanceInKm.toFixed(2);
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
                <Text style={{ fontSize: 22, fontWeight: 900 }}>{Math.round(speed)}</Text>
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
            {location && initialPosition && (
              <MapView
                provider={PROVIDER_DEFAULT}
                style={{ flex: 1 }}
                region={getMapRegion()}
              >
                {route && (
                  <Polyline
                    coordinates={decodePolyline(route)}
                    strokeWidth={4}
                    strokeColor="#6038E0"
                  />
                )}
                <Circle
                  center={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                  radius={20}
                  fillColor="rgba(255, 0, 0, 0.5)"
                  strokeColor="rgba(255, 0, 0, 0.8)"
                  strokeWidth={2}
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

// Fonction pour décoder la polyline
const decodePolyline = (encoded) => {
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;
  const result = [];
  while (index < len) {
    let b;
    let shift = 0;
    let resultLat = 0;
    let resultLng = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      resultLat |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = (resultLat & 1) !== 0 ? ~(resultLat >> 1) : (resultLat >> 1);
    lat += dlat;
    shift = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      resultLng |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = (resultLng & 1) !== 0 ? ~(resultLng >> 1) : (resultLng >> 1);
    lng += dlng;
    result.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return result;
};
