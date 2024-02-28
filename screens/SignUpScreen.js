import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prenom, setPrenom] = useState("");

  const registerUser = async () => {
    if (email && password && prenom) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          firebase.auth(),
          email,
          password
        );

        if (userCredential && userCredential.user) {
          const user = userCredential.user;
          // Mise à jour du profil de l'utilisateur
          await firebase.auth().currentUser.updateProfile({
            displayName: prenom, // Assurez-vous que la clé est "displayName" pour stocker le prénom dans le profil de l'utilisateur
          });

          // Enregistrement de l'utilisateur dans Firestore
          await addDoc(collection(firebase.firestore(), "users"), {
            uid: user.uid,
            email: user.email,
            displayName: prenom,
          });

          // Stockage de l'authToken après la création du compte
          const token = await user.getIdToken();
          await AsyncStorage.setItem("authToken", token);

          // Redirection vers la page d'accueil après la création de compte
          navigation.replace("Main");
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
      }
    } else {
      console.error("Veuillez remplir tous les champs.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
          <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>  
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
                    flex: 1,
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
                        allname.focus();
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
                    />
                  </View>

                  <View // Full Name
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
                    <Feather name="user" size={24} color="black" />

                    <TextInput
                      onSubmitEditing={() => {
                        passwordinput.focus();
                      }}
                      returnKeyType="send"
                      ref={(input) => {
                        allname = input;
                      }}
                      style={{
                        width: "100%",
                        marginVertical: 10,
                        fontSize: 16,
                      }}
                      placeholder="Nom Complet"
                      onChangeText={(prenom) => setPrenom(prenom)}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>

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


                  <View style={{justifyContent: "flex-start", flexDirection: "row", paddingHorizontal: 15, flexWrap: 'wrap'}}>
                    <Text style= {{ fontWeight: "300", fontSize: 11 }}>En vous inscrivant, vous acceptez nos</Text>
                    <TouchableOpacity>
                      <Text style={{ color: "#6038E0", fontWeight: "600", fontSize: 12}}>conditions générales et notre politique de confidentialité.</Text>
                    </TouchableOpacity>
                  </View>

                </View>

                <View
                  style={{
                    flexDirection: "row-reverse",
                    marginTop: 12,
                  }}
                >
                <TouchableOpacity>
                    <Text style={{ fontWeight: "500", color: "#6038E0" }}>
                      Mot de passe oublié
                    </Text>
                </TouchableOpacity>
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
                    }}
                  >
                    <TouchableOpacity // Bouton Register
                      onPress={() => registerUser(email, password, prenom)}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "white",
                        }}
                      >
                        S'inscrire
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>

                  <View style={{ justifyContent: "center", flexDirection: "row", gap:5}} >
                    <Text style={{fontSize: 16, fontWeight:500 }}>
                        Vous avez déjà un compte ? 
                    </Text>
                    <TouchableOpacity // Bouton Login
                      onPress={() => navigation.navigate("Login")}
                      
                    >
                      <Text style={{ textAlign: "center", fontSize: 16, fontWeight:"700", color:"#6038E0" }}>
                        Connectez-vous
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

export default SignUpScreen;
