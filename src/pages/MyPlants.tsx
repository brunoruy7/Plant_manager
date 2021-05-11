import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert, } from 'react-native';
import { Header } from '../componentes/Header';

import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import { loadPlant, PlantProps, removePlant, StoredPlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecundary } from '../componentes/PlantCardSecundary';
import { Load } from '../componentes/load';
import AsyncStorage from '@react-native-async-storage/async-storage';





export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatering, setNextWatering] = useState<string>();

    function handleRemove(plant: PlantProps) {
        Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [{
            text: 'Não 🙏', style : 'cancel'
        }, {
            text: 'sim 👨‍⚖️', onPress: async () => {
                try {
                    await removePlant(plant.id);

                    setMyPlants((oldData) => (
                        oldData.filter((item) => item.id !== plant.id) ))
                    
                    
                    
                    
                } catch(error){
                    Alert.alert("Não foi possível remover sua planta!")
                }
            }
        }])
    }

    useEffect(()=> {
        async function loadStoredData() {
            const plantsStored = await loadPlant();
            const nextTime = formatDistance(new Date(plantsStored[0].dateTimeNotification).getTime(),
            new Date().getTime(), {locale: pt});

            setNextWatering(`Não esqueça de regar a ${plantsStored[0].name} à ${nextTime} horas.`);
            setMyPlants(plantsStored);
            setLoading(false);
        }
        loadStoredData();
    },[])

    if (loading)
        return <Load/>

    return(
            <View style = {styles.container}>
                <Header/>
                <View style = {styles.spotlight}>
                    <Image source = {waterdrop} style = {styles.spotlightimage}/>
                    <Text style = {styles.spotlighttext}> {nextWatering} </Text>

                </View>
                <View style = {styles.plants}>
                    <Text style = {styles.plantstitle}>
                        Próximas regadas
                    </Text>
                    <FlatList data = {myPlants} 
                    keyExtractor = {(item) => String(item.id)} 
                    renderItem = {({item}) => (<PlantCardSecundary 
                        handleRemove= {()=> {handleRemove(item)}} data ={item}/>) }
                    showsVerticalScrollIndicator = {false} 
                    contentContainerStyle = {{}}
                    />
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: '5%',
        backgroundColor: colors.background,
    },
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 10,
        borderRadius: 20,
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightimage: {
        width: 50,
        height: 50,

    },
    spotlighttext: {
        flex: 1,
        color: colors.blue,
        paddingLeft: 20,
        textAlign: 'justify',

    },
    plants: {
        flex: 1,
        width: '100%',

    },
    plantstitle:{
        fontSize: 24,
        fontFamily: fonts.headind,
        color: colors.heading,
        marginVertical: '5%',
    },
});