import react from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Login from './src/Login';
export default function App(){

  return (
    
    <ImageBackground source={require('./src/assets/img/wallpaper.png')}
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

const styles = StyleSheet.create({
  background:{
    height:'100%'
  },
  container:{
    flex:1,padding:15
  },
  title:{
    fontSize:27, fontWeight:'bold',marginTop:50,
    color:'#fff'
  },
  subTitle:{
    marginBottom:50, fontSize:19,color:'#f4effa'
  },
  inputText:{
    borderColor:'#fff',borderWidth:1,borderRadius:10,paddingLeft:15,
    color:'#fff'
  },
  inputTextGap:{
    marginTop:20
  },
  forgotPassword:{
    textAlign:'right',marginTop:10,color:'#f8d9c6'
  },
  btn:{
    padding:15,backgroundColor:'#fff',borderRadius:10,
    justifyContent:'center',alignItems:'center',
    marginTop:50
  },
  btnText:{
    color:'#020314',fontWeight:'600',fontSize:17
  },
  dontHaveAccount:{
    textAlign:'center',marginTop:10,color:'#f8d9c6'
  }
})