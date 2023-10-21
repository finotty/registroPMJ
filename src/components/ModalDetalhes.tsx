import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../../styles';
import ReactNativeModal from 'react-native-modal';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  data:any;
}

const ModalDetalhes: React.FC<ModalProps> = ({ visible, onClose,data }) => {
  
  return (
    <ReactNativeModal
     style={{backgroundColor:'#09090A'}}
      animationIn="bounceIn"
      animationOut="zoomOut"
      animationInTiming={500}
      animationOutTiming={500}
      isVisible={visible}
      onResponderEnd={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <View style={{ 
        marginTop:20,
        marginBottom:20, 
        width:'90%',
        height:'90%', 
        alignSelf:'center', 
        borderRadius:10,
        borderWidth:1,
        borderColor:'#fff'
      }}>
        <View style={[{flex:0.15,borderBottomWidth:1, borderBottomColor:'#fff', justifyContent:'center',alignItems:'center'}]}>
            <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',textAlign:'justify'}}>{data.title}</Text>
        </View>
            <ScrollView  showsVerticalScrollIndicator={false} style={{}} >
                <View style={[styles.corpo,{marginTop:20}]}>                      
                    <Text style={{fontSize:18, fontWeight:'400', color:'#fff',textAlign:'justify'}}>{data.solucao}</Text>                
                </View>
            </ScrollView>
      </View>    
    </ReactNativeModal>
  );
};
export default ModalDetalhes;
