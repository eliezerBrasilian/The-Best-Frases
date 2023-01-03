import React, { useCallback,useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Header from '../../components/Header';
import Card from './Card';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
export default function Home(){

const [frases,setFrases] = useState([])
const [loading,setLoading] = useState(true)

const [loadingRefresh,setLoadingRefresh] = useState(false)
const [lastItem,setLastItem] = useState('')
const [emptyList,setEmptyList] = useState(false)

 useFocusEffect(
  useCallback(()=>{
    let isActive = true;
    function fetchPosts(){
      firestore().collection('Frases')
      .limit(5)
      .get()
      .then((snapshot)=>{
        //se o usuario ta na tela vamos buscar os posts
        if(isActive){
          setFrases([])//garantindo que nossa useState está vazia
          const frasesList = []
          //percorrer o snapshot

          snapshot.docs.map( u =>{
            //estou dentro de meus docs e vou empurrar eles para dentro de frasesList
            frasesList.push({
              ...u.data(),
              key: u.id
            })
          })

          setEmptyList(!!snapshot.empty)
          setFrases(frasesList)
          setLastItem(snapshot.docs[snapshot.docs.length-1])
          console.log(lastItem)
          setLoading(false)
        }
      })
      .catch(()=>{
        setLoading(false)
      })
    }

    fetchPosts()

    //executa quando o componente for desmontado
    return ()=>{
      console.log('desmontou, usuerio saiu da tela!')
      isActive = false;
    }
    
  },[])
 )
  // const [rtData,setRtdata] = useState([]) 
  // async function loadRTData(){
  //   const frasescollection = firestore().collection('Frases').onSnapshot(querySnapshot => {
  //     const frases = []

  //     querySnapshot.forEach((documentSnapshot)=>{
  //       frases.push({
  //         ...documentSnapshot.data(),
  //         key: documentSnapshot.id
  //       })
  //     })
  //     setRtdata(frases)
  //   })

  //   return () => frasescollection()
  // }

  // useEffect(()=>{
  //   loadRTData()
  // },[])

  function handleRefreshPosts(){
    setLoadingRefresh(true)
    console.log('ativou refresh')

    firestore().collection('Frases')
      .limit(5)
      .get()
      .then((snapshot)=>{
        //se o usuario ta na tela vamos buscar os posts
      
          setFrases([])//garantindo que nossa useState está vazia
          const frasesList = []
          //percorrer o snapshot

          snapshot.docs.map( u =>{
            //estou dentro de meus docs e vou empurrar eles para dentro de frasesList
            frasesList.push({
              ...u.data(),
              key: u.id
            })
          })

          setEmptyList(false)
          setFrases(frasesList)
          setLastItem(snapshot.docs[snapshot.docs.length-1])
          console.log(lastItem)
          setLoading(false)
        
      })
      .catch(()=>{
        setLoading(false)
      })

      setLoadingRefresh(false)
  }

  async function getListPosts(){
    //nao buscar se não tiver mais nada pra buscar
    if(emptyList){
      setLoading(false)
      return null;
    }
    if(loading) return;

    firestore().collection('Frases')
    .limit(5)
    .startAfter(lastItem)
    .get()
    .then((snapshot)=>{
      const postList = []
      snapshot.docs.map(u=>{
        postList.push({
          ...u.data(),
          key: u.id,
        })
      })
      setEmptyList(!!snapshot.empty)
      setLastItem(snapshot.docs[snapshot.docs.length - 1])
      //juntando os posts que eu ja tenho com os novos
      setFrases(oldPosts => [...oldPosts,...postList])
      setLoading(false)
    })
  }
  return(
  <View style={{paddingHorizontal:10,flex:1, backgroundColor:'#fff'}}>
    <Header/>
    {
      ( loading?
        <ActivityIndicator size={90} color={'red'} 
        style={{flex:1,justifyContent:'center',alignItems:'center'}}/>
        :
        <FlatList 
            data={frases} 
            keyExtractor = {item => item.key}
            renderItem={({item})=><Card data = {item} />}

         refreshing={loadingRefresh} 
         onRefresh={handleRefreshPosts}

         onEndReached={()=> getListPosts()}
         onEndReachedThreshold = {0.1}
        />
      )
    }
    
  </View>
  )
}