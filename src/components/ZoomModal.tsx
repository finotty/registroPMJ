import React, { useState, useEffect, useRef} from 'react';
import {  View, Text, TextInput, ScrollView, Alert, TouchableOpacity, Button,Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { Botao } from './Botao';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface ModalProps {
 visible: boolean;
 onClose: () => void;
 image:any;
 ImgPosition: (rotate : string) => void;
}

const ZoomModal: React.FC<ModalProps> = ({visible,image,onClose,ImgPosition}) => {
    const [imgPosition, setImgPosition] = useState('90deg');

    function menu(op:string){
     if(op === '<'){
          setImgPosition('-90deg')
          ImgPosition('-90deg')
          
     }
     if(op === '>'){
      setImgPosition('90deg')
      ImgPosition('90deg')
     }
    }

    function close (){
      setImgPosition('');
      onClose();
    }

  return (
   <ReactNativeModal
     isVisible={visible}
     onResponderEnd={onClose}
     onBackButtonPress={onClose}
     animationIn="bounceIn"
     animationOut="zoomOut"
     animationInTiming={500}
     animationOutTiming={500}
     style={{flex:1}}>
     <View style={{flex:1, justifyContent:'center',alignItems:'center', backgroundColor:'#09090A'}} >
      <View style={{flex:4,width:'100%',height:'100%', justifyContent:'center', alignItems:'center'}}>
      <Image
        source={{uri: image}}
        style={{width:'100%', height:'100%', resizeMode:'contain',  
        transform: imgPosition ?[{ rotate: imgPosition}]: [] }}
        />
      </View>
      <View style={{flex:1,flexDirection:'row', justifyContent:'space-between'}}>
       <Botao style={{width:50, height:50}} title='<' disabled={false} onPress={() => menu('<') }/>
       <Botao style={{width:50, height:50}} title='-' disabled={false} onPress={() => alert('desenvolvimento') }/>
       <Botao style={{width:50, height:50}} title='+' disabled={false} onPress={() => alert('desenvolvimento') }/>
       <Botao style={{width:50, height:50}} title='>' disabled={false} onPress={() => menu('>') }/>
      </View>

      <View style={{flex:1,flexDirection:'row', justifyContent:'space-between'}}>
       <Botao style={{width:50, height:50}} title='X' disabled={false} onPress={close }/>
       <Botao style={{width:50, height:50}} title='V' disabled={false} onPress={() => alert('desenvolvimento') }/>
      </View>
     </View>
   </ReactNativeModal>
  );
}

export default ZoomModal;