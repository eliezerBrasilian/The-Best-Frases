import { StyleSheet } from 'react-native'
import {colors} from '../../colors'
export const styles = StyleSheet.create({
  container:{
    flexDirection:'row', justifyContent:'space-between',alignItems:'center',
    paddingHorizontal:15,paddingVertical:10,
    backgroundColor:'white'
  },
  title:{
    fontSize:22,fontWeight:'600',color:colors.black
  },
  profileView:{
    alignItems:'center'
  },
  modal:{
    backgroundColor:colors.glossy_crape,
    padding:20,
    height:400,
    borderTopLeftRadius:9,borderTopRightRadius:9,
    position:'absolute',left:0,bottom:0,right:0,
    
  },
  modalViewOnTop:{
    flexDirection:'row',
    flex:1,
    alignItems:'center'
  },
  modalViewOnTop_right:{
    flexDirection:'column',flexShrink:1
  },
  profileModalImage:{
    height:70,width:70,borderRadius:55/5
  },
  username:{
    fontSize:22,fontWeight:'bold',marginHorizontal:10,color:colors.black
  },
  changeProfileText:{
    marginLeft:10,
    color:colors.brow_sugar,
    fontStyle:'italic',fontWeight:'700',
    fontSize:16
  },
  hr:{
    borderColor:colors.glossy_crape,borderBottomWidth:0.3,marginTop:10,elevation:1.5
  },
  options:{
    flexDirection:'row', alignItems:'center',padding:20
  },
  optionsText:{
    fontSize:17,fontWeight:'700',
    marginLeft:10,color:colors.optionsText
  },
  bannerStyle:{
    alignItems:'center',
    //paddingHorizontal:15,
    marginHorizontal:15
  }
})

