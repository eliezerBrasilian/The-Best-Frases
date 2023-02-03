import { Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts";
import { useNavigation } from "@react-navigation/native";
import InfoModal from "./InfoModal";

export default function ForgotPassword(){

    const nav = useNavigation()

    const {forgotPassword, loadingAuth} = useContext(AuthContext)

    const [email,setEmail] = useState('')
   
    function handleResetPassword(){
        forgotPassword(email.trim())
    }
    
    return(
        <View style={styles.container}>
        <LinearGradient colors={['#0061ff','#60efff']} style={styles.card}>
    
          <Text style={styles.title}>
            Insira o seu email abaixo.
          </Text>
        
          <TextInput textContentType='emailAddress'
          style={styles.inputEmail} 
          placeholder='digite aqui...' 
          placeholderTextColor={'#fff'}
          multiline={true} numberOfLines={2} maxLength={90} 
          value={email}
          onChangeText={(text)=>setEmail(text)}
          cursorColor={'#fff'}
          autoFocus
          />
          
           
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
            {
                 loadingAuth? <ActivityIndicator size={30} color='black'/>
                 :
                 <Text style={styles.buttonText}>Redefinir senha</Text>
            }
            
          </TouchableOpacity>  
          
        </LinearGradient>
        <InfoModal data = {email} />
      </View>
    )
}