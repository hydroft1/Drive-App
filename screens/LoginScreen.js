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
      style={{ flex: 1, alignItems: "center", backgroundColor: "purple" }}
    >
      <View style={{ marginTop: 50 }}>
        <Image source={require("../assets/banner.png")} />
      </View>

      <View
        style={{
          padding: 30,
          justifyContent: "space-around",
          backgroundColor: "white",
          width: "100%",
          height: "auto%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Bienvenue
        </Text>
        <View // Email carré
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#EFF9F5",
            paddingVertical: 5,
            borderRadius: 8,
            paddingHorizontal: 15,
            width: "100%",
          }}
        >
          <Feather name="at-sign" size={24} color="black" />

          <TextInput
            style={{
              width: "100%",
              marginVertical: 10,
              fontSize: 16,
            }}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View // Password Carré
          style={{ marginTop: 0 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#EFF9F5",
              paddingVertical: 5,
              borderRadius: 8,
              paddingHorizontal: 15,
            }}
          >
            <Feather name="eye" size={24} color="black" />

            <TextInput
              style={{
                color: "gray",
                marginVertical: 10,
                width: "100%",
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
      </View>

      <TouchableOpacity // Bouton Login
        onPress={() => loginUser(email, password)}
        style={{
          width: "100%",
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

      <TouchableOpacity // Bouton SignUp
        onPress={() => navigation.navigate("SignUpScreen")}
        style={{ marginTop: 10, width: "100%" }}
      >
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
