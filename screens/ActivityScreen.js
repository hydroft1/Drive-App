import { Text, View, Image, TouchableOpacity, StyleSheet, Anim } from "react-native";
import React, { useRef, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Info from "../components/Info";
import { dataArray } from '../components/TripData';

const ActivityScreen = () => {
  const navigation = useNavigation();

  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < dataArray.length; i++) {
      const item = dataArray[i];
      components.push(
        <Info
          key={i}
          date={item.date}
          distance={item.distance}
          duration={item.duration}
          weatherIcon={item.weatherIcon} 
          timeIcon={item.timeIcon} 
          start={item.start}
          end={item.end}
          bg={item.bg}
          bd={item.bd}
          cg={item.cg}
          cd={item.cd}
          rg={item.rg}
          rd={item.rd}
          campagne={item.campagne}
          ville={item.ville}
          autoroute={item.autoroute}
          voieRapide={item.voieRapide}
          commentaire={item.commentaire}
        />
      );
    }
    return components;
  };
  

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
                onPress={() => navigation.navigate('UserSettings')}
              >
                <Feather name="settings" size={24} color="black" />
              </TouchableOpacity>
            </View>
            </View>
            <ScrollView style={{width: "100%"}}>
              <View style={{width: "100%", gap: 20, paddingBottom: 100}}>
                {renderComponents().reverse()}
              </View>
            </ScrollView>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default ActivityScreen

const styles = StyleSheet.create({})