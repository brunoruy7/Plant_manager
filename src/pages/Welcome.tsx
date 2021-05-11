import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, Dimensions, View } from 'react-native';

import wateringImage from '../assets/watering.png';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons'; 
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';



export function Welcome(){

    const navigation = useNavigation();
    
    function handleStart() {
        navigation.navigate('UserIdentification');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.auxiliar}>
                <Text style={styles.title}>
                    Gerencie {'\n'} suas plantas de {'\n'} forma fácil
                </Text>
                <Image source = {wateringImage} style={styles.image} resizeMode='contain'/>
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas,
                    nós cuidamos de lembrar você
                    sempre que precisar.
                </Text>
                <TouchableOpacity 
                style={styles.button} 
                activeOpacity = {0.5}
                onPress= {handleStart}>
                    <Feather name='chevron-right'
                    style={styles.buttonIcon}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    auxiliar: {
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical:20,
    },
    title: {
        fontSize:28,
        textAlign: 'center',
        color : colors.heading,
        marginTop: 38,
        fontFamily: fonts.headind,
        lineHeight: 34,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    image: {
        height: Dimensions.get('window').width*0.7,
        margin: 30,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.green,
        borderRadius: 16,
        marginBottom: 20,
        height: 56,
        width: 56,
        marginTop: 30,
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 32,
    }

});