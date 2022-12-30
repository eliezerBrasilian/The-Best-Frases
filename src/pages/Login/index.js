import React, { useContext, useState } from 'react';
import { ActivityIndicator, ImageBackground, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { AuthContext } from '../../contexts';
import { styles } from './styles';
export default function Login(){
  const {signUp, signIn,loadingAuth} = useContext(AuthContext)
  const [login,setLogin] = useState(true)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')

  function clearBuffer(){
    setEmail('')
    setPassword('')
    setName('')
  }
  function toogleLogin(){
    setLogin(!login)
    clearBuffer()
  }

  function handleSignUp(){
    if(email !== '' || password !== '' || name !== '')
    signUp(email,password,name)
    //clearBuffer()
  }
  function handleSignIn(){
    console.log('cliquei em login')
    if(email !== '' || password !== '')
    signIn(email,password)
  }

  if(login)
  return (
    <ImageBackground source={require('../../assets/img/wallpaper.png')}
        resizeMode='cover'
        style={styles.background} >
          <StatusBar barStyle={'light-content'} backgroundColor={'#2b2d42'}/>
          <View style={styles.container}>
            <View style={styles.topView}>
              <Text style={styles.title}>TheBestFrases</Text>
              <Text style={styles.subTitle}>Entre com seus dados para continuar</Text>
            </View>

            <View>
              <TextInput style={styles.inputText} placeholder='Digite seu email' placeholderTextColor={'#f4effa'} value={email} onChangeText={(text)=>setEmail(text)}/>
              <TextInput style={[styles.inputText,styles.inputTextGap]} placeholder='Digite sua senha' placeholderTextColor={'#f4effa'} value={password} onChangeText={(text)=>setPassword(text)}/>
              <TouchableOpacity>
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
            
          </View>
        </ImageBackground>
  )

  else return (
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
        </ImageBackground>
  )
  
}

