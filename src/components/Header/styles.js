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
    marginTop:'55%', padding:20,
    flex:1,
    borderTopLeftRadius:9,borderTopRightRadius:9
  },
  modalViewOnTop:{
    flexDirection:'row',
    alignItems:'center'
  },
  profileModalImage:{
    height:70,width:70,borderRadius:55/5
  },
  username:{
    fontSize:22,fontWeight:'bold',marginLeft:10,color:colors.black
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
  }
})

