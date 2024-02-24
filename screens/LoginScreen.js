import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
    <KeyboardAvoidingView>
    <View style={{ marginTop: 50 }}>
        <Image source={require("../assets/banner.png")} />
      </View>
      
      <View style={{ marginTop: 40}}>
        <View
          style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: "#EFF9F5",
          paddingVertical: 5,
          borderRadius: 5,
          paddingLeft: 5,
          }}
        >
          <Feather name="at-sign" size={24} color="black" />

          <TextInput
            style={{
              marginVertical: 10,
              width: 300,
              fontSize: email ? 16 : 16,
            }}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      <View style={{marginTop: 30}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#EFF9F5",
            paddingVertical: 5,
            borderRadius: 5,
            paddingLeft: 5,
          }}
        >
          <Feather name="eye" size={24} color="black" />

          <TextInput
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              fontSize: email ? 16 : 16,
            }}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
      </View>
      
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={{
          width: 200,
          backgroundColor: "black",
          padding: 15,
          marginTop: 40,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 6,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
            color: "white",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>



      <TouchableOpacity
        onPress={() => navigation.navigate("SignUpScreen")}
        style={{ marginTop: 10 }}
      >
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
