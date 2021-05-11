import React, { useEffect } from 'react';
import  Routes  from './src/routes/index';

import * as Notification from 'expo-notifications';

import {  useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';

import AppLoading from 'expo-app-loading';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [ fontsLoaded ] = useFonts({ Jost_400Regular, Jost_600SemiBold  });

  useEffect(()=> {
    const subscription = Notification.addNotificationReceivedListener(
      async notification => {
        await Notification.cancelAllScheduledNotificationsAsync();
        const data = notification.request.content.data.plant as PlantProps;
        console.log("=-=-=-=-=-=- Notification-=-=-=-=-=-=-=");
        console.log(data);
        //return () => subscription.remove();
        
      //async function notification() {
        
      
        //const data = await Notification.getAllScheduledNotificationsAsync();
        //console.log("=-=-=-=-=-=- Notifications-=-=-=-=-=-=-=");
        //console.log(data);
      //}
      })
    //notification();
  }, [])

  if(!fontsLoaded)
    return  <AppLoading />

  return (
    <Routes />
  )
}
