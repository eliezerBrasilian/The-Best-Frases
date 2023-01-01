import { useContext } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { AuthContext } from '../contexts';
import { ActivityIndicator, Text, View } from 'react-native';
import AuthRoutes from './auth.routes';
export default function Routes(){
  const {signed,loadingInfo} = useContext(AuthContext)
  
  if(loadingInfo)return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={50} color={'blue'} />
        <Text>Carregando...</Text>
    </View>
    
  )
  return (
    signed? <Home/> : <AuthRoutes/>
  )
}