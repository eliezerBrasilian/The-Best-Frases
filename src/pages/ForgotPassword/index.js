import { Image, Modal, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import {styles} from './style'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
export default function ForgotPassword(){
  const [email,setEmail] = useState('')
  const [errorDescription,setErrorDescription] = useState('')
  const [modalVisivle,setModalVisible] = useState(false)
  const [showFechar,setShowFechar] = useState(true)

  const navigation = useNavigation()
  
  const handleResetPassword = async ()=>{
    if(email !== '' &&
      (email.includes('@gmail.com')||email.includes('@hotmail.com')||email.includes('@yahoo.com'))
      || email.includes('outlook.com')
      ){ 
        await auth().sendPasswordResetEmail(email).then(()=>{
           console.log('Deu certo! Confira sua caixa de emails, inclusive a caixa de Spam')
           setErrorDescription('Deu certo! Confira sua caixa de emails, inclusive a caixa de Spam.')
           setShowFechar(true)
           setModalVisible(true)
        })
        .catch(()=>{
          console.log('email nao está cadastrado')
          setErrorDescription('Email não está cadastrado!')
          setShowFechar(false)
          setModalVisible(true)
        })
       }
       //user nao digitou nem ao menos '@'
      else {
        console.log('nao é um email válido')
        setErrorDescription('Não é um email válido!')
        icone = '/error.png'
        setShowFechar(false)
        setModalVisible(true)
      }
  }

  function goToMainScreen(){
    setModalVisible(false)
     if(showFechar){
       navigation.goBack()
     }
     else{
      setEmail('')
     }
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
          <Text style={styles.buttonText}>Redefinir senha</Text>
        </TouchableOpacity>  
        
      </LinearGradient>

      <Modal
      visible={modalVisivle}
      animationType={'fade'}
      transparent={true}
      >
        <View style={{alignItems:'center',}}>
        <LinearGradient colors={['#0061ff','#60efff']} style={styles.cardModal}>
        <Text style={styles.title}>
          {errorDescription}
        </Text>

            <TouchableOpacity 
            style={{
            marginTop:15,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#fff',
            width:90,
            height:90,
            borderRadius:7
            }} 
            onPress={handleResetPassword}
            >
            {(showFechar?
            <Image style={{height:55,width:55}} 
            source={require('../../assets/img/check.png')} /> 
              :
              <Image style={{height:55,width:55}} 
            source={require('../../assets/img/error.png')} /> 
              )}
          </TouchableOpacity>  
          
          <TouchableOpacity style={styles.resetButton} 
          onPress={goToMainScreen}
          >
            {
              (showFechar?
              <Text style={styles.buttonText}>Fechar</Text>
                :
              <Text style={styles.buttonText}>Tentar de novo</Text>
              )
            }
          </TouchableOpacity>  
      </LinearGradient>
      </View>
      </Modal>
     
    </View>
  )
}