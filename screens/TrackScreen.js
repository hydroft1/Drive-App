import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";

const TrackScreen = () => {
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

          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default TrackScreen

const styles = StyleSheet.create({})