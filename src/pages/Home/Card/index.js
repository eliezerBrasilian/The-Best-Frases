import react, { useState } from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Feather  from 'react-native-vector-icons/Feather';
export default function Card(props){
  const imagem = require('../../../assets/img/wallpaper.png')
  const [heartIconName,setHeartIconName] = useState('heart-outline')
 
  function toogleHeartIcon(){
    if(heartIconName === 'heart-outline') setHeartIconName('heart-multiple')
    else setHeartIconName('heart-outline')
  }
  return(
    <View style={styles.container}>
      <ImageBackground source={imagem} style={{height:340}}>
        <View style={styles.overBackground}>
          <View style={styles.phraseContainer}>
            <View style={styles.onTop}>
              <Image source={imagem} style={styles.authorPhoto}/>
              <View style={styles.infoRightSide}>
                <Text style={styles.authorName}>Martin Luther King</Text>
                <Text style={styles.authorUsername}>@martinLutherking</Text>
              </View>
            </View>
            <Text style={styles.phrase}>Sometimes you miss the memories, not the person</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <View style={styles.onLeftSide}>
          <Image source={imagem} style={styles.authorPhoto}/>
          <Text>TheBestFrases</Text>
        </View>
        <View style={styles.onRightSide}>
          <TouchableOpacity>
            { <Feather name="share-2" size={25} color='black' style={{marginRight:15}}/> }
          </TouchableOpacity>
          <TouchableOpacity onPress={toogleHeartIcon}>
            <MaterialCommunityIcons name={heartIconName} size={25} color='black'/>
          </TouchableOpacity>
          
        </View>
      </View>
      </View>
      
    
  )
}

 const styles = StyleSheet.create({
  container:{
    marginBottom:10
  },
  overBackground:{//esse container está pegando o mesm tamanho da imagem
    position:'absolute',
    top:0,bottom:0,left:0,right:0,
    justifyContent:'center', alignItems:'center',
  
  },
  phraseContainer:{
    backgroundColor:'#fff',width:'90%',
    flexDirection:'column',padding:10,
    borderRadius:8
  },
  onTop:{
    flexDirection:'row',alignItems:'center'
  },
  authorPhoto:{
    height:50,width:50,borderRadius:50/2,
    marginRight:9
  },
  infoRightSide:{
    justifyContent:'center'
  },
  authorName:{
    fontWeight:'bold',fontSize:18
  },
  authorUsername:{
    fontSize:11, fontWeight:'600'
  },
  phrase:{
    fontSize:18,fontWeight:'600'
  },
  footer:{
    // position:'absolute',top:0,bottom:0,right:0,left:0,marginBottom:10,
    padding:15,
    flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',
  },
  onLeftSide:{
    flexDirection:'row',alignItems:'center'
  },
  onRightSide:{
    flexDirection:'row',alignItems:'center'
  }
 })