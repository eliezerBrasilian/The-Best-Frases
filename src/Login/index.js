import react from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { styles } from './styles';
export default function Login(){

  return (
    <ImageBackground source={require('../assets/img/wallpaper.png')}
        resizeMode='cover'
        style={styles.background} >
          <StatusBar barStyle={'light-content'} backgroundColor={'#2b2d42'}/>
          <View style={styles.container}>
            <View style={styles.topView}>
              <Text style={styles.title}>TheBestFrases</Text>
              <Text style={styles.subTitle}>Entre com seus dados para continuar</Text>
            </View>

            <View>
              <TextInput style={styles.inputText} placeholder='Digite seu login' placeholderTextColor={'#f4effa'}/>
              <TextInput style={[styles.inputText,styles.inputTextGap]} placeholder='Digite sua senha' placeholderTextColor={'#f4effa'}/>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Acessar</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.dontHaveAccount}>Não tem uma conta?<Text style={{color:'#ffd500'}}> Cadastre-se aqui!</Text>
                </Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </ImageBackground>
  )
}

