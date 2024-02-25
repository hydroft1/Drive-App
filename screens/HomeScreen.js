import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from "react";
import { firebase } from '../config';

const HomeScreen = () => {
  const [name, setName] = useState('')

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data())
      }
      else {
        console.log('User does not exist')
      }
    })
  }, [])
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})