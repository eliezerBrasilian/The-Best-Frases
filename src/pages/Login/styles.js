import { colors } from '../../colors';
import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
  background:{
    height:'100%'
  },
  container:{
    flex:1,padding:15
  },
  title:{
    fontSize:27, fontWeight:'bold',marginTop:5,
    color:colors.white
  },
  subTitle:{
    marginBottom:50, fontSize:19,color:colors.thin_white, fontSize:18
  },
  inputText:{
    borderColor:colors.white,borderWidth:1,borderRadius:10,paddingLeft:15,
    color:colors.white,fontSize:17

  },
  inputTextGap:{
    marginTop:12
  },
  forgotPassword:{
    textAlign:'right',marginTop:10,color:colors.ligh_pink, fontSize:17
  },
  btn:{
    padding:15,backgroundColor:colors.white,borderRadius:10,
    justifyContent:'center',alignItems:'center',
    marginTop:50
  },
  btnText:{
    color:colors.blue_purple,fontWeight:'600',fontSize:19
  },
  dontHaveAccount:{
    textAlign:'center',marginTop:10,color:colors.ligh_pink, fontSize:17
  }
})