import React from 'react';
import {} from 'react-native'
export default function Modal(){
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible);
}}
></Modal>
  )
}

