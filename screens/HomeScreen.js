import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LineChart } from 'react-native-chart-kit';
import BottomSheet, { BottomSheetView} from "@gorhom/bottom-sheet";

const data = {
  labels: ['Mai', 'Juin', 'Jui', 'Aou', 'Sep', 'Oct'],
  datasets: [
    {
      data: [0, 500, 786, 1160, 1508, 1750],
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
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);

  const snapPoints = ["0%","80%"];

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(96, 56, 224, 0.18)",
      }}
    >
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
            <Text style={{ fontSize: 14, fontWeight: 700 }}>
              {" "}
              Bonjour Alexandre !
            </Text>
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
          <TouchableOpacity>
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
              <Text style={{fontSize:20, fontWeight:700}}>165</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
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
                <Text style={{fontSize:20, fontWeight:700}}>126</Text>
                <Text>heures</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
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
              <Text style={{fontSize:20, fontWeight:700}}>1750</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <View style={{ width: "100%", height: 220, marginTop: 20, alignItems: "center" }}>
            <LineChart
              data={data}
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

        <TouchableOpacity style={{paddingTop: 30}}>
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
                <Text style={{fontWeight:700, color: "white"}}>2</Text>
              </View>
            </View>
            <View style={{alignItems: "center", gap:5}}>
              <Image source={require("../assets/icon/cd.png")} style={{width: 41, height: 41}} />
              <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                <Text style={{fontWeight:700, color: "white"}}>10</Text>
              </View>
            </View>
            <View style={{alignItems: "center", gap:5}}>
              <Image source={require("../assets/icon/bg.png")} style={{width: 41, height: 41}} />
              <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                <Text style={{fontWeight:700, color: "white"}}>0</Text>
              </View>
            </View>
            <View style={{alignItems: "center", gap:5}}>
              <Image source={require("../assets/icon/bd.png")} style={{width: 41, height: 41}} />
              <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                <Text style={{fontWeight:700, color: "white"}}>11</Text>
              </View>
            </View>
            <View style={{alignItems: "center", gap:5}}>
              <Image source={require("../assets/icon/rg.png")} style={{width: 41, height: 41}} />
              <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                <Text style={{fontWeight:700, color: "white"}}>45</Text>
              </View>
            </View>
            <View style={{alignItems: "center", gap:5}}>
              <Image source={require("../assets/icon/rd.png")} style={{width: 41, height: 41}} />
              <View style={{backgroundColor: "#6038E0", paddingHorizontal: 16, borderRadius: 5}}>
                <Text style={{fontWeight:700, color: "white"}}>9</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
