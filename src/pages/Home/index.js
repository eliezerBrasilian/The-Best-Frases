import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import BannerAds from '../../components/BannerAds';
export default function Home() {
  const [frases, setFrases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      function fetchPosts() {
        firestore()
          .collection('Frases')
          .orderBy('curtidas', 'desc')
          .limit(5)
          .get()
          .then(snapshot => {
            //se o usuario ta na tela vamos buscar os posts
            if (isActive) {
              setFrases([]); //garantindo que nossa useState está vazia
              const frasesList = [];
              //percorrer o snapshot

              snapshot.docs.map(u => {
                //estou dentro de meus docs e vou empurrar eles para dentro de frasesList
                frasesList.push({
                  ...u.data(),
                  key: u.id,
                });
              });

              setEmptyList(!!snapshot.empty);
              setFrases(frasesList);
              setLastItem(snapshot.docs[snapshot.docs.length - 1]);
              console.log(lastItem);
              setLoading(false);
            }
          })
          .catch(() => {
            setLoading(false);
          });
      }

      fetchPosts();

      //executa quando o componente for desmontado
      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View style={{paddingHorizontal: 10, flex: 1, backgroundColor: '#fff'}}>
      <Header />
      {loading ? (
        <ActivityIndicator
          size={90}
          color={'red'}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <FlashList
          data={frases}
          keyExtractor={item => item.key}
          renderItem={({item}) => <Card data={item} />}
          estimatedItemSize={10}
        />
      )}
      <BannerAds />
    </View>
  );
}
