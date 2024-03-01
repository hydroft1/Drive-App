import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Fontisto, Ionicons } from '@expo/vector-icons';

const RapportScreen = () => {
    const [countMinusCG, setCountMinusCG] = useState(0);
    const [countMinusCD, setCountMinusCD] = useState(0);
    const [countMinusBG, setCountMinusBG] = useState(0);
    const [countMinusBD, setCountMinusBD] = useState(0);
    const [countMinusRG, setCountMinusRG] = useState(0);
    const [countMinusRD, setCountMinusRD] = useState(0);

    const incrementCountMinusCG = () => {
        setCountMinusCG(prevCount => prevCount + 1);
    };

    const decrementCountMinusCG = () => {
        if (countMinusCG > 0) {
            setCountMinusCG(prevCount => prevCount - 1);
        }
    };


    const incrementCountMinusCD = () => {
        setCountMinusCD(prevCount => prevCount + 1);
    };

    const decrementCountMinusCD = () => {
        if (countMinusCD > 0) {
            setCountMinusCD(prevCount => prevCount - 1);
        }
    };

    const incrementCountMinusBG = () => {
        setCountMinusBG(prevCount => prevCount + 1);
    };

    const decrementCountMinusBG = () => {
        if (countMinusBG > 0) {
            setCountMinusBG(prevCount => prevCount - 1);
        }
    };


    const incrementCountMinusBD = () => {
        setCountMinusBD(prevCount => prevCount + 1);
    };

    const decrementCountMinusBD = () => {
        if (countMinusBD > 0) {
            setCountMinusBD(prevCount => prevCount - 1);
        }
    };

    const incrementCountMinusRG = () => {
        setCountMinusRG(prevCount => prevCount + 1);
    }

    const decrementCountMinusRG = () => {
        if (countMinusRG > 0) {
            setCountMinusRG(prevCount => prevCount - 1);
        }
    }

    const incrementCountMinusRD = () => {
        setCountMinusRD(prevCount => prevCount + 1);
    }

    const decrementCountMinusRD = () => {
        if (countMinusRD > 0) {
            setCountMinusRD(prevCount => prevCount - 1);
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: "rgba(96, 56, 224, 0.18)" }}>
                <SafeAreaView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 30 }}>
                    <View style={{ flex: 1, alignItems: "center", gap: 20 }}>
                        <Text style={{ fontWeight: 700, fontSize: 20 }}>Rapport d'évaluation</Text>
                        <View style={{width:"100%", justifyContent:"flex-start", gap:10}}>
                        <Text style={{fontSize: 16, fontWeight:700}}>Météo:</Text>
                        <View style={{flexDirection:"row", gap:20}}>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="sun" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="cloud-rain" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="cloud-lightning" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Fontisto name="fog" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Fontisto name="snowflake" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:"100%", justifyContent:"flex-start", gap:10}}>
                        <Text style={{fontSize: 16, fontWeight:700}}>Jour/Nuit:</Text>
                        <View style={{flexDirection:"row", gap:20}}>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="sun" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100}}>
                                <Feather name="moon" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:"100%", justifyContent:"flex-start" ,gap:10}}>
                        <Text style={{fontSize: 16, fontWeight:700}}>Véhicule:</Text>
                        <View style={{flexDirection:"row", gap:20}}>
                            <View style={{alignItems:"center"}}>
                                <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100, overflow: 'hidden', height:50, width:50, alignItems:"center", justifyContent:"center"}}>
                                    <Ionicons name="car-sport-sharp" size={24} color="black" />
                                </TouchableOpacity>
                                <Text>Peugeot 5008</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{width:"100%", justifyContent:"flex-start" ,gap:10}}>
                        <Text style={{fontSize: 16, fontWeight:700}}>Accompagnant:</Text>
                        <View style={{flexDirection:"row", gap:20}}>
                            <View style={{alignItems:"center"}}>
                                <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100, overflow: 'hidden', height:50, width:50, alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{fontWeight:900}}>M</Text>
                                </TouchableOpacity>
                                <Text>Maman</Text>
                            </View>
                            <View style={{alignItems:"center"}}>
                                <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100, overflow: 'hidden', height:50, width:50, alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{fontWeight:900}}>P</Text>
                                </TouchableOpacity>
                                <Text>Papa</Text>
                            </View>
                            <View style={{alignItems:"center"}}>
                                <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100, overflow: 'hidden', height:50, width:50, alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{fontWeight:900}}>S</Text>
                                </TouchableOpacity>
                                <Text>Soeur</Text>
                            </View>
                            <View style={{alignItems:"center"}}>
                                <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100, overflow: 'hidden', height:50, width:50, alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{fontWeight:900}}>F</Text>
                                </TouchableOpacity>
                                <Text>Frère</Text>
                            </View>
                            <View style={{alignItems:"center"}}>
                                <TouchableOpacity style={{padding:10, backgroundColor:"white", borderRadius:100, overflow: 'hidden', height:50, width:50, alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{fontWeight:900}}>Au</Text>
                                </TouchableOpacity>
                                <Text>Autres</Text>
                            </View>
                        </View>
                    </View>
                        <View style={{ width: '100%', justifyContent: 'flex-start', gap: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '700' }}>Stationnement:</Text>

                            <View style={{gap:15}}>
                                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={incrementCountMinusCG}>
                                            <Feather name="plus" size={24} color="green" />
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', gap: 3 }}>
                                            <TouchableOpacity style={{ padding: 10, backgroundColor: 'white', borderRadius: 100, overflow: 'hidden', height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require("../assets/icon/cg.png")} style={{ width: 41, height: 41 }} />
                                                {countMinusCG > 0 && <Text style={{ position: 'absolute', top: 5, left: 5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5, color: 'white' }}>{countMinusCG}</Text>}
                                            </TouchableOpacity>
                                            <Text>Créneau gauche</Text>
                                        </View>
                                        <TouchableOpacity onPress={decrementCountMinusCG}>
                                            <Feather name="minus" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={incrementCountMinusCD}>
                                            <Feather name="plus" size={24} color="green" />
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', gap: 3 }}>
                                            <TouchableOpacity style={{ padding: 10, backgroundColor: 'white', borderRadius: 100, overflow: 'hidden', height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require("../assets/icon/cd.png")} style={{ width: 41, height: 41 }} />
                                                {countMinusCD > 0 && <Text style={{ position: 'absolute', top: 5, left: 5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5, color: 'white' }}>{countMinusCD}</Text>}
                                            </TouchableOpacity>
                                            <Text>Créneau droit</Text>
                                        </View>
                                        <TouchableOpacity onPress={decrementCountMinusCD}>
                                            <Feather name="minus" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={incrementCountMinusBG}>
                                            <Feather name="plus" size={24} color="green" />
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', gap: 3 }}>
                                            <TouchableOpacity style={{ padding: 10, backgroundColor: 'white', borderRadius: 100, overflow: 'hidden', height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require("../assets/icon/bg.png")} style={{ width: 41, height: 41 }} />
                                                {countMinusBG > 0 && <Text style={{ position: 'absolute', top: 5, left: 5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5, color: 'white' }}>{countMinusBG}</Text>}
                                            </TouchableOpacity>
                                            <Text>Bataille gauche</Text>
                                        </View>
                                        <TouchableOpacity onPress={decrementCountMinusBG}>
                                            <Feather name="minus" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={incrementCountMinusBD}>
                                            <Feather name="plus" size={24} color="green" />
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', gap: 3 }}>
                                            <TouchableOpacity style={{ padding: 10, backgroundColor: 'white', borderRadius: 100, overflow: 'hidden', height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require("../assets/icon/bd.png")} style={{ width: 41, height: 41 }} />
                                                {countMinusBD > 0 && <Text style={{ position: 'absolute', top: 5, left: 5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5, color: 'white' }}>{countMinusBD}</Text>}
                                            </TouchableOpacity>
                                            <Text>Bataille droit</Text>
                                        </View>
                                        <TouchableOpacity onPress={decrementCountMinusBD}>
                                            <Feather name="minus" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={incrementCountMinusRG}>
                                            <Feather name="plus" size={24} color="green" />
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', gap: 3 }}>
                                            <TouchableOpacity style={{ padding: 10, backgroundColor: 'white', borderRadius: 100, overflow: 'hidden', height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require("../assets/icon/rg.png")} style={{ width: 41, height: 41 }} />
                                                {countMinusRG > 0 && <Text style={{ position: 'absolute', top: 5, left: 5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5, color: 'white' }}>{countMinusRG}</Text>}
                                            </TouchableOpacity>
                                            <Text>Rangement gauche</Text>
                                        </View>
                                        <TouchableOpacity onPress={decrementCountMinusRG}>
                                            <Feather name="minus" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={incrementCountMinusRD}>
                                            <Feather name="plus" size={24} color="green" />
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', gap: 3 }}>
                                            <TouchableOpacity style={{ padding: 10, backgroundColor: 'white', borderRadius: 100, overflow: 'hidden', height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require("../assets/icon/rd.png")} style={{ width: 41, height: 41 }} />
                                                {countMinusRD > 0 && <Text style={{ position: 'absolute', top: 5, left: 5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5, color: 'white' }}>{countMinusRD}</Text>}
                                            </TouchableOpacity>
                                            <Text>Rangement droit</Text>
                                        </View>
                                        <TouchableOpacity onPress={decrementCountMinusRD}>
                                            <Feather name="minus" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>

                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

export default RapportScreen;
