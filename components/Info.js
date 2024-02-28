import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Info = ({ date, distance, duration, weatherIcon, timeIcon, start, end }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('ActivityDetail', { date, distance, duration, weatherIcon, timeIcon, start, end });
  };

  return (
    <View style={{backgroundColor:"white", borderRadius: 15}}>
      <View>
        <View style={{flexDirection: "row", padding: 10, justifyContent:"space-between"}}>
          <View style={{gap: 10}}>
            <Text style={{fontWeight: 700}}>{date}</Text>
            <View style={{flexDirection: "row", gap:10,  justifyContent:"space-between"}}>
              <Text>{distance}</Text>
              <Text>{duration}</Text>
            </View>
            <View style={{flexDirection: "row", gap:10}}>
              <Feather name={weatherIcon} size={24} color="black" />
              <Feather name={timeIcon} size={24} color="black" />
            </View>
          </View>
          <View style={{justifyContent: "space-between", gap: 5}}>
            <TouchableOpacity onPress={handleNavigate}>
              <Feather name="chevron-right" size={24} color="#6038E0" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Info;
