import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
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
    <LinearGradient
      colors={["#B138E0", "#5638E0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView
          edges={["top"]}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 300, width: "60%", opacity: 0.5 }}
                  source={require("../assets/banner.png")}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    position: "absolute",
                    bottom: 50,
                    fontSize: 30,
                    fontWeight: "900",
                    color: "white",
                  }}
                >
                  Drive AAC
                </Text>
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

                <View style={{ gap: 15 }}>
                  <View // Email carré
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      backgroundColor: "#EFF9F5",
                      paddingVertical: 5,
                      borderRadius: 8,
                      paddingHorizontal: 15,
                      width: "100%",
                    }}
                  >
                    <Feather name="at-sign" size={24} color="black" />

                    <TextInput
                      onSubmitEditing={() => {
                        passwordInput.focus();
                      }}
                      returnKeyType="send"
                      style={{
                        width: "100%",
                        marginVertical: 10,
                        fontSize: 16,
                      }}
                      placeholder="Email"
                      onChangeText={(email) => setEmail(email)}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="visible-password"
                    />
                  </View>

                  <View // Password Carré
                    style={{ marginTop: 0 }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        backgroundColor: "#EFF9F5",
                        paddingVertical: 5,
                        borderRadius: 8,
                        paddingHorizontal: 15,
                      }}
                    >
                      <Feather name="eye" size={24} color="black" />

                      <TextInput
                        returnKeyType="send"
                        ref={(input) => {
                          passwordInput = input;
                        }}
                        style={{
                          marginVertical: 10,
                          width: "100%",
                          fontSize: email ? 16 : 16,
                        }}
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onSubmitEditing={() => loginUser(email, password)}
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
                    Mot de passe oublié
                  </Text>
                </View>
                <View style={{ gap: 20}}>
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
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4},
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                      
                    }}
                  >
                    <TouchableOpacity // Bouton Login
                      onPress={() => loginUser(email, password)}
                      style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4},
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        
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
                        Se connecter
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  
                  <View style={{ justifyContent: "center", flexDirection: "row", gap:5}}>
                    <Text style={{fontSize: 16, fontWeight:"300" }}>
                        Vous n'avez pas de compte ? 
                    </Text>
                    <TouchableOpacity // Bouton SignUp
                      onPress={() => navigation.navigate("SignUpScreen")}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        

                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 16, fontWeight:"700", color:"#6038E0" }}>
                        Créer un compte
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
