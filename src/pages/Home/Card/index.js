import react, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Feather  from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../contexts';
import Share from "react-native-share";
import ViewShot, { captureRef } from "react-native-view-shot";
import {styles} from './styles'
import { colors } from '../../../colors';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

export default function Card({data}){
  const viewRef = useRef()
  const {user} = useContext(AuthContext)
  const imagem = require('../../../assets/img/wallpaper.png')
  const [frasesLikes,setFrasesLikes] = useState(data?.curtidas)
  const [liked,setLiked] = useState(false)  // clicou em curtir
  let likesCount = data?.curtidas;

  const teste = 'ca-app-pub-3940256099942544/1033173712'
  const adUnitId = 'ca-app-pub-4318787550457876/5020362587';
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing','soccer','music','games','game','workout'],
  });
  const [loaded, setLoaded] = useState(false);
  const [shareLoading,setShareLoading] = useState(false)

  useEffect(()=>{
     const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

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
     // Start loading the interstitial straight away
     interstitial.load();
     checkingIfWasLiked()
     // Unsubscribe from events on unmount
     return unsubscribe;
  },[loaded])

  async function shareImage() {
    setShareLoading(true)
    try{
      const uri = await captureRef(viewRef,{
        format:'png', quality:1.0,
      })
      await Share.open({url: uri}).then(()=>{
        setShareLoading(false)
      }).catch((error)=>{
        console.log(error)
        setShareLoading(false)
      })
    }catch(error){
      console.log(error)
      setShareLoading(false)
    }
    interstitial.show();
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
            <Image source={require('../../../assets/img/ic_launcher_round.png')} style={styles.authorPhoto}/>
            <Text
            style={styles.footerUsernameText}>TheBestFrases</Text>
          </View>
          <View style={styles.onRightSide}>
            <View style={styles.icon_and_amount}>
              {
                (shareLoading ? <ActivityIndicator size={30} color={colors.blue_purple}/>
                : <TouchableOpacity style={styles.shareAmount} onPress={shareImage}>
                <Feather name="share-2" size={23} color={colors.black}/> 
                  </TouchableOpacity>
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
                (data.curtidas === 0?'' : <Text style={styles.likesText}>{frasesLikes}</Text>
                )
              }
            </View>
            
          </View>
        </View>
        </View>
    </ViewShot>
  )
}

