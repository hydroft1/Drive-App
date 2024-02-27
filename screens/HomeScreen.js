import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LineChart } from 'react-native-chart-kit';

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
                <Text style={{fontSize:13, fontWeight:700}}>Trajets</Text>
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
                <Text style={{fontSize:13, fontWeight:700}}>Trajets</Text>
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

        

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
