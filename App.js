import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import React, { useState, useEffect, Suspense } from "react";
import { firebase } from "./config";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Header from "./components/Header";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerTitle: () => <Header name="Drive-AAC" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerTitle: () => <Header name="Drive-AAC" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => <Header name="Home Screen" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
