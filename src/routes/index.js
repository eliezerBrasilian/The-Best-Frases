import { useContext } from 'react';
import { AuthContext } from '../contexts';
import { ActivityIndicator, Text, View } from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
export default function Routes(){
  const {signed,loadingInfo} = useContext(AuthContext)
  
  if(loadingInfo)return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={50} color={'blue'} />
        <Text>Carregando...</Text>
    </View>
    
  )
  return (
    signed? <AppRoutes/> : <AuthRoutes/>
  )
}