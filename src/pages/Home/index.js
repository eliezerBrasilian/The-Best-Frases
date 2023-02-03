import react, { useEffect, useState } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';
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

  //  useEffect(()=>{
  //     async function ReadDataFirestore(){
  //      await firebase.firestore().collection('Frases')
  //    .get()
  //    .then((querySnapshot)=>{
  //     const array = []
  //       querySnapshot.forEach((documentSnaphot)=>{
        
  //        const allDada = documentSnaphot.data()
  //         console.log(allDada)
       
  //          array.push({
  //            ...documentSnaphot.data(),
  //            key: documentSnaphot.id,
  //            //autor: allDada.autor
  //          })
         
  //         setPhrases(array)
          
  //       })
  //    })
  //    }
  //    ReadDataFirestore()
  //  },[])

  return(
  <View style={{paddingHorizontal:10,flex:1}}>
    <Header/>
    <FlatList 
    data={rtData} 
    keyExtractor = {item => item.key}
    renderItem={({item})=><Card data = {item} />}
    />
    
  </View>
    
  )
}
