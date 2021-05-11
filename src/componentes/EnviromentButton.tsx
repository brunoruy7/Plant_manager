import React from 'react';
import { Text, StyleSheet, View,  } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
     title: string
     active?: boolean
}

export function EnviromentButton ( {title, active = false, ...rest }: EnviromentButtonProps){
    return ( 
        <RectButton style = {[ styles.container, active && styles.containeractive ]} {...rest}>
            <Text style = {[ styles.text, active && styles.textactive ]} >
                 {title}
            </Text> 
        </RectButton>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5,
    },
    containeractive: {
        backgroundColor: colors.green_light,
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text,
    },
    textactive: {
        fontFamily: fonts.headind,
        color: colors.green_dark,
    }
});
