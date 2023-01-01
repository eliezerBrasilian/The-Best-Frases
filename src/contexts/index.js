import react, { createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({})
export default function AuthProvider({children}){
  const [user,setUser] = useState(null)
  const [loadingAuth,setLoadingAuth] = useState(false)
  const [loadingInfo,setLoadingInfo] = useState(true)
  const [appTheme,setAppTheme] = useState('moon-waxing-crescent')
  
  useEffect(()=>{
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('@info')
      const storageAppTheme = await AsyncStorage.getItem('@apptheme')
     
      if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoadingInfo(false)
      }
      if(!storageUser) setLoadingInfo(false)

      if(storageAppTheme){
        setAppTheme(JSON.parse(storageAppTheme))
      }
    }
    loadStorage()
  },[])

  function changeAppTheme(themeName){
    setAppTheme(themeName)
    storageAppTheme(themeName)
  }
  async function resetPassword(email){
    await auth().sendPasswordResetEmail(email).then(()=>{
      console.log('email enviado')
    })
  }

  async function signUp(email,password,name){
    setLoadingAuth(true)
    await auth().createUserWithEmailAndPassword(email,password)
    .then(async (value)=>{
      let userId = value.user.uid;
      await firestore().collection('Users')
      .doc(userId).set({
        nome: name,
        criado_em: new Date(),
      })
      .then(()=>{
        let data = {
          userId: userId,
          name: name,
          email: value.user.email
        }
        setLoadingAuth(false)
        setUser(data)
        storageUser(data)
      })
      .catch((error)=>{ 
        setLoadingAuth(false)
        console.log(`ERRO - ${error}`)
      })
    })
    .catch((error)=>{
      console.log(`ERRO AO CADASTRAR O USUARIO - ${error}`)
      setLoadingAuth(false)
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

  async function signOut(){
    
    await auth().signOut()
    .then(()=>{
      setUser(null)
      console.log('usuario deslogado')
    })
    await AsyncStorage.clear()
    setUser(null)
  }
  async function storageUser(data){
    await AsyncStorage.setItem('@info',JSON.stringify(data))
  }
  async function storageAppTheme(theme){
    await AsyncStorage.setItem('@apptheme',JSON.stringify(theme))
  }
 

  return(
    <AuthContext.Provider value={
      {signed: !!user,
      signUp, 
      signIn, 
      loadingAuth, 
      loadingInfo, 
      user, 
      changeAppTheme, 
      appTheme, 
      signOut,
      resetPassword
      }}>
      {children}
    </AuthContext.Provider>
  )
}