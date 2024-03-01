import React, { useState, useEffect } from "react";
import { Image, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { dataArray } from "../components/TripData"; // Importez le tableau dataArray depuis TripData.js

const RapportScreen = ({ route }) =>{
  const navigation = useNavigation();
  const { tempsTrajet, distanceParcourue, positionInitiale, dernierePosition } = route.params;
  const [countMinusCG, setCountMinusCG] = useState(0);
  const [countMinusCD, setCountMinusCD] = useState(0);
  const [countMinusBG, setCountMinusBG] = useState(0);
  const [countMinusBD, setCountMinusBD] = useState(0);
  const [countMinusRG, setCountMinusRG] = useState(0);
  const [countMinusRD, setCountMinusRD] = useState(0);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [comment, setComment] = useState('');

  const incrementCountMinusCG = () => {
    setCountMinusCG((prevCount) => prevCount + 1);
  };
  const decrementCountMinusCG = () => {
    if (countMinusCG > 0) {
      setCountMinusCG((prevCount) => prevCount - 1);
    }
  };
  const incrementCountMinusCD = () => {
    setCountMinusCD((prevCount) => prevCount + 1);
  };
  const decrementCountMinusCD = () => {
    if (countMinusCD > 0) {
      setCountMinusCD((prevCount) => prevCount - 1);
    }
  };
  const incrementCountMinusBG = () => {
    setCountMinusBG((prevCount) => prevCount + 1);
  };
  const decrementCountMinusBG = () => {
    if (countMinusBG > 0) {
      setCountMinusBG((prevCount) => prevCount - 1);
    }
  };
  const incrementCountMinusBD = () => {
    setCountMinusBD((prevCount) => prevCount + 1);
  };
  const decrementCountMinusBD = () => {
    if (countMinusBD > 0) {
      setCountMinusBD((prevCount) => prevCount - 1);
    }
  };
  const incrementCountMinusRG = () => {
    setCountMinusRG((prevCount) => prevCount + 1);
  };
  const decrementCountMinusRG = () => {
    if (countMinusRG > 0) {
      setCountMinusRG((prevCount) => prevCount - 1);
    }
  };
  const incrementCountMinusRD = () => {
    setCountMinusRD((prevCount) => prevCount + 1);
  };
  const decrementCountMinusRD = () => {
    if (countMinusRD > 0) {
      setCountMinusRD((prevCount) => prevCount - 1);
    }
  };

  const handleWeatherSelection = (weather) => {
    if (selectedWeather === weather) {
      // Si l'élément sélectionné est cliqué à nouveau, désélectionnez-le
      setSelectedWeather(null);
    } else {
      // Sinon, mettez à jour l'élément sélectionné
      setSelectedWeather(weather);
    }
  };

  const handleTimeSelection = (time) => {
    if (selectedTime === time) {
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
    }
  };

  const handlePersonSelection = (person) => {
    if (selectedPerson === person) {
        setSelectedPerson(null);
    } else {
        setSelectedPerson(person);
    }
  }


  const vehicles = [
    { name: "Peugeot 5008", icon: "car-sport-sharp" },
    { name: "Peugeot 5009", icon: "car-sport-sharp" },
    ];

    // Sélection automatique du véhicule s'il y en a qu'un seul
    if (vehicles.length === 1 && !selectedVehicle) {
        setSelectedVehicle(vehicles[0].name);
    }

    useEffect(() => {
        saveData();
    }, []);

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('dataArray', JSON.stringify(dataArray));
            console.log('Données sauvegardées avec succès');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
    };

    const saveReportData = async () => {
        try {
            const moisActuel = new Date().toLocaleDateString('fr-FR', { month: 'long' });

            // Transformation de la position initiale en chaîne de caractères
            const startPosition = JSON.stringify(positionInitiale);
            // Transformation de la dernière position en chaîne de caractères
            const endPosition = JSON.stringify(dernierePosition);

            const newTrip = {
                date: new Date().toLocaleString(),
                distance: distanceParcourue,
                duration: tempsTrajet,
                weatherIcon: selectedWeather,
                timeIcon: selectedTime,
                start: startPosition,
                end: endPosition,
                mois: moisActuel,
                bg: countMinusBG,
                bd: countMinusBD,
                cg: countMinusCG,
                cd: countMinusCD,
                rg: countMinusRG,
                rd: countMinusRD,
                campagne: 90,
                ville: 0,
                voieRapide: 5,
                autoroute: 5,
                commentaire: comment, // Utilisation du commentaire saisi
            };

            dataArray.push(newTrip);
            await saveData(); // Sauvegarde les données après avoir ajouté le nouveau trajet

            console.log('Nouveau trajet enregistré avec succès');
            navigation.navigate('Main');
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement du nouveau trajet:', error);
        }
    };
    



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1, backgroundColor: "rgba(96, 56, 224, 0.18)" }}
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView
                style={{ flex: 1, paddingTop: 30, paddingHorizontal: 30, paddingBottom:100, gap:30 }}
                >
                    <View style={{ flex: 1, alignItems: "center", gap: 20 }}>
                        <Text style={{ fontWeight: 700, fontSize: 20 }}>
                        Rapport d'évaluation
                        </Text>

                        <View
                        style={{ width: "100%", justifyContent: "flex-start", gap: 10 }}
                        >
                        <Text style={{ fontSize: 16, fontWeight: 700 }}>Météo:</Text>
                        <View style={{ flexDirection: "row", gap: 20 }}>
                            <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor:
                                selectedWeather === "sun" ? "#F8427E" : "white",
                                borderRadius: 100,
                            }}
                            onPress={() => handleWeatherSelection("sun")}
                            >
                            <Feather
                                name="sun"
                                size={24}
                                color={selectedWeather === "sun" ? "white" : "black"}
                            />
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor:
                                selectedWeather === "cloud-rain" ? "#F8427E" : "white",
                                borderRadius: 100,
                            }}
                            onPress={() => handleWeatherSelection("cloud-rain")}
                            >
                            <Feather
                                name="cloud-rain"
                                size={24}
                                color={selectedWeather === "cloud-rain" ? "white" : "black"}
                            />
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor:
                                selectedWeather === "cloud-lightning"
                                    ? "#F8427E"
                                    : "white",
                                borderRadius: 100,
                            }}
                            onPress={() => handleWeatherSelection("cloud-lightning")}
                            >
                            <Feather
                                name="cloud-lightning"
                                size={24}
                                color={
                                selectedWeather === "cloud-lightning" ? "white" : "black"
                                }
                            />
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor:
                                selectedWeather === "fog" ? "#F8427E" : "white",
                                borderRadius: 100,
                            }}
                            onPress={() => handleWeatherSelection("fog")}
                            >
                            <Fontisto
                                name="fog"
                                size={24}
                                color={selectedWeather === "fog" ? "white" : "black"}
                            />
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor:
                                selectedWeather === "snowflake" ? "#F8427E" : "white",
                                borderRadius: 100,
                            }}
                            onPress={() => handleWeatherSelection("snowflake")}
                            >
                            <Fontisto
                                name="snowflake"
                                size={24}
                                color={selectedWeather === "snowflake" ? "white" : "black"}
                            />
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                        <View
                            style={{flex:1, width: "100%", justifyContent: "flex-start", gap: 10 }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 700 }}>Jour/Nuit:</Text>
                            <View style={{ flexDirection: "row", gap: 20 }}>
                            <TouchableOpacity
                                style={{
                                padding: 10,
                                backgroundColor:
                                    selectedTime === "sun" ? "#F8427E" : "white",
                                borderRadius: 100,
                                }}
                                onPress={() => handleTimeSelection("sun")}
                            >
                                <Feather
                                name="sun"
                                size={24}
                                color={selectedTime === "sun" ? "white" : "black"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                padding: 10,
                                backgroundColor:
                                    selectedTime === "moon" ? "#F8427E" : "white",
                                borderRadius: 100,
                                }}
                                onPress={() => handleTimeSelection("moon")}
                            >
                                <Feather
                                name="moon"
                                size={24}
                                color={selectedTime === "moon" ? "white" : "black"}
                                />
                            </TouchableOpacity>
                            </View>
                        </View>
                    
                    
                    
                        <View style={{ width: "100%", justifyContent: "flex-start", gap: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 700 }}>Véhicule:</Text>
                            <View style={{ flexDirection: "row", gap: 20 }}>
                                {vehicles.map(vehicle => (
                                    <View key={vehicle.name} style={{ alignItems: "center" }}>
                                        <TouchableOpacity
                                            style={{
                                                padding: 10,
                                                backgroundColor: selectedVehicle === vehicle.name ? "#F8427E" : "white",
                                                borderRadius: 100,
                                                overflow: "hidden",
                                                height: 50,
                                                width: 50,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            onPress={() => setSelectedVehicle(vehicle.name)}
                                        >
                                            <Ionicons name={vehicle.icon} size={24} color={selectedVehicle === vehicle.name ? "white" : "black"} />
                                        </TouchableOpacity>
                                        <Text>{vehicle.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>





                    <View
                        style={{ width: "100%", justifyContent: "flex-start", gap: 10 }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 700 }}>Accompagnant:</Text>
                        <View style={{ flexDirection: "row", gap: 20 }}>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor: selectedPerson === "M" ? "#F8427E" : "white",
                                borderRadius: 100,
                                overflow: "hidden",
                                height: 50,
                                width: 50,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => handlePersonSelection("M")}
                            >
                            <Text style={{ fontWeight: 900, color: selectedPerson === "M" ? "white" : "black" }}>M</Text>
                            </TouchableOpacity>
                            <Text>Maman</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor: selectedPerson === "P" ? "#F8427E" : "white",
                                borderRadius: 100,
                                overflow: "hidden",
                                height: 50,
                                width: 50,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => handlePersonSelection("P")}
                            >
                            <Text style={{ fontWeight: 900, color: selectedPerson === "P" ? "white" : "black" }}>P</Text>
                            </TouchableOpacity>
                            <Text>Papa</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor: selectedPerson === "S" ? "#F8427E" : "white",
                                borderRadius: 100,
                                overflow: "hidden",
                                height: 50,
                                width: 50,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => handlePersonSelection("S")}
                            >
                            <Text style={{ fontWeight: 900, color: selectedPerson === "S" ? "white" : "black" }}>S</Text>
                            </TouchableOpacity>
                            <Text>Soeur</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor: selectedPerson === "F" ? "#F8427E" : "white",
                                borderRadius: 100,
                                overflow: "hidden",
                                height: 50,
                                width: 50,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => handlePersonSelection("F")}
                            >
                            <Text style={{ fontWeight: 900, color: selectedPerson === "F" ? "white" : "black" }}>F</Text>
                            </TouchableOpacity>
                            <Text>Frère</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor: selectedPerson === "Au" ? "#F8427E" : "white",
                                borderRadius: 100,
                                overflow: "hidden",
                                height: 50,
                                width: 50,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => handlePersonSelection("Au")}
                            >
                            <Text style={{ fontWeight: 900, color: selectedPerson === "Au" ? "white" : "black" }}>Au</Text>
                            </TouchableOpacity>
                            <Text>Autres</Text>
                        </View>
                        </View>
                    </View>
                    <View
                        style={{ width: "100%", justifyContent: "flex-start", gap: 10 }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "700" }}>
                        Stationnement:
                        </Text>

                        <View style={{ gap: 15 }}>
                        <View
                            style={{ flexDirection: "row", justifyContent: "space-around" }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={incrementCountMinusCG}>
                                <Feather name="plus" size={24} color="green" />
                            </TouchableOpacity>
                            <View style={{ alignItems: "center", gap: 3 }}>
                                <TouchableOpacity
                                style={{
                                    padding: 10,
                                    backgroundColor: "white",
                                    borderRadius: 100,
                                    overflow: "hidden",
                                    height: 50,
                                    width: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                >
                                <Image
                                    source={require("../assets/icon/cg.png")}
                                    style={{ width: 41, height: 41 }}
                                />
                                {countMinusCG > 0 && (
                                    <Text
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        left: 5,
                                        backgroundColor: "red",
                                        borderRadius: 10,
                                        paddingHorizontal: 5,
                                        color: "white",
                                    }}
                                    >
                                    {countMinusCG}
                                    </Text>
                                )}
                                </TouchableOpacity>
                                <Text>Créneau gauche</Text>
                            </View>
                            <TouchableOpacity onPress={decrementCountMinusCG}>
                                <Feather name="minus" size={24} color="red" />
                            </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={incrementCountMinusCD}>
                                <Feather name="plus" size={24} color="green" />
                            </TouchableOpacity>
                            <View style={{ alignItems: "center", gap: 3 }}>
                                <TouchableOpacity
                                style={{
                                    padding: 10,
                                    backgroundColor: "white",
                                    borderRadius: 100,
                                    overflow: "hidden",
                                    height: 50,
                                    width: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                >
                                <Image
                                    source={require("../assets/icon/cd.png")}
                                    style={{ width: 41, height: 41 }}
                                />
                                {countMinusCD > 0 && (
                                    <Text
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        left: 5,
                                        backgroundColor: "red",
                                        borderRadius: 10,
                                        paddingHorizontal: 5,
                                        color: "white",
                                    }}
                                    >
                                    {countMinusCD}
                                    </Text>
                                )}
                                </TouchableOpacity>
                                <Text>Créneau droit</Text>
                            </View>
                            <TouchableOpacity onPress={decrementCountMinusCD}>
                                <Feather name="minus" size={24} color="red" />
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{ flexDirection: "row", justifyContent: "space-around" }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={incrementCountMinusBG}>
                                <Feather name="plus" size={24} color="green" />
                            </TouchableOpacity>
                            <View style={{ alignItems: "center", gap: 3 }}>
                                <TouchableOpacity
                                style={{
                                    padding: 10,
                                    backgroundColor: "white",
                                    borderRadius: 100,
                                    overflow: "hidden",
                                    height: 50,
                                    width: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                >
                                <Image
                                    source={require("../assets/icon/bg.png")}
                                    style={{ width: 41, height: 41 }}
                                />
                                {countMinusBG > 0 && (
                                    <Text
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        left: 5,
                                        backgroundColor: "red",
                                        borderRadius: 10,
                                        paddingHorizontal: 5,
                                        color: "white",
                                    }}
                                    >
                                    {countMinusBG}
                                    </Text>
                                )}
                                </TouchableOpacity>
                                <Text>Bataille gauche</Text>
                            </View>
                            <TouchableOpacity onPress={decrementCountMinusBG}>
                                <Feather name="minus" size={24} color="red" />
                            </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={incrementCountMinusBD}>
                                <Feather name="plus" size={24} color="green" />
                            </TouchableOpacity>
                            <View style={{ alignItems: "center", gap: 3 }}>
                                <TouchableOpacity
                                style={{
                                    padding: 10,
                                    backgroundColor: "white",
                                    borderRadius: 100,
                                    overflow: "hidden",
                                    height: 50,
                                    width: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                >
                                <Image
                                    source={require("../assets/icon/bd.png")}
                                    style={{ width: 41, height: 41 }}
                                />
                                {countMinusBD > 0 && (
                                    <Text
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        left: 5,
                                        backgroundColor: "red",
                                        borderRadius: 10,
                                        paddingHorizontal: 5,
                                        color: "white",
                                    }}
                                    >
                                    {countMinusBD}
                                    </Text>
                                )}
                                </TouchableOpacity>
                                <Text>Bataille droit</Text>
                            </View>
                            <TouchableOpacity onPress={decrementCountMinusBD}>
                                <Feather name="minus" size={24} color="red" />
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{ flexDirection: "row", justifyContent: "space-around" }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={incrementCountMinusRG}>
                                <Feather name="plus" size={24} color="green" />
                            </TouchableOpacity>
                            <View style={{ alignItems: "center", gap: 3 }}>
                                <TouchableOpacity
                                style={{
                                    padding: 10,
                                    backgroundColor: "white",
                                    borderRadius: 100,
                                    overflow: "hidden",
                                    height: 50,
                                    width: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                >
                                <Image
                                    source={require("../assets/icon/rg.png")}
                                    style={{ width: 41, height: 41 }}
                                />
                                {countMinusRG > 0 && (
                                    <Text
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        left: 5,
                                        backgroundColor: "red",
                                        borderRadius: 10,
                                        paddingHorizontal: 5,
                                        color: "white",
                                    }}
                                    >
                                    {countMinusRG}
                                    </Text>
                                )}
                                </TouchableOpacity>
                                <Text>Rangement gauche</Text>
                            </View>
                            <TouchableOpacity onPress={decrementCountMinusRG}>
                                <Feather name="minus" size={24} color="red" />
                            </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={incrementCountMinusRD}>
                                <Feather name="plus" size={24} color="green" />
                            </TouchableOpacity>
                            <View style={{ alignItems: "center", gap: 3 }}>
                                <TouchableOpacity
                                style={{
                                    padding: 10,
                                    backgroundColor: "white",
                                    borderRadius: 100,
                                    overflow: "hidden",
                                    height: 50,
                                    width: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                >
                                <Image
                                    source={require("../assets/icon/rd.png")}
                                    style={{ width: 41, height: 41 }}
                                />
                                {countMinusRD > 0 && (
                                    <Text
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        left: 5,
                                        backgroundColor: "red",
                                        borderRadius: 10,
                                        paddingHorizontal: 5,
                                        color: "white",
                                    }}
                                    >
                                    {countMinusRD}
                                    </Text>
                                )}
                                </TouchableOpacity>
                                <Text>Rangement droit</Text>
                            </View>
                            <TouchableOpacity onPress={decrementCountMinusRD}>
                                <Feather name="minus" size={24} color="red" />
                            </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </View>
                    <View style={{ width: "100%", justifyContent: "flex-start", gap: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 700 }}>Commentaire:</Text>
                    <TextInput
                        placeholder="Ecrivez un commentaire"
                        value={comment}
                        onChangeText={setComment}
                    ></TextInput>

                    </View>


                    <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity
                            style={{ width: "80%", justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 20, padding: 20 }}
                            onPress={saveReportData} // Appel à la fonction saveReportData lors de l'appui sur le bouton "Valider"
                        >
                            <Text style={{ fontWeight: 900 }}>Valider</Text>
                        </TouchableOpacity>
                    </View>



                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default RapportScreen;
