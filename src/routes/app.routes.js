<<<<<<< HEAD
import react from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
=======
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb

import Home from '../pages/Home';
import Categories from '../pages/Categories'
export default function AppRoutes(){
<<<<<<< HEAD
   const tab = createBottomTabNavigator();
   
  return (
  <NavigationContainer>
      <tab.Navigator>
         <tab.Screen name='Home' component={Home} options={{headerShown:false,
         tabBarLabel:'Mais curtidas', tabBarIcon:({color,size})=>{
            return <MaterialCommunityIcons name='home-outline' size={size} color={color} />
         }
         }} />
         <tab.Screen name='Categories' component={Categories} options={{headerShown:false,
         tabBarLabel:'Categorias', tabBarIcon:({color,size})=>{
            return <MaterialCommunityIcons name='format-quote-close' size={size} color={color} />
         }
         
      }} />
      </tab.Navigator>
=======
  return (
  <NavigationContainer>
     <Home/>
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb
  </NavigationContainer>
 )
}