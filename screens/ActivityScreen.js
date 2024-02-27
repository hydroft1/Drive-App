import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";

const ActivityScreen = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <SafeAreaView 
      edges={["top"]}       
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(96, 56, 224, 0.18)",
      }}>
        <ScrollView>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default ActivityScreen

const styles = StyleSheet.create({})