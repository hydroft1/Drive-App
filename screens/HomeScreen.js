import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LineChart } from 'react-native-chart-kit';
import { firebase } from '../config';
import { dataArray } from '../components/TripData';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";


const convertDurationToHours = (duration) => {
  // Vérifiez si la durée est au format "0h00min"
  if (/^\d+h\d+min$/.test(duration)) {
    // Extrayez les heures et les minutes
    const [, hours, minutes] = duration.match(/(\d+)h(\d+)min/);
    // Convertissez les heures et les minutes en nombres entiers
    const totalHours = parseInt(hours);
    const totalMinutes = parseInt(minutes) / 60;
    // Calculez le total des heures en arrondissant à la valeur entière la plus proche
    let roundedTotalHours = Math.round(totalHours + totalMinutes);
    // Si les minutes sont plus proches de 60, arrondissez à la prochaine heure
    if (roundedTotalHours === 24) roundedTotalHours = 0; // Remettre à zéro si c'est minuit
    return roundedTotalHours;
  }
  // Si la durée n'est pas au format attendu, retournez NaN
  return NaN;
};

// Fonction pour extraire et calculer le total des kilomètres parcourus
const calculateTotalDistance = (dataArray) => {
  // Utilisez la méthode reduce() pour accumuler les distances de chaque trajet
  const totalDistance = dataArray.reduce((acc, trip) => {
    // Extrait la distance de chaque trajet et la convertit en nombre
    const distance = parseFloat(trip.distance.replace('km', ''));
    // Ajoute la distance du trajet actuel à l'accumulateur
    return acc + distance;
  }, 0);

  // Retourne le total des kilomètres parcourus
  return totalDistance;
};

// Appel de la fonction pour obtenir le total des kilomètres parcourus
const totalKilometers = calculateTotalDistance(dataArray);


const kilometersByMonth = dataArray.reduce((acc, trip) => {
  const { mois, distance } = trip;
  if (!acc[mois]) {
    acc[mois] = parseFloat(distance); // Convertir la distance en nombre (suppose que distance est une chaîne de caractères)
  } else {
    acc[mois] += parseFloat(distance); // Ajouter la distance au total existant pour ce mois
  }
  return acc;
}, {});

// 2. Convertissez le résultat en un tableau d'objets
const dataForChart = Object.keys(kilometersByMonth).map((month) => ({
  month,
  kilometers: kilometersByMonth[month],
}));

// 3. Utilisez les données pour mettre à jour votre graphique
const updatedData = {
  labels: dataForChart.map((item) => item.month),
  datasets: [
    {
      data: dataForChart.map((item) => item.kilometers),
    },
  ],
};



