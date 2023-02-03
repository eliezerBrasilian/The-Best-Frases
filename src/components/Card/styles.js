import { StyleSheet } from 'react-native'
<<<<<<< HEAD:src/components/Card/styles.js
import { colors } from '../../colors'
=======
import { colors } from '../../../colors'
>>>>>>> 4da6e131d7dd19c77e51d39c899329b7d98fd9bb:src/pages/Home/Card/styles.js
export  const styles = StyleSheet.create({
  container:{
    marginBottom:10, backgroundColor:colors.white
  },
  overBackground:{//esse container está pegando o mesm tamanho da imagem
    position:'absolute',
    top:0,bottom:0,left:0,right:0,
    justifyContent:'center', alignItems:'center',
  
  },
  phraseContainer:{
    backgroundColor:'#fff',width:'90%',
    flexDirection:'column',padding:10,
    borderRadius:8
  },
  onTop:{
    flexDirection:'row',alignItems:'center'
  },
  authorPhoto:{
    height:50,width:50,borderRadius:50/2,
    marginRight:9
  },
  infoRightSide:{
    justifyContent:'center'
  },
  authorName:{
    fontWeight:'bold',fontSize:18,color:colors.author_name
  },
  authorUsername:{
    fontSize:11, fontWeight:'600',color:colors.author_name
  },
  phrase:{
    fontSize:18,fontWeight:'600',color:colors.phrase
  },
  footer:{
    padding:15,
    flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',
    backgroundColor:colors.white
  },
  onLeftSide:{
    flexDirection:'row',alignItems:'center'
  },
  onRightSide:{
    flexDirection:'row',alignItems:'center'
  },
  icon_and_amount:{
    flexDirection:'row',
  },
  shareAmount:{
    fontSize:16,
    marginRight:10,
    marginLeft:5,
    color:colors.black
  },
  likesText:{
    fontSize:16,
    marginRight:10,
    color:colors.black,
    marginLeft:5
  },
  footerUsernameText:{
    color:colors.black,fontSize:16
  }
 })