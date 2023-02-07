import react from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
export default function AuthRoutes(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{headerTitle:'Esqueceu a senha'}}/>
    </Stack.Navigator>
    </NavigationContainer>
    
    
  )
  
  // <View>
  //   <Login/>
  // </View>
}