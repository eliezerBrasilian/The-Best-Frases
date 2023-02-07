import { Modal } from "react-native";
import styled from "styled-components";
import { colors } from "../../colors";
import { useContext } from "react";
import { AuthContext } from "../../contexts";

export default function ErroModal(){
    const {abrirModal, setAbrirModal, errorDescription} = useContext(AuthContext)
    return(
    <Modal animationType="slide" transparent={true} visible={abrirModal}>
        <Container>
            <Descricao>{errorDescription}</Descricao>
            <Imagem source={require('../../assets/img/error.png')}/>
            <Fechar onPress={()=>{
                setAbrirModal(false)
            }}>
                <Texto>Fechar</Texto>
            </Fechar>
        </Container>
    </Modal> 
    )
}

const Container = styled.View`
position: absolute;
top:20%;
left: 5px;right:5px;
background-color: black;
height: 50%;
border-radius: 6px;
padding: 20px;
justify-content: center;
align-items: center;
`
const Descricao = styled.Text`
color: white;
font-weight: 700;
font-size: 23px;
flex-shrink: 1;
text-align: center;
`
const Imagem = styled.Image`
height: 110px;
width: 110px;
margin-top: 20px; margin-bottom: 20px;
`

const Fechar = styled.TouchableOpacity`
background-color: ${colors.thin_white};
width: 40%;
padding: 10px 4px;
border-radius: 6px;
margin-top: 15px;
`

const Texto = styled.Text`
font-size: 20px;
color: black;
text-align: center;
`