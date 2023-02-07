<<<<<<< HEAD
import styled from 'styled-components';
import {colors} from '../../colors';

const Container = styled.View`
  background-color: ${colors.post_background};
  margin-bottom: 20px;
`;
const PostContainer = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: ${colors.white};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;

const TopView = styled.View`
  flex-direction: row;
  width: 100%;
  background-color: #fff;
`;

const FotoAutor = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

const DireitaDeFotoAutor = styled.View`
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const NomeAutor = styled.Text`
  font-size: 20px;
  color: ${colors.nome_autor};
  font-weight: 700;
  font-style: normal;
`;
const NomeApp = styled.Text`
  font-size: 15px;
  color: ${colors.optionsText};
  font-weight: 600;
`;
const FraseText = styled.Text`
  font-size: 18px;
  color: ${colors.frase};
  font-style: normal;
  font-weight: 600;
`;

const Footer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

const Esquerda = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Direita = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const IconeAplicativo = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

const NomeAplicativo = styled.Text`
  font-size: 17px;
  color: ${colors.nome_autor};
  font-weight: 700;
  font-style: normal;
`;

const Button = styled.TouchableOpacity``;

export {
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
};
=======
import { StyleSheet } from 'react-native'
<<<<<<< HEAD:src/components/Card/styles.js
import { colors } from '../../colors'
=======
import { colors } from '../../../colors'
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb:src/pages/Home/Card/styles.js
export  const styles = StyleSheet.create({
  container:{
    marginBottom:10, backgroundColor:colors.white
  },
  overBackground:{//esse container está pegando o mesm tamanho da imagem
    position:'absolute',
    top:0,bottom:0,left:0,right:0,
    justifyContent:'center', alignItems:'center',
  
  },
  phraseContainer:{
    backgroundColor:'#fff',width:'90%',
    flexDirection:'column',padding:10,
    borderRadius:8
  },
  onTop:{
    flexDirection:'row',alignItems:'center'
  },
  authorPhoto:{
    height:50,width:50,borderRadius:50/2,
    marginRight:9
  },
  infoRightSide:{
    justifyContent:'center'
  },
  authorName:{
    fontWeight:'bold',fontSize:18,color:colors.author_name
  },
  authorUsername:{
    fontSize:11, fontWeight:'600',color:colors.author_name
  },
  phrase:{
    fontSize:18,fontWeight:'600',color:colors.phrase
  },
  footer:{
    padding:15,
    flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',
    backgroundColor:colors.white
  },
  onLeftSide:{
    flexDirection:'row',alignItems:'center'
  },
  onRightSide:{
    flexDirection:'row',alignItems:'center'
  },
  icon_and_amount:{
    flexDirection:'row',
  },
  shareAmount:{
    fontSize:16,
    marginRight:10,
    marginLeft:5,
    color:colors.black
  },
  likesText:{
    fontSize:16,
    marginRight:10,
    color:colors.black,
    marginLeft:5
  },
  footerUsernameText:{
    color:colors.black,fontSize:16
  }
 })
>>>>>>> e6a78e8434cc2819307dd595b56316e7346d6a2c
