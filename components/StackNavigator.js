import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ActivityScreen from "../screens/ActivityScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrackScreen from "../screens/TrackScreen";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import UserSettingsScreen from "../screens/UserSettingsScreen";
import ActivityDetailScreen from "../screens/ActivityDetailScreen";
import UserDetailScreen from "../screens/UserDetailScreen";
import GoTrack from "../screens/GoTrack";
import RapportScreen from "../screens/RapportScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          
        }}
      >
        <Tab.Screen
          name="Activity"
          component={ActivityScreen}
          options={{
            tabBarLabel: "",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Feather name="clipboard" size={24} color="#6038E0" />
              ) : (
                <Feather name="clipboard" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Feather name="home" size={24} color="#6038E0" />
              ) : (
                <Feather name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Track"
          component={TrackScreen}
          options={{
            tabBarLabel: "",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="speed" size={24} color="#6038E0" />
              ) : (
                <MaterialIcons name="speed" size={24} color="black" />
              ),
          }}
        />

      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen 
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserSettings"
          component={UserSettingsScreen}
          options={{ headerShown: false }}
          
        />
        <Stack.Screen
          name="Activity"
          component={ActivityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ActivityDetail"
          component={ActivityDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="UserDetail"
          component={UserDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoTrack"
          component={GoTrack}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Rapport"
          component={RapportScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default StackNavigator;


