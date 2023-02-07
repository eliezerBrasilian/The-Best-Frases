import { Text, View, ActivityIndicator, FlatList } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useCallback,useState } from 'react';
import  firestore  from "@react-native-firebase/firestore"
import styled from "styled-components"
import { colors } from "../../colors";
import { FlashList } from "@shopify/flash-list";
import BannerAds from "../../components/BannerAds";

export default function AllCategories(){
    const nav = useNavigation()

    const [categories, setCategories] = useState([])
    const [loading,setLoading] = useState(true)

    const [lastItem,setLastItem] = useState('')
    const [emptyList,setEmptyList] = useState(false)

    useFocusEffect(
        useCallback(()=>{
            let isActive = true
            function fetchPosts(){
                firestore().collection('Categorias')
                .get()
                .then((snapshot)=>{
                  //se o usuario ta na tela vamos buscar os posts
                  if(isActive){
                    setCategories([])//garantindo que nossa useState está vazia
                    const categList = []
                    //percorrer o snapshot
          
                    snapshot.docs.map( u =>{
                      //estou dentro de meus docs e vou empurrar eles para dentro de frasesList
                      categList.push({
                        ...u.data(),
                        key: u.id
                      })
                    })
          
                    setEmptyList(!!snapshot.empty)
                    setCategories(categList)
                    setLastItem(snapshot.docs[snapshot.docs.length-1])
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
                isActive = false;
              }
        },[])
    )
    
    return(
    <Container style={{flex:1, backgroundColor:colors.thin_white}}>
        {
          loading?
          <ActivityIndicator size={90} color={'red'} 
          style={{flex:1,justifyContent:'center',alignItems:'center'}}/>
          :
          <FlashList
            data={categories} 
            keyExtractor = {item => item.key}
            estimatedItemSize={75}
            renderItem={({item})=>
            <Titulo data={item} 
              onPress={()=>{
              nav.navigate('FrasesInsideCategorie',{nome_categoria:item.key})
            }}
            >
            {item.key}
            </Titulo>}
          />
        }
      <BannerAds/>
    </Container>
    )
}

const Container = styled.View`
padding-left:10px;padding-right:10px
`
const Titulo = styled.Text`
font-size: 20px; color: black;
text-align: center;
font-weight: 700;
background-color: ${colors.glossy_crape};
margin-top: 20px;
padding: 10px 15px;
border-radius: 9px;
`
