import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Header = (props) => {
  return (
    <View style={{ marginLeft: 15, alignItems: "center" }}>
      <Image source={require("../assets/banner.png")} />
      <Text style={{ fontWeight: "bold", fontSize: 28}}>{props.name}</Text>
    </View>
  );
};

export default Header;


