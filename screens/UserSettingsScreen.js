import { StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from "@react-navigation/native";

const UserSettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView edges={["top"]}>
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <Feather name="chevron-left" size={24} color="#6038E0" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default UserSettingsScreen
