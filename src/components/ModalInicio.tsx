import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../../styles';
import ReactNativeModal from 'react-native-modal';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  data:any;
}

const ModalInicio: React.FC<ModalProps> = ({ visible, onClose,data }) => {
  
  return (
    <ReactNativeModal
     style={{backgroundColor:'transparent' }}
      animationIn="bounceIn"
      animationOut="zoomOut"
      animationInTiming={300}
      animationOutTiming={200}
      isVisible={visible}
      onResponderEnd={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      
    >
      <View style={{
        width:'90%',
        minHeight:'50%',
        maxHeight:'70%',
        marginBottom:20, 
        alignSelf:'center', 
        borderRadius:10,
        borderWidth:1,
        borderColor:'#fff',
        backgroundColor:'#09090A'
      }}>

              <View style={{flex:0.5,borderBottomWidth:1, borderBottomColor:'#fff',justifyContent:'center',alignItems:'center', marginBottom:10, minHeight:'10%'}}>
                 <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',textAlign:'justify'}}>Detalhes do Chamado</Text>
              </View>

            <ScrollView  showsVerticalScrollIndicator={false} style={{minHeight:'40%'}} >
                    <View style={[styles.corpo,{marginTop:20, alignItems:'flex-start'}]}>  
                        <View style={{flexDirection:'row', paddingLeft:5}}>
                         <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>Secretaria: </Text> 
                         <Text style={{fontSize:18, fontWeight:'400', color:'#fff'}}>{data.secretaria}{'\n'}</Text>
                        </View> 

                        <View style={{flexDirection:'row',width:'70%', paddingLeft:5}}>
                          <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>Problema: </Text> 
                          <Text style={{fontSize:18, fontWeight:'400', color:'#fff'}}>{data.problema}{'\n'}</Text>
                        </View>    

                        <View style={{flexDirection:'row',width:'70%', paddingLeft:5}}>
                          <Text style={{fontSize:18, fontWeight:'bold', color:'#fff',}}>Solução: </Text> 
                          <Text style={{fontSize:18, fontWeight:'400', color:'#fff',}}>{data.solucao}{'\n'}</Text>
                        </View>  

                        <View style={{flexDirection:'row',width:'70%', paddingLeft:5}}>
                          <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>Técnico: </Text>
                          <Text style={{fontSize:18, fontWeight:'400', color:'#fff'}}>{data.tecnico}{'\n'}</Text> 
                        </View>             
                    </View>         
            </ScrollView>
                     <Text style={{fontSize:17, fontWeight:'100', color:'#fff',textAlign:'justify', fontStyle:'italic', alignSelf:'center'}}>Encerrado em {data.dataFechamento}</Text>                
          </View>
    </ReactNativeModal>
  );
};
export default ModalInicio;
