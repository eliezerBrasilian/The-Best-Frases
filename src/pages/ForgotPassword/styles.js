import { StyleSheet } from 'react-native';
import {colors} from '../../colors'

export const styles = StyleSheet.create({
  container:{
    flex:1,padding:12,alignItems:'center',
    backgroundColor:'#DFDFDF'
  },
  card:{
    height:250,width:'90%',
    borderWidth:1,borderRadius:7, borderColor:'#fff',
    padding:20
  },
  title:{
    color:'#fff', fontSize:20
  },
  inputEmail:{
    marginTop:20,
    color:'#000', fontSize:17,fontWeight:'600',
    borderColor:'#000',borderWidth:1,borderRadius:7,
    paddingHorizontal:10,paddingVertical:5,
    flexShrink:1
  },
  resetButton:{
    backgroundColor:colors.white,padding:10,marginTop:20,
    borderColor:'#fff',borderWidth:1,borderRadius:7,
    paddingHorizontal:15,paddingVertical:12
  },
  buttonText:{
    color:'#000',fontWeight:'600',fontSize:18,textAlign:'center'
  },
  
  cardModal:{
    marginTop:20,
    height:250,width:'90%',
    borderWidth:1,borderRadius:7, borderColor:'#fff',
    padding:20,
    justifyContent:'center',alignItems:'center'
  }
})