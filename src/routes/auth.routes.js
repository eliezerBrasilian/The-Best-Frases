import react from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
export default function AuthRoutes(){
  const stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='login' component={Login} options={{
          headerShown:false
        }} />
        <stack.Screen name='forgotPassword' component={ForgotPassword} options={{
          headerTitle:'Tela de redefinir a senha'
        }} />
      </stack.Navigator>
    </NavigationContainer>
  )
}