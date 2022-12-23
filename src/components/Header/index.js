import react from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import  Feather  from 'react-native-vector-icons/Feather';
import {styles} from '../styles'
export default function Header(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frases</Text>
      <TouchableOpacity>
        <Image source={require('../../assets/img/wallpaper.png')} style={{height:35,width:35,borderRadius:15/2}}/>
      </TouchableOpacity>
    </View>
  )
}

