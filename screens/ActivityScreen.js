import { Text, View, Image, TouchableOpacity, StyleSheet, Anim } from "react-native";
import React, { useRef, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const ActivityScreen = () => {
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
                onPress={() => navigation.replace('UserSettings')}
              >
                <Feather name="settings" size={24} color="black" />
              </TouchableOpacity>
            </View>
            </View>
            <ScrollView style={{width: "100%"}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              <View style={{width: "100%", gap: 20, paddingBottom: 100}}>
                <TouchableOpacity style={{backgroundColor:"white", borderRadius: 15}}>
                  <View style={{flexDirection: "row", padding: 10, justifyContent:"space-between"}}>
                    <View style={{gap: 10}}>
                      <Text style={{fontWeight: 700}}>11 Août 2023 6h</Text>
                      <View style={{flexDirection: "row", gap:10,  justifyContent:"space-between"}}>
                        <Text>28.8km</Text>
                        <Text>0h28</Text>
                      </View>
                      <View style={{flexDirection: "row", gap:10}}>
                        <Feather name="cloud-rain" size={24} color="black" />
                        <Feather name="sun" size={24} color="black" />
                      </View>
                    </View>
                    <View style={{gap: 5}}>
                      <Feather name="chevron-right" size={24} color="#6038E0" />
                      <Feather name="trash" size={24} color="red" />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"white", borderRadius: 15}}>
                  <View style={{flexDirection: "row", padding: 10, justifyContent:"space-between"}}>
                    <View style={{gap: 10}}>
                      <Text style={{fontWeight: 700}}>11 Août 2023 6h</Text>
                      <View style={{flexDirection: "row", gap:10,  justifyContent:"space-between"}}>
                        <Text>28.8km</Text>
                        <Text>0h28</Text>
                      </View>
                      <View style={{flexDirection: "row", gap:10}}>
                        <Feather name="cloud-rain" size={24} color="black" />
                        <Feather name="sun" size={24} color="black" />
                      </View>
                    </View>
                    <View style={{gap: 5}}>
                      <Feather name="chevron-right" size={24} color="#6038E0" />
                      <Feather name="trash" size={24} color="red" />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"white", borderRadius: 15}}>
                  <View style={{flexDirection: "row", padding: 10, justifyContent:"space-between"}}>
                    <View style={{gap: 10}}>
                      <Text style={{fontWeight: 700}}>11 Août 2023 6h</Text>
                      <View style={{flexDirection: "row", gap:10,  justifyContent:"space-between"}}>
                        <Text>28.8km</Text>
                        <Text>0h28</Text>
                      </View>
                      <View style={{flexDirection: "row", gap:10}}>
                        <Feather name="cloud-rain" size={24} color="black" />
                        <Feather name="sun" size={24} color="black" />
                      </View>
                    </View>
                    <View style={{gap: 5}}>
                      <Feather name="chevron-right" size={24} color="#6038E0" />
                      <Feather name="trash" size={24} color="red" />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"white", borderRadius: 15}}>
                  <View style={{flexDirection: "row", padding: 10, justifyContent:"space-between"}}>
                    <View style={{gap: 10}}>
                      <Text style={{fontWeight: 700}}>11 Août 2023 6h</Text>
                      <View style={{flexDirection: "row", gap:10,  justifyContent:"space-between"}}>
                        <Text>28.8km</Text>
                        <Text>0h28</Text>
                      </View>
                      <View style={{flexDirection: "row", gap:10}}>
                        <Feather name="cloud-rain" size={24} color="black" />
                        <Feather name="sun" size={24} color="black" />
                      </View>
                    </View>
                    <View style={{gap: 5}}>
                      <Feather name="chevron-right" size={24} color="#6038E0" />
                      <Feather name="trash" size={24} color="red" />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"white", borderRadius: 15}}>
                  <View style={{flexDirection: "row", padding: 10, justifyContent:"space-between"}}>
                    <View style={{gap: 10}}>
                      <Text style={{fontWeight: 700}}>11 Août 2023 6h</Text>
                      <View style={{flexDirection: "row", gap:10,  justifyContent:"space-between"}}>
                        <Text>28.8km</Text>
                        <Text>0h28</Text>
                      </View>
                      <View style={{flexDirection: "row", gap:10}}>
                        <Feather name="cloud-rain" size={24} color="black" />
                        <Feather name="sun" size={24} color="black" />
                      </View>
                    </View>
                    <View style={{gap: 5}}>
                      <Feather name="chevron-right" size={24} color="#6038E0" />
                      <Feather name="trash" size={24} color="red" />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"white", borderRadius: 15}}>
                  <View style={{flexDirection: "row", padding: 10, justifyContent:"space-between"}}>
                    <View style={{gap: 10}}>
                      <Text style={{fontWeight: 700}}>11 Août 2023 6h</Text>
                      <View style={{flexDirection: "row", gap:10,  justifyContent:"space-between"}}>
                        <Text>28.8km</Text>
                        <Text>0h28</Text>
                      </View>
                      <View style={{flexDirection: "row", gap:10}}>
                        <Feather name="cloud-rain" size={24} color="black" />
                        <Feather name="sun" size={24} color="black" />
                      </View>
                    </View>
                    <View style={{gap: 5}}>
                      <Feather name="chevron-right" size={24} color="#6038E0" />
                      <Feather name="trash" size={24} color="red" />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"white", borderRadius: 15}}>
                  <View style={{flexDirection: "row", padding: 10, justifyContent:"space-between"}}>
                    <View style={{gap: 10}}>
                      <Text style={{fontWeight: 700}}>11 Août 2023 6h</Text>
                      <View style={{flexDirection: "row", gap:10,  justifyContent:"space-between"}}>
                        <Text>28.8km</Text>
                        <Text>0h28</Text>
                      </View>
                      <View style={{flexDirection: "row", gap:10}}>
                        <Feather name="cloud-rain" size={24} color="black" />
                        <Feather name="sun" size={24} color="black" />
                      </View>
                    </View>
                    <View style={{gap: 5}}>
                      <Feather name="chevron-right" size={24} color="#6038E0" />
                      <Feather name="trash" size={24} color="red" />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"white", borderRadius: 15}}>
                  <View style={{flexDirection: "row", padding: 10, justifyContent:"space-between"}}>
                    <View style={{gap: 10}}>
                      <Text style={{fontWeight: 700}}>11 Août 2023 6h</Text>
                      <View style={{flexDirection: "row", gap:10,  justifyContent:"space-between"}}>
                        <Text>28.8km</Text>
                        <Text>0h28</Text>
                      </View>
                      <View style={{flexDirection: "row", gap:10}}>
                        <Feather name="cloud-rain" size={24} color="black" />
                        <Feather name="sun" size={24} color="black" />
                      </View>
                    </View>
                    <View style={{gap: 5}}>
                      <Feather name="chevron-right" size={24} color="#6038E0" />
                      <Feather name="trash" size={24} color="red" />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
          </ScrollView>
          </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default ActivityScreen

const styles = StyleSheet.create({})