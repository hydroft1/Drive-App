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
import { LinearGradient } from "expo-linear-gradient";

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
      edges={["top"]}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
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
          height: "auto",
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
        
        <View style={{ gap: 10}}>
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

        <View
          style={{
            flexDirection: "row-reverse",
            marginTop: 12,
          }}
        >
          <Text style={{ fontWeight: "500", color: "#6038E0" }}>
            Forgot Password
          </Text>
        </View>

        <LinearGradient
          colors={["#B138E0", "#5638E0"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: "100%",
            padding: 15,
            marginTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 8,
          }}
        >
          <TouchableOpacity // Bouton Login
            onPress={() => loginUser(email, password)}
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
        </LinearGradient>

        <TouchableOpacity // Bouton SignUp
          onPress={() => navigation.navigate("SignUpScreen")}
          style={{ marginTop: 10, width: "100%" }}
        >
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
