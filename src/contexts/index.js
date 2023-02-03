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
  const [abrirModal,setAbrirModal] = useState(false)
  const [errorDescription,setErrorDescription] = useState('')
  const [abrirModal_forgotPassword,setAbrirModal__forgotPassword] = useState(false)
  const [errorDescription__forgotPassword,setErrorDescription__forgotPassword] = useState('')
  const [errorOnSendLink_forgotPassword,setErrorOnSendLink_forgotPassword] = useState(false)
  function changeAppTheme(themeName){
    setAppTheme(themeName)
    storageAppTheme(themeName)
  }
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

  async function forgotPassword(email){
    setLoadingAuth(true)
    await auth().sendPasswordResetEmail(email)
    .then(()=>{
      setLoadingAuth(false)
      setAbrirModal__forgotPassword(true)
      setErrorOnSendLink_forgotPassword(false)
      setErrorDescription__forgotPassword('O link para alterar a senha foi enviado para seu email!')
    })
    .catch((e)=>{
      setLoadingAuth(false)
      setAbrirModal__forgotPassword(true)
      setErrorOnSendLink_forgotPassword(true)
      if(e.code == 'auth/invalid-email'){
        setErrorDescription__forgotPassword('O email é inválido!')
      }
      if(e.code == 'auth/user-not-found'){
        setErrorDescription__forgotPassword('O email não está cadastrado!')
      }
      

      console.log(`O ERRO FOI: ${e}`)
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
        senha: password
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
        console.log(`ERRO - ${error}`)
      })
     
    })
    .catch((error)=>{
      setLoadingAuth(false)
      if(error.code === 'auth/email-already-in-use'){
        setErrorDescription('Este email já está cadastrado!')
        setAbrirModal(true)
        return
      }
      if(error.code === 'auth/invalid-email'){
        setErrorDescription('Este email é inválido!')
        setAbrirModal(true)
        return
      }
      if(error.code === 'auth/weak-password'){
        setErrorDescription('A senha está muito curta!')
        setAbrirModal(true)
        return
      }
  
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
      if(error.code === 'auth/user-not-found'){
        setAbrirModal(true)
        setErrorDescription('Este email não está cadastrado!')
        return
      }
      if(error.code === 'auth/wrong-password'){
        setAbrirModal(true)
        setErrorDescription('A senha está errada!')
        return
      }
      if(error.code === 'auth/invalid-email'){
        setAbrirModal(true)
        setErrorDescription('Email inválido!')
        return
      }
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
      abrirModal,
      setAbrirModal,
      errorDescription,
      forgotPassword,
      abrirModal_forgotPassword,
      setAbrirModal__forgotPassword,
      errorDescription__forgotPassword,
      errorOnSendLink_forgotPassword
      }}>
      {children}
    </AuthContext.Provider>
  )
}