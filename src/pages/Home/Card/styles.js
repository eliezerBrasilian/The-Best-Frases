import { StyleSheet } from 'react-native'
export  const styles = StyleSheet.create({
  container:{
    marginBottom:10
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
    fontWeight:'bold',fontSize:18
  },
  authorUsername:{
    fontSize:11, fontWeight:'600'
  },
  phrase:{
    fontSize:18,fontWeight:'600'
  },
  footer:{
    // position:'absolute',top:0,bottom:0,right:0,left:0,marginBottom:10,
    padding:15,
    flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',
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
    marginRight:10
  }
 })