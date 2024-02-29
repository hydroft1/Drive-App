import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Button } from "react-native";
import React, { useState} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';


const UserDetailScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Etat pour gérer le véhicule sélectionné
  const [showVehicleModal, setShowVehicleModal] = useState(false); // Etat pour gérer la visibilité de la modal des véhicules
  const [selectedCompanion, setSelectedCompanion] = useState(null); // Etat pour gérer l'accompagnant sélectionné
  const [showCompanionModal, setShowCompanionModal] = useState(false); // Etat pour gérer la visibilité de la modal des accompagnants
  
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

  // Fonction pour ouvrir la modal des véhicules
  const handleOpenVehicleModal = () => {
      setShowVehicleModal(true);
  };

  // Fonction pour fermer la modal des véhicules
  const handleCloseVehicleModal = () => {
      setShowVehicleModal(false);
  };

  // Fonction pour sélectionner un véhicule
  const handleSelectVehicle = (vehicle) => {
      // Logique pour sélectionner le véhicule
      setSelectedVehicle(vehicle);
      handleCloseVehicleModal(); // Fermer la modal après la sélection
  };

  // Données fictives des véhicules
  const vehiclesData = [
      { id: 1, name: "Peugeot 5008" },
      { id: 2, name: "Lamborghini Aventador" },
      { id: 3, name: "Toyota Prius" },
      // Ajoutez d'autres véhicules selon vos besoins
  ];

  // Fonction pour ouvrir la modal des accompagnants
  const handleOpenCompanionModal = () => {
      setShowCompanionModal(true);
  };

  // Fonction pour fermer la modal des accompagnants
  const handleCloseCompanionModal = () => {
      setShowCompanionModal(false);
  };

  // Fonction pour sélectionner un accompagnant
  const handleSelectCompanion = (companion) => {
      // Logique pour sélectionner l'accompagnant
      setSelectedCompanion(companion);
      handleCloseCompanionModal(); // Fermer la modal après la sélection
  };

  // Données fictives des accompagnants
  const companionsData = [
      { id: 1, name: "Jean Dupont" },
      { id: 2, name: "Marie Martin" },
      { id: 3, name: "Pierre Durand" },
      // Ajoutez d'autres accompagnants selon vos besoins
  ];

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

            <View>
                <Text style={{opacity: 0.5}}>Date de naissance</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name="calendar" size={24} color="black" />
                    <TouchableOpacity onPress={handleOpenDatePicker} style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600" }}>{date.toLocaleDateString()}</Text>
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

            <View>
                <Text style={{opacity:0.5}}>Véhicule par défaut</Text>
                <View style={{flexDirection:"row", alignItems:"center", gap:15}}>
                    <Ionicons name="car-sport-outline" size={24} color="black" />
                    {/* Afficher le véhicule sélectionné ou "Sélectionner un véhicule" */}
                    <TouchableOpacity onPress={handleOpenVehicleModal}>
                        <Text style={{ fontSize: 16 }}>{selectedVehicle ? selectedVehicle.name : "Sélectionner un véhicule"}</Text>
                    </TouchableOpacity>
                </View>
                {/* Modal pour afficher la liste des véhicules */}
                <Modal
                    visible={showVehicleModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={handleCloseVehicleModal}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center", gap:10 }}>
                            {/* Liste des véhicules */}
                            {vehiclesData.map((vehicle) => (
                                <TouchableOpacity key={vehicle.id} onPress={() => handleSelectVehicle(vehicle)}>
                                    <Text style={{ fontSize: 16 }}>{vehicle.name}</Text>
                                </TouchableOpacity>
                            ))}
                            <Button title="Fermer" onPress={handleCloseVehicleModal} />
                        </View>
                    </View>
                </Modal>
            </View>

            <View>
                <Text style={{opacity:0.5}}>Accompagnant par défaut</Text>
                <View style={{flexDirection:"row", alignItems:"center", gap:15}}>
                    <Octicons name="person" size={24} color="black" />
                    {/* Afficher l'accompagnant sélectionné ou "Sélectionner un accompagnant" */}
                    <TouchableOpacity onPress={handleOpenCompanionModal}>
                        <Text style={{ fontSize: 16 }}>{selectedCompanion ? selectedCompanion.name : "Sélectionner un accompagnant"}</Text>
                    </TouchableOpacity>
                </View>
                {/* Modal pour afficher la liste des accompagnants */}
                <Modal
                    visible={showCompanionModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={handleCloseCompanionModal}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center", gap:10 }}>
                            {/* Liste des accompagnants */}
                            {companionsData.map((companion) => (
                                <TouchableOpacity key={companion.id} onPress={() => handleSelectCompanion(companion)}>
                                    <Text style={{ fontSize: 16 }}>{companion.name}</Text>
                                </TouchableOpacity>
                            ))}
                            <Button title="Fermer" onPress={handleCloseCompanionModal} />
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
