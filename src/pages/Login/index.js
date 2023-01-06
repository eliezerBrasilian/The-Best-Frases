import React, { useContext, useState } from 'react';
import { ActivityIndicator, ImageBackground, StatusBar, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Modal, Image } from 'react-native'

import { AuthContext } from '../../contexts';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
export default function Login(){
  
  const {signUp, signIn,loadingAuth,errorDescription,
  openModalErrorLogin,setOpenModalErrorLogin} = useContext(AuthContext)
  const [login,setLogin] = useState(false)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
  const navigation = useNavigation()
  function clearBuffer(){
    setEmail('')
    setPassword('')
    setName('')
  }
  function toogleLogin(){
    setLogin(!login)
    clearBuffer()
  }

  const goToForgotPassword = async ()=>{
    navigation.navigate('forgotPassword')
  }
  function handleSignUp(){
    if(name.length >0 && (email !== '' || password !== ''))
    signUp(email,password,name)
    //clearBuffer()
  }
  function handleSignIn(){
   if(email !== '' && email.includes('@') ){
    signIn(email,password)
   }
  }


  const closeModal = ()=>{
    setOpenModalErrorLogin(false)
  }

  if(login)
  return (
    <KeyboardAvoidingView behavior='height' style={{flex:1}}>
      <ImageBackground source={require('../../assets/img/wallpaper.png')}
          resizeMode='cover'
          style={styles.background} >
            <StatusBar barStyle={'light-content'} backgroundColor={'#2b2d42'}/>
            <View style={styles.container}>
              <View style={styles.topView}>
                <Text style={styles.title}>TheBestFrases</Text>
                <Text style={styles.subTitle}>Entre com seus dados para continuar</Text>
              </View>

              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <TextInput style={styles.inputText} placeholder='Digite seu email' placeholderTextColor={'#f4effa'} value={email} onChangeText={(text)=>setEmail(text)}/>
                  <TextInput style={[styles.inputText,styles.inputTextGap]} placeholder='Digite sua senha' placeholderTextColor={'#f4effa'} value={password} onChangeText={(text)=>setPassword(text)}/>
                  <TouchableOpacity onPress={goToForgotPassword}>
                    <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
                    {(loadingAuth ? <ActivityIndicator color={'red'} size={30}/>
                    :
                    <Text style={styles.btnText}>Acessar</Text>
                    )}
                    
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toogleLogin}>
                    <Text style={styles.dontHaveAccount}>Não tem uma conta?<Text style={{color:'#ffd500'}}> Cadastre-se aqui!</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
            </View>
            
              <Modal
              visible={openModalErrorLogin}
              onRequestClose={closeModal}
              transparent={true}
              >
                <View style={{alignItems:'center',justifyContent:'center',marginVertical:'50%'}}>
                  <LinearGradient colors={['#0061ff','#60efff']} style={styles.cardModal}>
                  <Text style={styles.errorTitle}>
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
                      onPress={closeModal}
                      >
                      <Image style={{height:55,width:55}} 
                      source={require('../../assets/img/error.png')} />  
                    </TouchableOpacity>  
                    
                    <TouchableOpacity style={styles.btnCloseModal} 
                     onPress={closeModal}
                    >
                     <Text style={styles.buttonTextCloseModal}>Fechar</Text>
                    </TouchableOpacity>  
                </LinearGradient>
                </View>
              </Modal>
            
          </ImageBackground>
        </KeyboardAvoidingView>
  )

  else return (
    <KeyboardAvoidingView behavior='height' style={{flex:1}}>
      <ImageBackground source={require('../../assets/img/wallpaper.png')}
          resizeMode='cover'
          style={styles.background} >
            <StatusBar barStyle={'light-content'} backgroundColor={'#2b2d42'}/>
            <View style={styles.container}>
              <View style={styles.topView}>
                <Text style={styles.title}>TheBestFrases - cadastro</Text>
                <Text style={styles.subTitle}>Preencha seus dados para continuar</Text>
              </View>

              <View>
              <TextInput style={styles.inputText} placeholder='Digite seu nome completo' placeholderTextColor={'#f4effa'} value={name} onChangeText={(text)=>setName(text)}/>
                <TextInput style={[styles.inputText,styles.inputTextGap]} placeholder='Digite seu email' placeholderTextColor={'#f4effa'} value={email} onChangeText={(text)=>setEmail(text)}/>
                <TextInput style={[styles.inputText,styles.inputTextGap]} placeholder='Digite sua senha' placeholderTextColor={'#f4effa'} value={password} onChangeText={(text)=>setPassword(text)}/>
                
                <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
                {(loadingAuth ? <ActivityIndicator color={'red'} size={30}/>
                  :
                  <Text style={styles.btnText}>Cadastrar</Text>
                  )}
                  
                </TouchableOpacity>
                <TouchableOpacity onPress={toogleLogin}>
                  <Text style={styles.dontHaveAccount}>Já tem uma conta? <Text style={{color:'#ffd500'}}>Clique aqui para entrar!</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              visible={openModalErrorLogin}
              onRequestClose={closeModal}
              transparent={true}
              >
                <View style={{alignItems:'center',justifyContent:'center',marginVertical:'50%'}}>
                  <LinearGradient colors={['#0061ff','#60efff']} style={styles.cardModal}>
                  <Text style={styles.errorTitle}>
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
                      onPress={closeModal}
                      >
                      <Image style={{height:55,width:55}} 
                      source={require('../../assets/img/error.png')} />  
                    </TouchableOpacity>  
                    
                    <TouchableOpacity style={styles.btnCloseModal} 
                     onPress={closeModal}
                    >
                     <Text style={styles.buttonTextCloseModal}>Fechar</Text>
                    </TouchableOpacity>  
                </LinearGradient>
                </View>
              </Modal>
          </ImageBackground>
        </KeyboardAvoidingView>
  )
  
}