const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0, // optional, defaults to 2dp
  color: () => `rgba(153, 87, 255, 1)`,
  labelColor: () => `rgba(0, 0, 0, 1)`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
  },
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [prenom, setPrenom] = useState('');
  const totalTrips = dataArray.length;

  const totalHours = dataArray.reduce((acc, trip) => {
    // Convertissez la durée de chaque trajet en heures
    const tripHours = convertDurationToHours(trip.duration);
    // Ajoutez les heures de ce trajet à l'accumulateur
    return acc + tripHours;
  }, 0);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Vérifier si un utilisateur est actuellement connecté
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          console.log('ID utilisateur Firebase Auth:', currentUser.uid); // Ajoutez ce log
  
          const userDoc = await firebase.firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();
  
          if (userDoc.exists) {
            const userData = userDoc.data();
            setPrenom(userData.displayName);
          } else {
            console.log('Document utilisateur introuvable dans Firestore.');
          }
        } else {
          console.log('Aucun utilisateur n\'est actuellement connecté.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  const totals = dataArray.reduce((acc, trip) => {
    // Ajoutez les valeurs de chaque catégorie à l'accumulateur
    acc.bg += trip.bg || 0;
    acc.bd += trip.bd || 0;
    acc.cg += trip.cg || 0;
    acc.cd += trip.cd || 0;
    acc.rg += trip.rg || 0;
    acc.rd += trip.rd || 0;
    return acc;
  }, { bg: 0, bd: 0, cg: 0, cd: 0, rg: 0, rd: 0 });
  
  const calculateTotalValues = (dataArray) => {
    let totalCampagne = 0;
    let totalVille = 0;
    let totalVoieRapide = 0;
    let totalAutoroute = 0;
  
    // Parcourir chaque élément du tableau dataArray
    dataArray.forEach((trip) => {
      // Ajouter les valeurs de chaque catégorie à leurs totaux respectifs
      totalCampagne += trip.campagne || 0;
      totalVille += trip.ville || 0;
      totalVoieRapide += trip.voieRapide || 0;
      totalAutoroute += trip.autoroute || 0;
    });
  
    // Retourner un objet contenant les totaux de chaque catégorie
    return {
      totalCampagne,
      totalVille,
      totalVoieRapide,
      totalAutoroute,
    };
  };
  
  
  // Calcul des pourcentages
  const totalCampagne = dataArray.reduce((acc, trip) => acc + trip.campagne, 0);
  const totalVille = dataArray.reduce((acc, trip) => acc + trip.ville, 0);
  const totalAutoroute = dataArray.reduce((acc, trip) => acc + trip.autoroute, 0);
  const totalVoieRapide = dataArray.reduce((acc, trip) => acc + trip.voieRapide, 0);

  const totalValues = {
    totalCampagne,
    totalVille,
    totalAutoroute,
    totalVoieRapide,
  };

  const totalPourcentage = totalCampagne + totalVille + totalVoieRapide + totalAutoroute;

  const pourcentageCampagne = Math.floor((totalCampagne / totalPourcentage) * 100);
  const pourcentageVille = Math.floor((totalVille / totalPourcentage) * 100);
  const pourcentageVoieRapide = Math.floor((totalVoieRapide / totalPourcentage) * 100);
  const pourcentageAutoroute = Math.floor((totalAutoroute / totalPourcentage) * 100);
  

  
  
  
  

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "rgba(96, 56, 224, 0.18)",
        }}
      >
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={{ width: "100%", paddingHorizontal: 30, gap: 10 }}>
            <View // TOP
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Image
                  source={require("../assets/profile/2.png")}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 14, fontWeight: 700 }} >Bonjour {prenom || 'utilisateur'}!</Text>
                
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EFF9F5",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Feather name="message-circle" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EFF9F5",
                    padding: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => navigation.navigate('UserSettings')}
                >
                  <Feather name="settings" size={24} color="black" />
                </TouchableOpacity>
                
              </View>
            </View>

            <View // Stats
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
                <View
                  style={{
                    backgroundColor: "white",
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10
                  }}
                >
                  <View style={{flexDirection: "row", alignItems: "center", gap:5}}>
                    <Feather name="map-pin" size={24} color="#6038E0" />
                    <Text style={{fontSize:13, fontWeight:700}}>Trajets</Text>
                  </View>
                  <Text style={{fontSize:20, fontWeight:700}}>{totalTrips}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
                <View
                  style={{
                    backgroundColor: "white",
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10
                  }}
                >
                  <View style={{flexDirection: "row", alignItems: "center", gap:5}}>
                    <Feather name="clock" size={24} color="#6038E0" />
                    <Text style={{fontSize:13, fontWeight:700}}>Temps</Text>
                  </View>
                  <View style={{flexDirection:"row", alignItems: "flex-end"}} >
                    <Text style={{fontSize:18, fontWeight:700}}>{totalHours.toFixed(2)}</Text>
                    <Text style={{fontSize:10}}>heures</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
                <View
                  style={{
                    backgroundColor: "white",
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10
                  }}
                >
                  <View style={{flexDirection: "row", alignItems: "center", gap:5}}>
                    <Feather name="compass" size={24} color="#6038E0" />
                    <Text style={{fontSize:13, fontWeight:700}}>Km</Text>
                  </View>
                  <View style={{flexDirection:"row", alignItems: "flex-end"}} >
                    <Text style={{fontSize:20, fontWeight:700}}>{totalKilometers.toFixed()}</Text>
                    <Text style={{fontSize:10}}>km</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
              <View style={{ width: "100%", height: 220, marginTop: 20, alignItems: "center" }}>
                <LineChart
                  data={updatedData}
                  width={Dimensions.get("window").width - 2 * 30 }
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                    borderRadius: 16,
                    
                  }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{paddingTop: 30}} onPress={() => navigation.navigate('Activity')}>
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: 15,
                  paddingVertical: 10,
                  gap: 5,
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingBottom:15,
                }}
              >
                <View style={{alignItems: "center", gap:5}}>
                  <Image source={require("../assets/icon/cg.png")} style={{width: 41, height: 41}} />
                  <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                    <Text style={{fontWeight:700, color: "white"}}>{totals.bg}</Text>
                  </View>
                </View>
                <View style={{alignItems: "center", gap:5}}>
                  <Image source={require("../assets/icon/cd.png")} style={{width: 41, height: 41}} />
                  <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                    <Text style={{fontWeight:700, color: "white"}}>{totals.bd}</Text>
                  </View>
                </View>
                <View style={{alignItems: "center", gap:5}}>
                  <Image source={require("../assets/icon/bg.png")} style={{width: 41, height: 41}} />
                  <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                    <Text style={{fontWeight:700, color: "white"}}>{totals.cg}</Text>
                  </View>
                </View>
                <View style={{alignItems: "center", gap:5}}>
                  <Image source={require("../assets/icon/bd.png")} style={{width: 41, height: 41}} />
                  <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                    <Text style={{fontWeight:700, color: "white"}}>{totals.cd}</Text>
                  </View>
                </View>
                <View style={{alignItems: "center", gap:5}}>
                  <Image source={require("../assets/icon/rg.png")} style={{width: 41, height: 41}} />
                  <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                    <Text style={{fontWeight:700, color: "white"}}>{totals.rg}</Text>
                  </View>
                </View>
                <View style={{alignItems: "center", gap:5}}>
                  <Image source={require("../assets/icon/rd.png")} style={{width: 41, height: 41}} />
                  <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                    <Text style={{fontWeight:700, color: "white"}}>{totals.rd}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{paddingTop: 30}} onPress={() => navigation.navigate('Activity')}>
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: 15,
                  paddingVertical: 10,
                  gap: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingBottom:15,
                }}
              >
                  <View style={{alignItems: "center", gap:15}}>
                    <View style={{alignItems:"center"}}>
                      <Image source={require("../assets/icon/campagne.png")} style={{width: 41, height: 41}} /> 
                      <Text>Campagne</Text>
                    </View>
                    <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                      <Text style={{fontWeight:700, color: "white"}}>{pourcentageCampagne}%</Text>
                    </View>
                  </View>
                  <View style={{alignItems: "center", gap:15}}>
                    <View style={{alignItems:"center"}}>
                      <Image source={require("../assets/icon/ville.png")} style={{width: 41, height: 41}} /> 
                      <Text>Ville</Text>
                    </View>
                    <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                      <Text style={{fontWeight:700, color: "white"}}>{pourcentageVille}%</Text>
                    </View>
                  </View>
                  <View style={{alignItems: "center", gap:15}}>
                  <View style={{alignItems:"center"}}>
                      <Image source={require("../assets/icon/autoroute.png")} style={{width: 41, height: 41}} /> 
                      <Text>Autoroute</Text>
                    </View>
                    <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                      <Text style={{fontWeight:700, color: "white"}}>{pourcentageAutoroute}%</Text>
                    </View>
                  </View>
                  <View style={{alignItems: "center", gap:15}}>
                  <View style={{alignItems:"center"}}>
                      <Image source={require("../assets/icon/voieRapide.png")} style={{width: 41, height: 41}} /> 
                      <Text>Voie Rapide</Text>
                    </View> 
                    <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                      <Text style={{fontWeight:700, color: "white"}}>{pourcentageVoieRapide}%</Text>
                    </View>
                  </View>
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
