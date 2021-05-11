import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Button } from '../componentes/buttom'
import { useNavigation } from '@react-navigation/core';

export function UserIdentification() {
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [name, setName] = useState<string>()

    const navigation = useNavigation();
    
    async function handleSubmit() {

        if (!name )
            return Alert.alert('Me diz como chamar você 😢');
        
        try{
            await AsyncStorage.setItem('@plantmanager:user', name)
        navigation.navigate('Confirmation', {
            title: 'Prontinho',
            subtitle: 'Vamos começar a cuidar das suas plantinhas com muito cuidado',
            buttontitle: 'Começar',
            icon: 'smile',
            nextscreen: 'PlantSelect'
        });
        }
        catch {Alert.alert('Não foi possível salvar seu nome 😢'); }
        
    }

    function handleInputBlur(){
        setIsFocused(false)
    }

    function handleInputFocous(){
        setIsFocused(true)
        setIsFilled(!!name)
    }

    function handleInputChange(value: string){
        setIsFilled(!!value)
        setName(value)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}
            behavior= {Platform.OS === 'ios'? 'padding' : 'height' }>
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>                
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <Text style={styles.emoji}>
                                {isFilled ? '😃' : '😊'}
                            </Text>
                            <Text style={styles.title}>
                                Como podemos {'\n'} chamar você?
                            </Text>
                            <TextInput 
                            style={[styles.imput, (isFocused || isFilled ) && {borderColor: colors.green}]} 
                            placeholder='Digite um nome.'
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocous}
                            onChangeText={handleInputChange}/>
                            <View style={styles.footer}>
                                <Button title='confirmar' onPress={handleSubmit}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
             </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 54,
    },
    emoji :{
        fontSize: 44,
    },
    imput:{
        borderBottomWidth: 1,
        color: colors.heading,
        borderColor: colors.gray,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',

    },
    title: {
        color: colors.heading,
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        fontFamily: fonts.headind,
        marginTop: 20,
    },
    footer:{
        marginTop: 40,
        width: '100%',
        paddingHorizontal:20,
    },
    header: {
        alignItems: 'center',
        width: '100%',
        marginBottom: '15%',
    }
});