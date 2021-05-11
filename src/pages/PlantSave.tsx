import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core'

import waterdrop from '../assets/waterdrop.png';
import { Button } from '../componentes/buttom';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantProps, savePlant } from '../libs/storage';


interface Params {
    plant: PlantProps       
}

export function PlantSave(){
    const rout = useRoute();
    const { plant } = rout.params as Params;
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showdatepicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const navigation = useNavigation();

    function handleChangeTime( event: Event, dateTime: Date | undefined){
        if (Platform.OS ===  'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore( dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert("Escolha uma hora futura! ⏰");
        }

        if (dateTime){
            setSelectedDateTime(dateTime);
        }
    }
    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave(){

        try{
            await savePlant( {...plant, dateTimeNotification: selectedDateTime});

            navigation.navigate('Confirmation', {
                title: 'Tudo Certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttontitle: 'Muito Obrigado!',
                icon: 'hug',
                nextscreen: 'MyPlants'
            });

        }catch{ Alert.alert("Não foi possível salvar sua planta"); }
    }

    return (
        <ScrollView showsVerticalScrollIndicator = {false}
        contentContainerStyle = {styles.container}>
            <View style = {styles.container}>
                <View style = {styles.plantinfo}>
                    <SvgFromUri uri = {plant.photo} height = {150} width = {150}/>
                    <Text style = {styles.plantname}> {plant.name}</Text>
                    <Text style = {styles.plantabout}> {plant.about}</Text>
                </View>
                <View style = {styles.controller}>
                    <View style= {styles.tipcontainer}>
                        <Image source = {waterdrop} style = {styles.tipimage}/>
                        <Text style = {styles.tiptext}>{plant.water_tips}</Text>
                    </View>

                    <Text style = {styles.alerlabel}> Escolha o melhor horário para ser lembrado:</Text>

                        {showdatepicker && (
                            <DateTimePicker value = {selectedDateTime} 
                            mode = 'time'
                            display = 'spinner'
                            onChange = {handleChangeTime} />)}
                        {Platform.OS === 'android' && (
                            <TouchableOpacity style = {styles.datetimepickerbuttom} 
                                onPress = {handleOpenDateTimePickerForAndroid}>
                                    <Text style = {styles.datetimepickertext}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}</Text></TouchableOpacity>
                        )}

                    <Button title = 'cadastrar plata' onPress = {handleSave}/> 
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantinfo:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical:'15%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    plantname: {
        fontFamily: fonts.headind,
        fontSize: 24,
        color: colors.heading,
        marginTop: '2%',

    },
    plantabout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: '1.5%',
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace()||'1%' ,
    },
    tipcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: '15%',

    },
    tipimage: {
        width: 56,
        height: 56,
    },
    tiptext: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        fontSize: 17,
        textAlign: 'justify',
        
    },
    alerlabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: '1%',
    },
    datetimepickertext: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    },
    datetimepickerbuttom: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: '3%',
        //backgroundColor: colors.blue,
    },
});
