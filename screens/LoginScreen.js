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
import { firebase } from "../config";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
  
        if (authToken) {
          // If authToken exists, navigate to "Main" screen
          navigation.replace("Main");
        } else {
          const user = firebase.auth().currentUser;
          if (user && user.getIdToken) {
            // If user is signed in, navigate to "Main" screen
            navigation.replace("Main");
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
  
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        console.log(response);
        const user = response.user;
        user.getIdToken().then((token) => {
          AsyncStorage.setItem("authToken", token).then(() => {
            navigation.replace("Main");
          });
        });
      })
      .catch((error) => {
        Alert.alert("Login error");
        console.log("error login screen ", error);
      });
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
                    paddingBottom: 50,
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
                    <Feather name="lock" size={24} color="black" />
                    <TextInput
                      returnKeyType="send"
                      ref={(input) => {
                        passwordinput = input;
                      }}
                      style={{
                        color: "gray",
                        marginVertical: 10,
                        width: "80%",
                        fontSize: 16,
                      }}
                      placeholder="Password"
                      value={password}
                      onChangeText={(password) => setPassword(password)}
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={!showPassword} // Utilisation du type "password" ou "text" en fonction de la visibilité
                    />
                    {/* Bouton pour basculer la visibilité du mot de passe */}
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <Feather name={showPassword ? "eye" : "eye-off"} size={24} />
                    </TouchableOpacity>
                  </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row-reverse",
                      marginTop: 12,
                    }}
                  >
                    <TouchableOpacity
                    // onPress={onPress}
                    >
                      <Text style={{ fontWeight: "500", color: "#6038E0" }}>
                        Mot de passe oublié
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ gap: 20 }}>
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
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                      }}
                    >
                      <TouchableOpacity // Bouton Login
                        onPress={handleLogin}
                        style={{
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 4 },
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

                    <View style={{ width: "100%", alignItems: "center" }}>
                      <Text style={{ fontWeight: 600, fontSize: 18 }}>Or</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#EFF9F5",
                          padding: 10,
                          borderRadius: 10,
                        }}
                      >
                        <Image
                          source={require("../assets/google-icon.png")}
                          style={{ width: 36, height: 36 }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#EFF9F5",
                          padding: 10,
                          borderRadius: 10,
                        }}
                      >
                        <Image
                          source={require("../assets/facebook-icon.png")}
                          style={{ width: 36, height: 36 }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: 5,
                      }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: 500 }}>
                        Vous n'avez pas de compte ?
                      </Text>
                      <TouchableOpacity // Bouton SignUp
                        onPress={() => navigation.navigate("SignUp")}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 16,
                            fontWeight: "700",
                            color: "#6038E0",
                          }}
                        >
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
