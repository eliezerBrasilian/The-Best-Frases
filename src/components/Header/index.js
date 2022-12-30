import React, {useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, TouchableWithoutFeedback, Linking } from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles'
import { AuthContext } from '../../contexts';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import AppLink from 'react-native-app-link';
import { colors } from '../../colors';

export default function Header(){
  const [modalVisible,setModalVisible] = useState(false)
  const {user,changeAppTheme,appTheme,signOut} = useContext(AuthContext)
  const [profileImage,setProfileImage] = useState('')
 
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
    setModalVisible(false)
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
      //pegando a imagem do storage
      fetchImage()
    }
  })
 }
 const uploadFileFirebase = async (response) => {
  const fileSource = getFileLocalPath(response)
  
  //criando o diretorio fotosDePerfil dentro de storage e dentro vai salvar o
  //nome da imagem com o mesmo nome do id dele
  const storageRef = storage().ref('fotosDePerfil').child('usuario - ' + user?.userId)
  return await storageRef.putFile(fileSource)
 }

 //extraindo e retornando só uma imagem
 const getFileLocalPath = (response) => {
  return response.assets[0].uri;
 }

  function handleLogOut(){
    setModalVisible(false)
    signOut()
  }
   function toogleAppTheme(){
     if(appTheme === moon) changeAppTheme(sun)
     else changeAppTheme(moon)
   }
  function callModal(){
    setModalVisible(true)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frases</Text>
      <TouchableOpacity onPress={callModal}>
        {
          (profileImage === ''? <Image source={require('../../assets/img/user.png')}  style={{height:35,width:35,borderRadius:15/2}}/>
          :
          <Image source={{uri:profileImage}}  style={{height:35,width:35,borderRadius:15/2}}/>
          )
        }
        
      </TouchableOpacity>
      <Modal
      visible={modalVisible}
      animationType={'slide'}
      transparent={true}
      onRequestClose={()=>{
        setModalVisible(false)
      }}
      > 
        <View  style={styles.modal}>
          <View style={styles.modalViewOnTop}>
            <TouchableOpacity onPress={uploadFile}>
            {
              (profileImage === ''? <Image source={require('../../assets/img/user.png')}  style={styles.profileModalImage}/>
              :
              <Image source={{uri:profileImage}}  style={styles.profileModalImage}/>
              )
            }
            </TouchableOpacity>
            <View>
              <Text style={styles.username}>{user.name}</Text>
              <TouchableOpacity onPress={uploadFile}>
                <Text style={styles.changeProfileText}>Alterar foto de perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.hr}/>
          <TouchableOpacity onPress={joingWhatsappGroup}>
            <View style={styles.options}>
              <MaterialCommunityIcons name='whatsapp' size={35} color={colors.black} />
              <Text style={styles.optionsText}>Entrar em nosso grupo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toogleAppTheme}>
            <View style={styles.options}>
              <MaterialCommunityIcons name={appTheme} size={35} color={colors.black} />
              <Text style={styles.optionsText}>Alterar tema (Em breve)</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogOut}>
            <View style={styles.options}>
              <MaterialCommunityIcons name='logout' size={35} color={colors.black} />
              <Text style={styles.optionsText}>Sair de minha conta</Text>
            </View>
          </TouchableOpacity>
        </View>
        
    </Modal>
    </View>
  )
}
