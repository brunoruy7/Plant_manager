import React from 'react';
import { TouchableOpacity,Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: String;
}

export function Button({ title, ... rest } : ButtonProps ){
    return (
        <TouchableOpacity 
            style={styles.button} 
            activeOpacity = {0.5}
            {...rest} >
                <Text style={styles.buttomtext}>
                    {title}
                </Text>
            </TouchableOpacity>
    )
}
const styles = StyleSheet.create ({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.green,
        borderRadius: 16,
        marginBottom: 20,
        paddingHorizontal:15,
        paddingVertical:10,
        height: 56,
    },
    buttomtext: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.headind,
    }

});