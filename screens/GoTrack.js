import { StyleSheet, Text, View, Platform, Modal, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";
import MapView, { PROVIDER_DEFAULT, Circle, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";

const GoTrack = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [speed, setSpeed] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [timer, setTimer] = useState(0);
    const [distance, setDistance] = useState(0);
    const [initialPosition, setInitialPosition] = useState(null);
    const [route, setRoute] = useState(null);
    const [showPauseModal, setShowPauseModal] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const formatTimer = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const togglePauseModal = () => {
        setShowPauseModal(!showPauseModal);
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
        setShowPauseModal(false); // Masque la modal après avoir appuyé sur le bouton
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

                if (!isPaused && location) {
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
            if (!isPaused) {
                setTimer((prevTimer) => prevTimer + 1);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
            clearInterval(timerId);
        };
    }, [location, distance, initialPosition, isPaused]);

    useEffect(() => {
        const fetchRoute = async () => {
            if (initialPosition && location) {
                try {
                    const apiKey = 'API_KEY';
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
                        {isPaused && (
                            <View style={StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'red' }}>Pause...</Text>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity onPress={togglePauseModal}>
                        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
                            <Feather name="pause-circle" size={28} color="red" />
                        </View>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showPauseModal}
                        onRequestClose={togglePauseModal}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <View style={{flexDirection:"row", alignItems:"center", gap:5}}>
                                            <Feather name="stop-circle" size={24} color="#F8427E" />
                                            <Text style={{color:"#F8427E", fontWeight:700}}>C'est fini</Text>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={togglePause}>
                                    <View style={{flexDirection:"row", alignItems:"center", gap:5}}>
                                        <Feather name={isPaused ? "play-circle" : "pause-circle"} size={24} color="green" />
                                        <Text style={{color:"green", fontWeight:700}}>{isPaused ? "Reprendre" : "En Pause"}</Text>
                                    </View>
                                    
                                </TouchableOpacity>
                                 
                                 <TouchableOpacity onPress={togglePauseModal}>
                                    <View style={{flexDirection:"row", alignItems:"center", gap:5}}>
                                            <Feather name="arrow-left-circle" size={24} color="#45D7ED" />
                                            <Text style={{color:"#45D7ED", fontWeight:700}}>Oups, non !</Text>
                                        </View>
                                 </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default GoTrack;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap:10,
    },
});

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
