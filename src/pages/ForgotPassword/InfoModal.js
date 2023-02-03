import { Modal } from "react-native";
import styled from "styled-components";
import LinearGradient from 'react-native-linear-gradient';
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts";
import { colors } from "../../colors";
import { TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function InfoModal({data:email}){

    const nav = useNavigation()
    const {abrirModal_forgotPassword, setAbrirModal__forgotPassword,
        errorDescription__forgotPassword, errorOnSendLink_forgotPassword
    } = useContext(AuthContext)

 
    function goToMainScreen(){
        if(errorOnSendLink_forgotPassword) {
            setAbrirModal__forgotPassword(false)
        }
        else{
            setAbrirModal__forgotPassword(false)
            nav.goBack()
        }
    }

    return(
        <Modal
        visible={abrirModal_forgotPassword}
        animationType={'fade'}
        transparent={true}
        >
          <Container>
          <LinearGradient colors={['#0061ff','#60efff']} style={{
          flexDirection:'column',  
          alignItems:'center',
          justifyContent:"space-between",
          padding:20,
          borderRadius:9
          }}>
          <Descricao>
            {errorDescription__forgotPassword}
          </Descricao>
  
            {
                (errorOnSendLink_forgotPassword)?
                <Icone 
                source={require('../../assets/img/error.png')} /> 
                :
                <Icone
                source={require('../../assets/img/check.png')} /> 
            }
            
            <Redefinir onPress={goToMainScreen}>
              {
                (errorOnSendLink_forgotPassword?
                <Texto>Tentar de novo</Texto>
                  :
                <Texto>Fechar</Texto>
                )
              }
            </Redefinir>   
        </LinearGradient>
        </Container>
        </Modal>
    )
}

const Container = styled.View`
margin-top: 20px;
justify-content: center;
align-items: center;
`
const Descricao = styled.Text`
 color:#fff; font-size:20px;
`
const Icone = styled.Image`
height: 60px; width: 60px;
margin-top: 10px; margin-bottom: 10px;
`
const Redefinir = styled.TouchableOpacity`
background-color:${colors.white};
padding:10px;
margin-top:20px;
border-color:#fff;border-width:1px;border-radius:7px;
padding-left: 15px;padding-right:15px;
padding-top: 12px; padding-bottom: 12px;
`
const Texto = styled.Text`
color:#000;font-weight:700px,;font-size:18px;text-align:center;
`