import {useNavigation, useRoute} from '@react-navigation/native';
import {Text, FlatList, View, ActivityIndicator} from 'react-native';
import Card from '../../components/Card';
import {useState, useCallback, useLayoutEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {FlashList} from '@shopify/flash-list';
import BannerAds from '../../components/BannerAds';

export default function FrasesInsideCategorie({nome_categoria}) {
  const nav = useNavigation();
  const route = useRoute();

  const [title, setTitle] = useState(route.params?.nome_categoria);
  const [frases, setFrases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  useLayoutEffect(() => {
    nav.setOptions({
      title: title,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      function fetchPosts() {
        firestore()
          .collection('Frases')
          .where('categoria', '==', route.params?.nome_categoria)
          .limit(6)
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
              //console.log(lastItem);
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

  async function getListPosts() {
    //nao buscar se não tiver mais nada pra buscar
    if (emptyList) {
      setLoading(false);
      return null;
    }
    if (loading) return;

    firestore()
      .collection('Frases')
      .where('categoria', '==', route.params?.nome_categoria)
      .limit(5)
      .startAfter(lastItem)
      .get()
      .then(snapshot => {
        const postList = [];
        snapshot.docs.map(u => {
          postList.push({
            ...u.data(),
            key: u.id,
          });
        });
        setEmptyList(!!snapshot.empty);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        //juntando os posts que eu ja tenho com os novos
        setFrases(oldPosts => [...oldPosts, ...postList]);
        setLoading(false);
      });
  }

  return (
    <View style={{paddingHorizontal: 10, flex: 1, backgroundColor: '#fff'}}>
      {loading ? (
        <ActivityIndicator
          size={120}
          color={'red'}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <FlashList
          data={frases}
          keyExtractor={item => item.key}
          renderItem={({item}) => <Card data={item} />}
          estimatedItemSize={20}
          refreshing={loadingRefresh}
          onEndReached={() => getListPosts()}
          onEndReachedThreshold={0.25}
        />
      )}
      <BannerAds />
    </View>
  );
}
