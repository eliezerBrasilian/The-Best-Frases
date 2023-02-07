import react from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c

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
<<<<<<< HEAD
=======
=======
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
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c
}