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
