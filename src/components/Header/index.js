<<<<<<< HEAD
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles';
import {AuthContext} from '../../contexts';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import AppLink from 'react-native-app-link';
import {colors} from '../../colors';
import BannerAds from '../BannerAds';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const {user, changeAppTheme, appTheme, signOut} = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState('');

  let moon = 'moon-waxing-crescent';
  let sun = 'white-balance-sunny';

  const teste = 'ca-app-pub-3940256099942544/1033173712';
  const adUnitId = 'ca-app-pub-4318787550457876/5020362587';
  const interstitial = InterstitialAd.createForAdRequest(adUnitId);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    fetchImage();
    // Start loading the interstitial straight away
    interstitial.load();
    // Unsubscribe from events on unmount
    return unsubscribe;
  });

  const fetchImage = () => {
    const imageRef = storage().ref('fotosDePerfil/usuario - ' + user.userId);
    imageRef
      .getDownloadURL()
      .then(uri => {
        setProfileImage(uri);
      })
      .catch(error => {
        console.log('Um erro ocorreu - ' + error);
      });
  };
=======
import React, {useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles'
import { AuthContext } from '../../contexts';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import AppLink from 'react-native-app-link';
import { colors } from '../../colors';
<<<<<<< HEAD
import BannerAds from '../BannerAds';
=======
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c

export default function Header(){
  const [modalVisible,setModalVisible] = useState(false)
  const {user,changeAppTheme,appTheme,signOut} = useContext(AuthContext)
  const [profileImage,setProfileImage] = useState('')

<<<<<<< HEAD
=======
  
  const adUnitId = 'ca-app-pub-4318787550457876/1812665180';
  const teste = 'ca-app-pub-3940256099942544/6300978111'

>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c
  let moon = 'moon-waxing-crescent'
  let sun = 'white-balance-sunny'

  useEffect(()=>{
    fetchImage()
  },[])

  const fetchImage = ()=>{
    const imageRef = storage().ref('fotosDePerfil/usuario - ' + user.userId)
    imageRef.getDownloadURL()
    .then((uri)=>{
      setProfileImage(uri)
    })
    .catch((error)=>{
      console.log('Um erro ocorreu - ' + error)
    })
  }

  const whatsapp = 'https://chat.whatsapp.com/H12Pk8A8hiv9Rgj3wMQxxC'

  const joingWhatsappGroup = async () =>{
<<<<<<< HEAD

    //setModalVisible(false)
=======
    setModalVisible(false)
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c
    await AppLink.maybeOpenURL(whatsapp, 
      {appName:'com.whatsapp', 
      appStoreId:'', 
      appStoreLocale:'', 
      playStoreId:'https://play.google.com/store/apps/details?id=com.whatsapp' })
    }

 const uploadFile = () =>{
  const options = {
    noData: true,
    mediaType: 'photo'
  }
  launchImageLibrary(options,(response)=>{
    if(response.didCancel){
      console.log('O usuario cancelou o envio')
    }
    else if(response.errorCode){console.log('um erro ocorreu')}
    else{
      //enviar para o cloud storage
      uploadFileFirebase(response)
      console.log(response.assets[0].uri)
    }
  })
  setModalVisible(false)
 }
 const uploadFileFirebase = async (response) => {
  const fileSource = getFileLocalPath(response)
  
  //criando o diretorio fotosDePerfil dentro de storage e dentro vai salvar o
  //nome da imagem com o mesmo nome do id dele
  const storageRef = storage().ref('fotosDePerfil').child('usuario - ' + user?.userId)
  return await storageRef.putFile(fileSource)
 }
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb

  const whatsapp = 'https://chat.whatsapp.com/H12Pk8A8hiv9Rgj3wMQxxC';

  const joingWhatsappGroup = async () => {
    if (loaded) interstitial.show();

    setModalVisible(false);
    await AppLink.maybeOpenURL(whatsapp, {
      appName: 'com.whatsapp',
      appStoreId: '',
      appStoreLocale: '',
      playStoreId: 'https://play.google.com/store/apps/details?id=com.whatsapp',
    });
  };

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('O usuario cancelou o envio');
      } else if (response.errorCode) {
        console.log('um erro ocorreu');
      } else {
        //enviar para o cloud storage
        uploadFileFirebase(response);
        console.log(response.assets[0].uri);
      }
    });
    setModalVisible(false);
  };
  const uploadFileFirebase = async response => {
    const fileSource = getFileLocalPath(response);

    //criando o diretorio fotosDePerfil dentro de storage e dentro vai salvar o
    //nome da imagem com o mesmo nome do id dele
    const storageRef = storage()
      .ref('fotosDePerfil')
      .child('usuario - ' + user?.userId);
    return await storageRef.putFile(fileSource);
  };

  //extraindo e retornando s?? uma imagem
  const getFileLocalPath = response => {
    return response.assets[0].uri;
  };

  function handleLogOut() {
    setModalVisible(false);
    signOut();
  }
