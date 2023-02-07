import react, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';
///////////
import {
  Container,
  PostContainer,
  TopView,
  FotoAutor,
  DireitaDeFotoAutor,
  NomeAutor,
  NomeApp,
  FraseText,
  Footer,
  Esquerda,
  Direita,
  IconeAplicativo,
  NomeAplicativo,
  Button,
} from './styles';
//////////
import {colors} from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
export default function Card({data}) {
  const viewRef = useRef();
  const {user} = useContext(AuthContext);
  const imagem = require('../../assets/img/wallpaper.png');
  const [frasesLikes, setFrasesLikes] = useState(data?.curtidas);
  const [liked, setLiked] = useState(false); // clicou em curtir

  let likesCount = data?.curtidas;

  const teste = 'ca-app-pub-3940256099942544/1033173712';
  const adUnitId = 'ca-app-pub-4318787550457876/5020362587';
  const interstitial = InterstitialAd.createForAdRequest(adUnitId);
  const [loaded, setLoaded] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    async function checkingIfWasLiked() {
      const user_and_post = `${user.userId}_${data.key}`;

      const docLikes = await firestore()
        .collection('Likes')
        .doc(user_and_post)
        .get();

      if (docLikes.exists) {
        setLiked(true);
        let z = await firestore().collection('Likes').doc(user_and_post).get();
        //console.log(z.data().liked)
      }
    }
    checkingIfWasLiked();
    // Start loading the interstitial straight away
    interstitial.load();
  }, []);

  async function shareImage() {
    // Start loading the interstitial straight away
    interstitial.load();
    setShareLoading(true);
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1.0,
      });
      await Share.open({url: uri})
        .then(() => {
          setShareLoading(false);
          interstitial.show();
        })
        .catch(error => {
          console.log(error);
          setShareLoading(false);
          interstitial.show();
        });
    } catch (error) {
      interstitial.load();
      console.log(error);
      setShareLoading(false);
    }
  }
  async function likeSystem(key, curtidas) {
    console.log('key atual' + key);
    const user_and_post = `${user.userId}_${key}`;

    const docLikes = await firestore()
      .collection('Likes')
      .doc(user_and_post)
      .get();

    //o usuario ja deu o like
    //meu id ja esta salvo la
    if (docLikes.exists) {
      await firestore()
        .collection('Frases')
        .doc(key)
        .update({
          curtidas: curtidas - 1,
        })
        .then(() => {
          likesCount--;

          console.log('descurtiu');
          setFrasesLikes(likesCount);
          setLiked(false);
        })
        .catch(error => {
          console.log(error);
        });

      await firestore()
        .collection('Likes')
        .doc(user_and_post)
        .delete()
        .then(() => {
          console.log('curtida deletada');
        });
      return;
    }
    //  dando like
    await firestore().collection('Likes').doc(user_and_post).set({
      postId: key,
      userId: user.userId,
      liked: true,
    });

    await firestore()
      .collection('Frases')
      .doc(key)
      .update({
        curtidas: curtidas + 1,
      })
      .then(() => {
        console.log('curtida feita');
        likesCount++;
        setFrasesLikes(likesCount);
        setLiked(true);
      });
  }

  return (
    <Container>
      <LinearGradient
        colors={['#0965c0', '#c53a94']}
        style={{
          height: 320,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 18,
          borderRadius: 10,
        }}>
        <PostContainer>
          <TopView>
            <FotoAutor source={{uri: data.foto}} />
            <DireitaDeFotoAutor>
              <NomeAutor>{data.autor}</NomeAutor>
              <NomeApp>@thebestfrases</NomeApp>
            </DireitaDeFotoAutor>
          </TopView>
          <FraseText>{data.frase}</FraseText>
        </PostContainer>
      </LinearGradient>
      <Footer>
        <Esquerda>
          <IconeAplicativo
            source={require('../../assets/img/ic_launcher_round.png')}
          />
          <NomeAplicativo>TheBest Frases</NomeAplicativo>
        </Esquerda>
        <Direita>
          <Button style={{marginRight: 12}}>
            <Feather name="share-2" size={28} color={colors.black} />
          </Button>

          <Button style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons
              style={{marginRight: 5}}
              name="heart-outline"
              size={28}
              color="black"
            />
            <NomeAplicativo>{data.curtidas}</NomeAplicativo>
          </Button>
        </Direita>
      </Footer>
    </Container>
  );
}
