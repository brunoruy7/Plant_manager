import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import { Button } from '../componentes/buttom';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface Params {
    title: string;
    subtitle: string;
    buttontitle: string;
    icon: 'hug'|'smile';
    nextscreen: string;
}

const emojis = { hug : '🤗', smile: '😎'}

export function Confirmation(){
    const navigation = useNavigation();
    const routs = useRoute();

    const {title, subtitle, buttontitle, icon, nextscreen} = routs.params as Params;

    function handlenavigationstart(){
        navigation.navigate(nextscreen);
    }
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.content}>
                <Text style = {styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style = {styles.subtitle}>
                    {subtitle}
                </Text>
                <View style = {styles.footer}>
                    <Button title={buttontitle} onPress = { handlenavigationstart }/>
                </View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
    },
    emoji: {
        fontSize: 78,
    },
    title:{
        fontSize: 22,
        fontFamily: fonts.headind,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,
    },
    subtitle:{
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading,
    },
    footer:{
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20,
    }
});
