import react, { createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({})
export default function AuthProvider({children}){
  const [user,setUser] = useState(null)
  const [loadingAuth,setLoadingAuth] = useState(false)
  const [loadingInfo,setLoadingInfo] = useState(true)
  useEffect(()=>{
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('@info')
      if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoadingInfo(false)
      }
      else setLoadingInfo(false)
    }
    loadStorage()
  },[])
  async function signUp(email,password,name){
    await auth().createUserWithEmailAndPassword(email,password)
    .then(async (value)=>{
      let userId = value.user.uid;
      await firestore().collection('Users')
      .doc(userId).set({
        nome: name,
        criado_em: new Date(),
        senha: password
      })
      .then(()=>{
        let data = {
          userId: userId,
          name: name,
          email: value.user.email
        }
        setUser(data)
        alert(`${data.name}`)
      })
      .catch((error)=>{ 
        console.log(`ERRO - ${error}`)
      })
     
    })
    .catch((error)=>{
      console.log(`ERRO AO CADASTRAR O USUARIO - ${error}`)
    })
  }

  async function signIn(email,password){
    setLoadingAuth(true)
    await auth().signInWithEmailAndPassword(email,password)
    .then(async (value)=>{
      let userId = value.user.uid

      const userProfile = await firestore().collection('Users')
      .doc(userId).get();

      let data = {
        userId: userId,
        name: userProfile.data().nome,
        email: value.user.email
      }
      setLoadingAuth(false)
      setUser(data)
      storageUser(data)

    })
    .catch((error)=>{
      setLoadingAuth(false)
      console.log(`nao foi possivel logar - ${error}`)
    })
  }

  async function storageUser(data){
    await AsyncStorage.setItem('@info',JSON.stringify(data))
  }

  return(
    <AuthContext.Provider value={{signed: !!user,signUp, signIn,loadingAuth,loadingInfo}}>
      {children}
    </AuthContext.Provider>
  )
}