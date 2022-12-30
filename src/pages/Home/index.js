import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Header from '../../components/Header';
import Card from './Card';
import firestore from '@react-native-firebase/firestore';
export default function Home(){
  const [rtData,setRtdata] = useState([]) 

  
  async function loadRTData(){
    const frasescollection = firestore().collection('Frases').onSnapshot(querySnapshot => {
      const frases = []

      querySnapshot.forEach((documentSnapshot)=>{
        frases.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id
        })
      })
      setRtdata(frases)
    })

    return () => frasescollection()
  }

  useEffect(()=>{
    loadRTData()
  },[])


  return(
  <View style={{paddingHorizontal:10,flex:1, backgroundColor:'#fff'}}>
    <Header/>
    <FlatList 
    data={rtData} 
    keyExtractor = {item => item.key}
    renderItem={({item})=><Card data = {item} />}
    />
    
  </View>
    
  )
}