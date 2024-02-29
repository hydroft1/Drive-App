import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

const TrackScreen = () => {
  const navigation = useNavigation();
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <SafeAreaView 
      edges={["top"]}       
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(96, 56, 224, 0.18)",
      }}>

          <View style={{flex:1, width: "100%", paddingHorizontal: 30, gap: 10, flexDirection:"column-reverse", alignItems:"center", paddingBottom:30}}>
            <TouchableOpacity style={{backgroundColor: "#6038E0", padding:30, borderRadius:100}} onPress={() => navigation.navigate('GoTrack')}>
              <Text style={{color:"white", fontSize:24, fontWeight:900}}>GO</Text>
            </TouchableOpacity>
          </View>

      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default TrackScreen

const styles = StyleSheet.create({})