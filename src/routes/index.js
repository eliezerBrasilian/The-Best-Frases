import { useContext } from 'react';
<<<<<<< HEAD
import AuthRoutes from '../routes/auth.routes'
import AppRoutes from '../routes/app.routes'
=======
<<<<<<< HEAD
import AuthRoutes from '../routes/auth.routes'
import AppRoutes from '../routes/app.routes'
=======
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c
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