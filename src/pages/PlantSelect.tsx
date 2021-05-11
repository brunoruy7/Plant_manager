import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Header } from '../componentes/Header';
import { Button } from '../componentes/buttom';
import { PlantCardPrimary } from '../componentes/PlantCardPrimary';
import { EnviromentButton } from '../componentes/EnviromentButton';
import { Load } from '../componentes/load';

import api from '../services/api';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/Storage';



interface EnviromentProps {
    key: string;
    title: string;
}



export function PlantSelect(){
    
    const [enviroment, setenviroment] = useState<EnviromentProps[]>([]);
    const [plants, setplants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>(plants);
    const [enviromentSelected, setEnviromentSelected] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);
    const navigation = useNavigation();

    async function fetchPlant() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            setLoading(true);
        if (page > 1) {
            setplants(oldValue => [...oldValue , ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        }else{
            setplants(data);
            setFilteredPlants(data);
        }
        
        setLoading(false);
        setLoadingMore(false); 
        
    }


    function handleEnviromentSelected (room: string){
        setEnviromentSelected(room);

        if (room == 'All')
            return setFilteredPlants(plants);
        const filtered = plants.filter(plant => plant.environments.includes(room));
        setFilteredPlants(filtered);
    }

    function handleFetchMore(distancia: number){
        if(distancia < 1) 
            return;
        
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlant(); 
    }

    function hadlePlantSelect (plant: PlantProps) {
        navigation.navigate('PlantSave', { plant });
    }
        
    useEffect( () => {
        async function fetchEnviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setenviroment([{ key: 'All', title: 'Todos' }, ...data]);
        }
        fetchEnviroment();

    }, [])

    useEffect( () => {
        fetchPlant();

    }, [])

    if (loading)
        return <Load/>

    return (
        <View style = {styles.container}> 
           <View style = {styles.heading}>
            <Header />
            <Text style = {styles.title}> Em qual ambiente </Text>
            <Text style= {styles.subtitle}>você quer colocar a sua planta?</Text>
           </View>

           <View>
               <FlatList 
               data = {enviroment} 
               keyExtractor = {(item) => String(item.key)}
               renderItem={({ item })=> (
               <EnviromentButton 
                    title = {item.title}     
                    active = { item.key === enviromentSelected } 
                    onPress = {() => handleEnviromentSelected(item.key)}
                />)}
               horizontal
               showsHorizontalScrollIndicator = { false }
               contentContainerStyle = {styles.enviromentlist}
               ListHeaderComponent={<View />}
               ListHeaderComponentStyle={{ marginRight: 32 }}
               />
           </View>
           <View style= {styles.plants}>
                <FlatList data = {filteredPlants }
                keyExtractor = {(item) => String(item.id)}
                renderItem = {( {item} ) => (<PlantCardPrimary data = {item} 
                    onPress = {() => hadlePlantSelect(item)} />)}
                showsVerticalScrollIndicator = {false}
                numColumns = {2}
                contentContainerStyle = {styles.contentContainerStyle}
                onEndReachedThreshold = {0.1}
                onEndReached = {({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                ListFooterComponent = { loadingMore ?
                    <ActivityIndicator color = {colors.green}/> : <></>}
                />
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.headind,
        lineHeight: 20,
        marginTop: 20,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    heading: {
        paddingHorizontal: 30,
    },
    enviromentlist: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
    contentContainerStyle: {
        
    },
});