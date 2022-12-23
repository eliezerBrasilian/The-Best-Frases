import react, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import Header from '../../components/Header';
import Card from './Card';
export default function Home(){
  const [teste,setTeste] = useState([
    { nome: 'Teste'},
    { nome: 'Teste'},
    { nome: 'Teste'},
    { nome: 'Teste'},
    { nome: 'Teste'},
  ])
  return(
  <View style={{paddingHorizontal:10,flex:1}}>
    <Header/>
    <FlatList 
    data={teste} 
    renderItem={({item})=><Card dado = {item} />}
    />
  </View>
    
  )
}