import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import Home from '../pages/Home';
export default function AppRoutes(){
  return (
  <NavigationContainer>
     <Home/>
  </NavigationContainer>
 )
}