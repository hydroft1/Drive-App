import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import StackNavigator from "./components/StackNavigator";

export default function App() {
  return (
    <>
      <StackNavigator/>
    </>
  );
}
