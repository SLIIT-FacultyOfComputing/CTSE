import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* import screen for navigation */
import HomeScreen from './screens/UserList'
import UserDetails from './screens/UserDetails'
import CreateNewUser from './screens/CreateNewUser'
import Homepage from './screens/Homepage';
import MyScreen from './screens/MedicineHome';
import AdverticingCardList from './screens/AdvertisingHome';
import CreateAd from './screens/CreateNewAdvertising';
import ChannelCenters from './screens/ChannelCenters';
import CreateAd from './screens/CreateNewAdvertising';

import SplashScreen from './components/SplashScreen';
import React, { useState } from 'react';
import { useEffect } from 'react';


/* create stack for navigation */
const Stack = createNativeStackNavigator()

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
      

      <Stack.Screen 
          name='Splash' 
          component={SplashScreen} 
          options={{headerShown: false}}/>
      <Stack.Screen 
          name='Home' 
          component={Homepage} 
          options={{title: 'Welcome'}}/>
      <Stack.Screen 
          name='ChannelCenters Home' 
          component={ChannelCenters} 
          options={{title: 'Channel Centers Manage'}}/>
          <Stack.Screen 
          name='AdverticingCardList Home' 
          component={AdverticingCardList} 
          options={{title: 'Adverticing Manage'}}/>
                <Stack.Screen 
          name='CreateAd' 
          component={CreateAd} 
          options={{title: 'Create adverticing'}}/>
      <Stack.Screen 
          name='AdverticingCardList Home' 
          component={AdverticingCardList} 
          options={{title: 'Adverticing Manage'}}/>
                <Stack.Screen 
          name='CreateAd' 
          component={CreateAd} 
          options={{title: 'Create adverticing'}}/>
      <Stack.Screen 
          name='Medicne Home' 
          component={MyScreen} 
          options={{title: 'Medicne Management'}}/>

        <Stack.Screen 
          name='Users List' 
          component={HomeScreen} 
          options={{title: 'Users Management'}}/>
        <Stack.Screen 
          name='User Details'
          component={UserDetails}/>
        <Stack.Screen 
          name='Create New User'
          component={CreateNewUser}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}