import React, { useState, useEffect, useRef} from 'react';
import {  View, Text, TextInput, ScrollView, Alert, TouchableOpacity, Button,Modal } from 'react-native';
import { styles } from '../../styles';
import { Camera, CameraType, } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons'
import ReactNativeModal from 'react-native-modal';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onPictureTaken: (uri: string) => void;
}

const ModalCamera: React.FC<ModalProps> = ({ visible, onClose, onPictureTaken }) => {
  
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(CameraType.back); 
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(true);
  const CamRef = useRef<any>();
  const [capturedPhoto, setCapturedPHoto] = useState(null)

  function permissao (){
    requestPermission();
    setModalVisible(false);
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
    <Modal style={{flex:1}} transparent visible={modalVisible} >
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:'80%', height:'30%', alignItems:'center',backgroundColor:'#fff', borderRadius:10}}>
              <View style={{flex:2, width:'100%'}}>
                  <Text style={{fontSize:24, fontWeight:'bold', alignSelf:'center'}} >Permissão</Text>
                  <View style={{borderWidth:1, width:'100%'}}/>
              </View>
              <View style={{flex:2.5}}>
                  <Text style={{ textAlign: 'center', margin:5, fontSize:18 }}>Precisamos de sua permissão para acessar a camera</Text>
              </View>
              <View style={{flex:1.3,width:'100%', justifyContent:'center', marginRight:10, flexDirection:'row'}}>
                 <TouchableOpacity style={{
                    width:100,height:40,backgroundColor:'red', justifyContent:'center', alignItems:'center', borderRadius:10, }}
                    onPress={() => setModalVisible(false)}>
                    <Text style={{color:'#fff', fontSize:18}}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    width:100,height:40,backgroundColor:'#0B2873', justifyContent:'center', alignItems:'center', borderRadius:10, marginLeft:5}}
                    onPress={permissao}>
                    <Text style={{color:'#fff', fontSize:18}}>Permitir</Text>
                  </TouchableOpacity>
                  
              </View>
            </View>
        </View>
    </Modal>
    );
  }

  async function takepicture (){
   if(CamRef){
    const data = await CamRef.current.takePictureAsync();
    setCapturedPHoto(data.uri)
    onPictureTaken(data.uri);
    onClose();
    
   }
  }

  return (
    <ReactNativeModal
     style={{backgroundColor:'#09090A'}}
      //animationType="slide"
      animationIn="bounceIn"
      animationOut="zoomOut"
      animationInTiming={500}
      animationOutTiming={500}
      //transparent={true}
      isVisible={visible}
      //onRequestClose={onClose}
      onResponderEnd={onClose}
      onBackButtonPress={onClose}
    >
   <View style={{flex:1}}>
      <Camera style={{flex:1}} type={type} ref={CamRef} >
        <View style={{flex:1}}>   
        </View>

      <TouchableOpacity style={{justifyContent:'center', alignItems:'center', backgroundColor:'#121212', margin:20,borderRadius:10, height:50, width:50, alignSelf:'center'}} onPress={takepicture}>
       <FontAwesome name='camera' size={23} color="#fff"/>
      </TouchableOpacity>
      </Camera>
    </View>
    
    </ReactNativeModal>
  );
};


export default ModalCamera;
