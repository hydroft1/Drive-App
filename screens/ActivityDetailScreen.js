import React from "react";
import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TouchableOpacity,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PieChart } from 'react-native-svg-charts';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const ActivityDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { date, distance, duration, weatherIcon, timeIcon, start, end, bg, bd, cg, cd, rg, rd, campagne, ville, voieRapide, autoroute, commentaire } =
    route.params;

    const data = [
        {
          key: 1,
          value: campagne,
          svg: { fill: 'blue' },
        },
        {
          key: 2,
          value: ville,
          svg: { fill: 'purple' },
        },
        {
          key: 3,
          value: autoroute,
          svg: { fill: 'green' },
        },
        {
            key: 4,
            value: voieRapide,
            svg: { fill: 'orange' },
          },
      ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "rgba(96, 56, 224, 0.18)",
          width: "100%",
        }}
      >
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View // PAGE
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 30,
              gap: 10,
              paddingBottom:30,
            }}
          >
            <View // TOP
              style={{
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: 44,
                    height: 44,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name="chevron-left" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <Text style={{ fontWeight: 700, fontSize: 20 }}>
                Détail du trajet
              </Text>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: 44,
                    height: 44,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name="external-link" size={24} color="#6038E0" />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                alignItems: "center",
                gap: 10,
                paddingVertical: 10,
                borderRadius: 12,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500 }}>{date}</Text>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Text style={{ fontWeight: 500 }}>{distance}</Text>
                <Text style={{ fontWeight: 500 }}>{duration}</Text>
                <Feather name={weatherIcon} size={24} color="black" />
                <Feather name={timeIcon} size={24} color="black" />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "100%",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Feather name="map-pin" size={24} color="black" />
                <Text>{start}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "100%",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Feather name="x-circle" size={24} color="black" />
                <Text>{end}</Text>
              </View>
              <View style={{width:"100%", height:130, backgroundColor:"black", borderRadius:12}}>
                  {/* MAP DE L ITINERAIRE */}
              </View>
              <View style={{width:"100%", alignContent:"flex-start"}}>
                  <Text style={{fontWeight:700}}>Typologie de la routes :</Text>
              </View>
              <View style={{flexDirection:"row", width:"100%", justifyContent:"space-between"}}>
                  <View style={{alignItems: 'center' }}>
                      <PieChart
                          style={{ height: 100, width: 100 }}
                          data={data}
                          innerRadius={'50%'} // Cela crée un graphique doughnut
                      />
                  </View>
                  <View style={{justifyContent:"space-around", gap:10}}>
                      <View style={{flexDirection:"row", gap:16}}>
                          <View style={{flexDirection:"row", alignItems:"center", gap:5}}>
                              <Image source={require("../assets/icon/campagne.png")} style={{width: 41, height: 41}} /> 
                              <Text style={{fontWeight:800, color:"blue"}}>{campagne}%</Text>
                          </View>
                          <View style={{flexDirection:"row", alignItems:"center", gap:5}}>
                              <Image source={require("../assets/icon/ville.png")} style={{width: 41, height: 41}} />
                              <Text style={{fontWeight:800, color:"purple"}}>{ville}%</Text>
                          </View>
                      </View>
                      <View style={{flexDirection:"row", gap:16}}>
                          <View style={{flexDirection:"row", alignItems:"center", gap:5}}>
                            <Image source={require("../assets/icon/autoroute.png")} style={{width: 41, height: 41}} />
                            <Text style={{fontWeight:800, color:"orange"}}>{autoroute}%</Text>
                          </View>
                          <View style={{flexDirection:"row", alignItems:"center", gap:5}}>
                            <Image source={require("../assets/icon/voieRapide.png")} style={{width: 41, height: 41}} />
                            <Text style={{fontWeight:800, color:"green"}}>{voieRapide}%</Text>
                          </View>
                      </View>
                  </View>
              </View>
              <View style={{flexDirection:"row", width:"100%", justifyContent:"space-between", padding:10}}>
                  <View style={{alignItems:"center", gap:10}}>
                      <Text style={{fontWeight:700, fontSize:18}}>Véhicule</Text>
                      <View style={{backgroundColor:"#EFF9F5", width:50, height:50, alignItems:"center", justifyContent:"center", borderRadius:100}}>
                          <FontAwesome5 name="car" size={24} color="#6038E0" />
                      </View>
                      <Text style={{fontSize:10, opacity:0.45}}>Peugeot 5008</Text>
                  </View>
                  <View style={{alignItems:"center", gap:10}}>
                      <Text style={{fontWeight:700, fontSize:18}}>Accompagnant</Text>
                      <View style={{backgroundColor:"#EFF9F5", width:50, height:50, alignItems:"center", justifyContent:"center", borderRadius:100}}>
                          <FontAwesome5 name="user-friends" size={24} color="#6038E0"/>
                      </View>
                      <Text style={{fontSize:10, opacity:0.45}}>Maman</Text>
                  </View>
              </View>
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
                  <Text style={{fontWeight:700, color: "white"}}>{bg}</Text>
                </View>
              </View>
              <View style={{alignItems: "center", gap:5}}>
                <Image source={require("../assets/icon/cd.png")} style={{width: 41, height: 41}} />
                <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                  <Text style={{fontWeight:700, color: "white"}}>{bd}</Text>
                </View>
              </View>
              <View style={{alignItems: "center", gap:5}}>
                <Image source={require("../assets/icon/bg.png")} style={{width: 41, height: 41}} />
                <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                  <Text style={{fontWeight:700, color: "white"}}>{cg}</Text>
                </View>
              </View>
              <View style={{alignItems: "center", gap:5}}>
                <Image source={require("../assets/icon/bd.png")} style={{width: 41, height: 41}} />
                <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                  <Text style={{fontWeight:700, color: "white"}}>{cd}</Text>
                </View>
              </View>
              <View style={{alignItems: "center", gap:5}}>
                <Image source={require("../assets/icon/rg.png")} style={{width: 41, height: 41}} />
                <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                  <Text style={{fontWeight:700, color: "white"}}>{rg}</Text>
                </View>
              </View>
              <View style={{alignItems: "center", gap:5}}>
                <Image source={require("../assets/icon/rd.png")} style={{width: 41, height: 41}} />
                <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                  <Text style={{fontWeight:700, color: "white"}}>{rd}</Text>
                </View>
              </View>
              </View>

              <View
              style={{
                backgroundColor: "white",
                width: "100%",
                borderRadius: 15,
                paddingVertical: 10,
                gap: 5,
                justifyContent: "center",
                paddingBottom:15,
              }}
              >
                <View style={{width:"100%", alignContent:"flex-start"}}>
                  <Text style={{fontWeight:700}}>Commentaire :</Text>
                </View>
                <Text style={{paddingHorizontal:10}}>{commentaire}</Text>
              </View>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ActivityDetailScreen;
