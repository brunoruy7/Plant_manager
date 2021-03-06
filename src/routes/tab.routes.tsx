import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { PlantSelect } from '../pages/PlantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/MyPlants';

const {Navigator, Screen} = createBottomTabNavigator();

const AuthRouts = () => {
    return( <Navigator tabBarOptions = {{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: { 
            paddingBottom: '3%',
            
            height: '10%',
        },
    }}>
    <Screen 
    name = "Nova Planta"
    component = {PlantSelect}
    options = {{tabBarIcon: (({size, color}) => (
        <MaterialIcons 
            name = "add-circle-outline"
            size = {size}
            color = {color}/>))}} 
        />

    <Screen 
        name = "Minhas Plants"
        component = {MyPlants}
        options = {{tabBarIcon: (({size, color}) => (
            <MaterialIcons 
                name = "format-list-bulleted"
                size = {size}
                color = {color}/>))}} 
        />

    </Navigator>)
    }

    export default AuthRouts;