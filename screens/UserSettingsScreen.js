import {Text, View, Image, Switch } from "react-native";
import React, { useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const UserSettingsScreen = () => {
  const navigation = useNavigation();
  const [switch1Value, setSwitch1Value] = useState(false);
  const [switch2Value, setSwitch2Value] = useState(false);
  const [switch3Value, setSwitch3Value] = useState(false);

  const toggleSwitch1 = () => {
    setSwitch1Value((previousValue) => !previousValue);
  };

  const toggleSwitch2 = () => {
    setSwitch2Value((previousValue) => !previousValue);
  };

  const toggleSwitch3 = () => {
    setSwitch3Value((previousValue) => !previousValue);
  };

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem("authToken");
      navigation.replace("Login");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "rgba(96, 56, 224, 0.18)" }}
      >
        <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor:"transparent" }}>
          <View // MON COMPTE
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EFF9F5",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Feather name="chevron-left" size={28} color="#6038E0" />
            </TouchableOpacity>
            <Text style={{ fontWeight: 700, flex: 1, textAlign: "center" }}>
              Mon Compte
            </Text>
          </View>

          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, gap:25, paddingBottom: 100, paddingTop: 20 }}>

              <View // Apprenti
                style={{
                  gap: 15,
                  backgroundColor: "#EFF9F5",
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingBottom: 20,
                  paddingTop:10,
                }}
              >
                <Text style={{fontWeight:800}}>Apprenti</Text>
                <TouchableOpacity>
                  <View style={{flexDirection:"row", gap:10, alignItems:"center"}}>
                    <Image
                      source={require("../assets/profile/2.png")}
                      style={{ width: 50, height: 50 }}
                      resizeMode="contain"
                    ></Image>
                    <View style={{flex:1,flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                      <Text style={{fontWeight:600}}>Alexandre</Text>
                      <Feather name="chevron-right" size={28} color="black" />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View // Connexion
                style={{
                  gap: 15,
                  backgroundColor: "#EFF9F5",
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingBottom: 20,
                  paddingTop:10,
                }}
              >
                <Text style={{fontWeight:800}}>Connexion</Text>
                <View style={{flexDirection:"row", gap:10, alignItems: "center"}}>
                  <Feather name="mail" size={24} color="black" />
                  <Text style={{fontWeight:600}}>abc@gmail.com</Text>
                </View>
                <View // Bouton SignOUT
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      padding: 15,
                      borderRadius: 15,
                      borderBlockColor: "red",
                    }}
                    onPress={handleSignOut}
                  >
                    <Text style={{ fontWeight: 700,}}>Déconnexion</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View // Véchicules
                style={{
                  gap: 15,
                  backgroundColor: "#EFF9F5",
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingBottom: 20,
                  paddingTop:10,
                }}
              >
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                  <Text style={{fontWeight:800}}>Mes véhicules</Text>
                  <TouchableOpacity style={{flexDirection:"row", alignItems:"center", gap:5}}>
                    <Text style={{opacity: 0.5}}>Ajouter un véhicule</Text>
                    <Feather name="plus" size={18} color="black" style={{opacity: 0.5}}/>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={{flexDirection:"row", gap:10, alignItems:"center"}}>
                    <View style={{backgroundColor:"white", borderRadius:100, width: 50, height: 50, justifyContent:"center", alignItems:"center"}}>
                      <Ionicons name="car-sport-sharp" size={24} color="black" />
                    </View>
                    <View style={{flex:1,flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                      <Text style={{fontWeight:600}}>Peugeot 5008</Text>
                      <TouchableOpacity>
                        <Feather name="trash" size={24} color="red" />
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                </View>
                <View>
                  <View style={{flexDirection:"row", gap:10, alignItems:"center"}}>
                    <View style={{backgroundColor:"white", borderRadius:100, width: 50, height: 50, justifyContent:"center", alignItems:"center"}}>
                      <Ionicons name="car-sport-sharp" size={24} color="black" />
                    </View>
                    <View style={{flex:1,flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                      <Text style={{fontWeight:600}}>Peugeot 5008</Text>
                      <TouchableOpacity>
                        <Feather name="trash" size={24} color="red" />
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                </View>
                <View>
                  <View style={{flexDirection:"row", gap:10, alignItems:"center"}}>
                    <View style={{backgroundColor:"white", borderRadius:100, width: 50, height: 50, justifyContent:"center", alignItems:"center"}}>
                      <Ionicons name="car-sport-sharp" size={24} color="black" />
                    </View>
                    <View style={{flex:1,flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                      <Text style={{fontWeight:600}}>Peugeot 5008</Text>
                      <TouchableOpacity>
                        <Feather name="trash" size={24} color="red" />
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                </View>
                <View>
                  <View style={{flexDirection:"row", gap:10, alignItems:"center"}}>
                    <View style={{backgroundColor:"white", borderRadius:100, width: 50, height: 50, justifyContent:"center", alignItems:"center"}}>
                      <Ionicons name="car-sport-sharp" size={24} color="black" />
                    </View>
                    <View style={{flex:1,flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                      <Text style={{fontWeight:600}}>Peugeot 5008</Text>
                      <TouchableOpacity>
                        <Feather name="trash" size={24} color="red" />
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                </View>
              </View>
              
              <View
                style={{
                  backgroundColor: "#EFF9F5",
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingBottom: 20,
                  paddingTop:10,
                  flexDirection:"row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
              <TouchableOpacity>
                <Ionicons name="logo-instagram" size={32} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="logo-tiktok" size={30} color="black" />
              </TouchableOpacity>
              </View>

              <View
                style={{
                  backgroundColor: "#EFF9F5",
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingBottom: 20,
                  paddingTop:10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap:15,
                }}
              >
              <TouchableOpacity>
                <Text style={{fontWeight:600}}>Changer de mail</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style={{fontWeight:600}}>Conditions d'utilisation</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style={{fontWeight:600}}>Vie Privée</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style={{fontWeight:600}}>Supprimer mon Compte</Text>
              </TouchableOpacity>
              </View>

              <View
                style={{
                  backgroundColor: "#EFF9F5",
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingBottom: 20,
                  paddingTop:10,
                  alignItems: "center",
                  gap:10,
                }}
              >
                <View style={{width: "100%",flexDirection:"row", justifyContent:"space-between", alignItems:"center", gap:10}}>
                  <Text>Autoriser l'utilisation du GPS</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#6038E0" }} // Couleur du fond du switch en fonction de son état
                    thumbColor={switch1Value ? "##6038E0" : "#f4f3f4"} // Couleur du bouton du switch en fonction de son état
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch1} // Fonction appelée lorsque le switch est pressé
                    value={switch1Value} // État actuel du switch
                  />
                </View>
                <View style={{width: "100%",flexDirection:"row", justifyContent:"space-between", alignItems:"center", gap:10}}>
                  <Text>Autoriser la prospection commercial</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#6038E0" }} // Couleur du fond du switch en fonction de son état
                    thumbColor={switch2Value ? "##6038E0" : "#f4f3f4"} // Couleur du bouton du switch en fonction de son état
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch2} // Fonction appelée lorsque le switch est pressé
                    value={switch2Value} // État actuel du switch
                  />
                </View>
                <View style={{width: "100%",flexDirection:"row", justifyContent:"space-between", alignItems:"center", gap:10}}>
                  <Text>Autoriser la recherche et développement</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#6038E0" }} // Couleur du fond du switch en fonction de son état
                    thumbColor={switch3Value ? "##6038E0" : "#f4f3f4"} // Couleur du bouton du switch en fonction de son état
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch3} // Fonction appelée lorsque le switch est pressé
                    value={switch3Value} // État actuel du switch
                  />
                </View>
              </View>

            </View>  
          </ScrollView>   
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default UserSettingsScreen;
