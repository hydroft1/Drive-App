import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Button } from "react-native";
import React, { useState} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const UserDetailScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    };
  
  const handleSave = () => {
      // Vous pouvez ajouter ici la logique pour enregistrer la date sélectionnée
      setShowDatePicker(false);
    };
  
  const handleOpenDatePicker = () => {
      setShowDatePicker(true);
    };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "rgba(96, 56, 224, 0.18)" }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            backgroundColor: "transparent",
            gap: 15,
          }}
        >
          <View // MON COMPTE
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Feather name="chevron-left" size={28} color="#6038E0" />
            </TouchableOpacity>
            <Text style={{ fontWeight: 700, flex: 1, textAlign: "center" }}>
              Apprenti Conducteur
            </Text>
          </View>

          <View
            style={{
              gap: 10,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View>
                <Text style={{opacity:0.5}}>Prénom</Text>
                <View style={{flexDirection:"row", alignItems:"center", gap:15}}>
                    <Octicons name="person" size={24} color="black" />
                    <TextInput
                            returnKeyType="send"
                            style={{
                            width: "100%",
                            fontSize: 16,
                            }}
                            placeholder="Alexandre"                    
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                <Feather name="calendar" size={24} color="black" />
                <TouchableOpacity onPress={handleOpenDatePicker}>
                    <Text style={{ fontSize: 16, marginTop: 20, marginLeft: 10, fontWeight: "600" }}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <Modal
                    visible={showDatePicker}
                    transparent
                    animationType="slide"
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" }}>
                        <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        maximumDate={new Date()} // Limite à la date actuelle ou antérieure
                        onChange={handleDateChange}
                        />
                        <Button title="Enregistrer" onPress={handleSave} />
                        <Button title="Annuler" onPress={() => setShowDatePicker(false)} />
                    </View>
                    </View>
                </Modal>
            </View>

          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default UserDetailScreen;
