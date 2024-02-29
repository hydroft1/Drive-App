import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const RapportScreen = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView style={{flex: 1, backgroundColor: "rgba(96, 56, 224, 0.18)"}}>
            <SafeAreaView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 30 }}>
                <View style={{flex: 1, alignItems:"center", gap:20}}>
                    <Text style={{fontWeight:700, fontSize: 20}}>Rapport d'évaluation</Text>
                    <View style={{width:"100%", justifyContent:"flex-start", gap:10}}>
                        <Text style={{fontSize: 16, fontWeight:700}}>Météo:</Text>
                        <View style={{flexDirection:"row", gap:20}}>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="sun" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="cloud-rain" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="cloud-lightning" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Fontisto name="fog" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Fontisto name="snowflake" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:"100%", justifyContent:"flex-start", gap:10}}>
                        <Text style={{fontSize: 16, fontWeight:700}}>Traffic:</Text>
                        <View style={{flexDirection:"row", gap:20}}>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="sun" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="cloud-rain" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="cloud-lightning" size={24} color="black" />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    </GestureHandlerRootView>
  )
}

export default RapportScreen

const styles = StyleSheet.create({})