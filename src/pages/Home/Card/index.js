import react, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Feather  from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../contexts';
import Share from "react-native-share";
import ViewShot, { captureRef } from "react-native-view-shot";
import {styles} from './styles'
export default function Card({data}){
  const viewRef = useRef()
  const {user} = useContext(AuthContext)
  const imagem = require('../../../assets/img/wallpaper.png')
  const [frasesLikes,setFrasesLikes] = useState(data?.curtidas)
  const [liked,setLiked] = useState(false)  // clicou em curtir

  let likesCount = data?.curtidas;
 
  useEffect(()=>{
    async function checkingIfWasLiked(){
      const user_and_post = `${user.userId}_${data.key}`

      const docLikes = await firestore().collection('Likes')
      .doc(user_and_post)
     .get()

     if(docLikes.exists){
      setLiked(true);
      let z = await firestore().collection('Likes').doc(user_and_post).get()
      console.log(z.data().liked)
     }
    }
    checkingIfWasLiked()
  },[])


  async function shareImage() {
    try{
      const uri = await captureRef(viewRef,{
        format:'png', quality:1.0,
      })
      await Share.open({url: uri}).then((success)=>{
        console.log(success)
      }).catch((error)=>{
        console.log(error)
      })
    }catch(error){
      console.log(error)
    }
  }
  async function likeSystem(key,curtidas){
    console.log('key atual' + key)
    const user_and_post = `${user.userId}_${key}`

    const docLikes = await firestore().collection('Likes')
    .doc(user_and_post)
    .get()

     //o usuario ja deu o like
     //meu id ja esta salvo la
      if(docLikes.exists){
        await firestore().collection('Frases')
        .doc(key).update({
          curtidas: curtidas - 1
        })
        .then(()=>{
          likesCount --;
          
          console.log('descurtiu')
          setFrasesLikes(likesCount)
          setLiked(false);
        })
        .catch((error)=>{
          console.log(error)
        })

      await firestore().collection('Likes').doc(user_and_post)
      .delete()
      .then(()=>{
        console.log('curtida deletada')
      })
      return;
    }
//  dando like
     await firestore().collection('Likes')
     .doc(user_and_post)
     .set({
       postId: key,
       userId: user.userId,
       liked: true
     })

     await firestore().collection('Frases')
     .doc(key).update({
       curtidas: curtidas + 1,
     }).then(()=>{
      console.log('curtida feita')
        likesCount ++;
        setFrasesLikes(likesCount)
        setLiked(true);
     })
  }

  return(
    <ViewShot ref={viewRef}>
      <View style={styles.container}>
        <ImageBackground source={imagem} style={{height:340}}>
          <View style={styles.overBackground}>
            <View style={styles.phraseContainer}>
              <View style={styles.onTop}>
                {
                  (data.foto != ''? <Image source={{uri: data.foto}} style={styles.authorPhoto}/>:
                  <Image source={imagem} style={styles.authorPhoto}/>
                  )
                }
                <View style={styles.infoRightSide}>
                  <Text style={styles.authorName}>{data.autor}</Text>
                  <Text style={styles.authorUsername}>@thebestfrases</Text>
                </View>
              </View>
              <Text style={styles.phrase}>{data.frase}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.footer}>
          <View style={styles.onLeftSide}>
            <Image source={imagem} style={styles.authorPhoto}/>
            <Text>TheBestFrases</Text>
          </View>
          <View style={styles.onRightSide}>
            <View style={styles.icon_and_amount}>
              <TouchableOpacity onPress={shareImage}>
                <Feather name="share-2" size={23} color='black'/> 
              </TouchableOpacity>
              {
                (data.compartilhamentos === 0? '' : 
                
                <Text style={styles.shareAmount}>{data.compartilhamentos}</Text>
                )
              }
              </View>
            <View style={styles.icon_and_amount}>
              <TouchableOpacity onPress={()=>likeSystem(data.key,data.curtidas)}>
                {
                  (liked===true ? <MaterialCommunityIcons name='heart-multiple' size={25} color='black'/>
                    :
                    <MaterialCommunityIcons name='heart-outline' size={25} color='black'/>
                  )
                }
                
              </TouchableOpacity>
              {
                (data.curtidas === 0?'' : <Text>{frasesLikes}</Text>
                )
              }
            </View>
            
          </View>
        </View>
        </View>
    </ViewShot>
  )
}

