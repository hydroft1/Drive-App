import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import { SafeAreaView } from "react-native-safe-area-context";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native";

const HomeScreen = () => {
  const [name, setName] = useState("");

  const Home = async (userId) => {
    (async () => {
      await AsyncStorage.setItem("userId", userId);
      Actions.home();
    })();
  };
  

  const redirectToHome = async () => {
    (async () => {
      let userId = await AsyncStorage.getItem("userId");
      if (userId) {
        Actions.home();
      } else {
        // Redirection vers la page de connexion
      }
    })();
  };


  return (
    <SafeAreaView edges={["top"]}>
      <View>
        <Text>HomeView</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
