import { colors } from '../../colors';
import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
  background:{
    flex:1
  },
  container:{
    flex:1,padding:15
  },
  title:{
    fontSize:27, fontWeight:'bold',
    color:colors.white
  },
  subTitle:{
    marginBottom:50, fontSize:19,color:colors.thin_white
  },
  inputText:{
    borderColor:colors.white,borderWidth:1,borderRadius:10,paddingLeft:15,
    color:colors.white,
  },
  inputTextGap:{
    marginTop:15
  },
  forgotPassword:{
    textAlign:'right',marginTop:10,color:colors.ligh_pink
  },
  btn:{
    padding:15,backgroundColor:colors.white,borderRadius:10,
    justifyContent:'center',alignItems:'center',
    marginTop:50
  },
  btnText:{
    color:colors.blue_purple,fontWeight:'600',fontSize:17
  },
  dontHaveAccount:{
    textAlign:'center',marginTop:10,color:colors.ligh_pink
  },
  cardModal:{
    marginTop:20,
    height:250,width:'90%',
    borderWidth:1,borderRadius:7, borderColor:'#fff',
    padding:20,
    justifyContent:'center',alignItems:'center'
  },
  errorTitle:{
    color:'#fff', fontWeight:'700',fontSize:19
  },
  btnCloseModal:{
    marginTop:15,
    backgroundColor:'#fff', 
    paddingHorizontal:18,paddingVertical:12
  },
  buttonTextCloseModal:{
    color:colors.glossy_crape,
    fontWeight:'bold', fontSize:20
  }
})