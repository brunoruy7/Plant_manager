import React, { useEffect, useState } from 'react';
import  { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import userImg from '../assets/Bruno2.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Header () {

    const [userName, setUserName] = useState<string>()

    useEffect(()=> {
        async function getStoredUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user||'---');
        }
        getStoredUserName();
    }, [])

    return (
    <View style = {styles.container}>
        <View>
            <Text style = {styles.greetings}>Olá,</Text>
            <Text style = {styles.name}>{userName}</Text>
        </View>
        <Image source = { userImg } style = {styles.image}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greetings: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    name: {
        fontFamily: fonts.headind,
        fontSize: 32,
        color: colors.heading,
        lineHeight: 40,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
    },
});