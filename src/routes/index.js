import { useContext } from 'react';
import AuthRoutes from '../routes/auth.routes'
import AppRoutes from '../routes/app.routes'
import { AuthContext } from '../contexts';
import { ActivityIndicator, Text, View } from 'react-native';

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