<<<<<<< HEAD
  function toogleAppTheme() {
    if (appTheme === moon) changeAppTheme(sun);
    else changeAppTheme(moon);
  }
  function callModal() {
    setModalVisible(true);
    fetchImage();
  }

=======
   function toogleAppTheme(){
     if(appTheme === moon) changeAppTheme(sun)
     else changeAppTheme(moon)
   }
  function callModal(){
    setModalVisible(true)
    fetchImage()
  }
  
<<<<<<< HEAD
=======
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frases</Text>
      <TouchableOpacity onPress={callModal}>
        {profileImage === '' ? (
          <Image
            source={require('../../assets/img/user.png')}
            style={{height: 35, width: 35, borderRadius: 15 / 2}}
          />
        ) : (
          <Image
            source={{uri: profileImage}}
            style={{height: 35, width: 35, borderRadius: 15 / 2}}
          />
        )}
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modal}>
          <View style={styles.modalViewOnTop}>
            <TouchableOpacity onPress={uploadFile}>
<<<<<<< HEAD
              {profileImage === '' ? (
                <Image
                  source={require('../../assets/img/user.png')}
                  style={styles.profileModalImage}
                />
              ) : (
                <Image
                  source={{uri: profileImage}}
                  style={styles.profileModalImage}
                />
              )}
=======
            {
              (profileImage === ''? <Image source={require('../../assets/img/user.png')}  style={styles.profileModalImage}/>
              :
              <Image source={{uri:profileImage}}  style={styles.profileModalImage}/>
              )
            }
<<<<<<< HEAD
=======
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c
            </TouchableOpacity>
            <View style={styles.modalViewOnTop_right}>
              <Text style={styles.username}>{user.name}</Text>
              <TouchableOpacity onPress={uploadFile}>
                <Text style={styles.changeProfileText}>
                  Alterar foto de perfil
                </Text>
              </TouchableOpacity>
            </View>
          </View>
<<<<<<< HEAD
          <View style={styles.hr} />
          <TouchableOpacity onPress={joingWhatsappGroup}>
            <View style={styles.options}>
              <MaterialCommunityIcons
                name="whatsapp"
                size={35}
                color={colors.black}
              />
=======
          <View style={styles.hr}/>
          <TouchableOpacity onPress={joingWhatsappGroup}>
            <View style={styles.options}>
              <MaterialCommunityIcons name='whatsapp' size={35} color={colors.black} />
<<<<<<< HEAD
=======
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c
              <Text style={styles.optionsText}>Entrar em nosso grupo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toogleAppTheme}>
            <View style={styles.options}>
<<<<<<< HEAD
              <MaterialCommunityIcons name={appTheme} size={35} color={colors.black} />
=======
<<<<<<< HEAD
              <MaterialCommunityIcons
                name={appTheme}
                size={35}
                color={colors.black}
              />
=======
              <MaterialCommunityIcons name={appTheme} size={35} color={colors.black} />
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c
              <Text style={styles.optionsText}>Alterar tema (Em breve)</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogOut}>
            <View style={styles.options}>
<<<<<<< HEAD
              <MaterialCommunityIcons name='logout' size={35} color={colors.black} />
              <Text style={styles.optionsText}>Sair de minha conta</Text>
            </View>
          </TouchableOpacity>
          <BannerAds/>
=======
<<<<<<< HEAD
              <MaterialCommunityIcons
                name="logout"
                size={35}
                color={colors.black}
              />
              <Text style={styles.optionsText}>Sair de minha conta</Text>
            </View>
          </TouchableOpacity>
          <BannerAds />
=======
              <MaterialCommunityIcons name='logout' size={35} color={colors.black} />
              <Text style={styles.optionsText}>Sair de minha conta</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.bannerStyle}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{         
              requestNonPersonalizedAdsOnly: true,           
              }}          
              />                            
          </View>
          
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c
        </View>
      </Modal>
    </View>
  );
}
