import { StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSettingsScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem("authToken");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "rgba(96, 56, 224, 0.18)" }}
    >
      <View style={{ flex: 1, paddingHorizontal: 15, width: "100%" }}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={28} color="#6038E0" />
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{ backgroundColor: "white", padding: 15, borderRadius: 15 }}
            onPress={handleSignOut}
          >
            <Text style={{ fontWeight: 700 }}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserSettingsScreen;
