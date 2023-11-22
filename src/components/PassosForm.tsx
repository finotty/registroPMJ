import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalCamera from './ModalCamera';
import ZoomModal from './ZoomModal';

export interface Passo {
  numero: number;
  descricao: string;
  imageUri?: string | undefined;
  configImg?:string | undefined;
}

interface PassosFormProps {
  onSubmit: (passos: Passo[]) => void;
}

const PassosForm: React.FC<PassosFormProps> = ({ onSubmit }) => {
  const [passos, setPassos] = useState<Passo[]>([{ numero: 1, descricao: '',imageUri: undefined,configImg: undefined}]);
  const [visible, setVisible] = useState(false);
  const [visibleZoom, setVisibleZoom] = useState(false);
  const [photo, setPhoto] = useState<any>();
  const [imgPosition, setImgPosition] = useState('');

  const addPasso = () => {
    const newPasso: Passo = { numero: passos.length + 1, descricao: '', imageUri: undefined, configImg: undefined };
    setPassos([...passos, newPasso]);

  };

  const handleInputChange = (index: number, value: string) => {
    const updatedPassos = passos.map((passo, i) =>
      i === index ? { ...passo, descricao: value } : passo
    );
    setPassos(updatedPassos);
    handleSubmit();
  };

   function handleSubmit () {
    onSubmit(passos);
    
  };

  function handlePictureTaken(imageUri: string) {
    const updatedPassos = passos.map((passo, index) =>
      index === passos.length - 1 ? { ...passo, imageUri } : passo
    );
    setPassos(updatedPassos);
  }
  function handlePictureConfig(configImg: string) {
    const updatedPassos = passos.map((passo, index) =>
      index === passos.length - 1 ? { ...passo, configImg } : passo
    );
    setPassos(updatedPassos);
  }

  function zoomPicture(imagem:any){
   setPhoto(imagem);
   setVisibleZoom(true);
  }
  return (
    <View style={{alignItems:'center'}}>

      {passos.map((passo, index) => (   
        <View key={index}  style={{}}>
             {passo.imageUri && (
              <View style={{ width:300, height:172, }}> 
               <TouchableOpacity onPress={() => zoomPicture(passo.imageUri)}>
               <Image
                source={{uri: passo.imageUri}}
                style={{
                  zIndex:10,
                  width:300, 
                  height:230, 
                  resizeMode:'contain',marginTop:-30, 
                  transform: passo.configImg ? [{ rotate: passo.configImg}]:[{rotate:'90deg'}]}}
                />
                </TouchableOpacity> 
              </View>
           )}
        <View style={styles.passoContainer}>      
          <TextInput
            style={styles.input}
            placeholder={`Passo ${passo.numero}`}
            value={passo.descricao}
            onChangeText={(text) => handleInputChange(index, text)}
            multiline
            />
          <TouchableOpacity style={{
            backgroundColor:'#0B2873',
            width:40,
            minHeight:40,
            borderRadius:10,
            justifyContent:'center',
            alignItems:'center',
            marginTop:-8
          }}
          onPress={() => setVisible(true)}
          >
            <MaterialCommunityIcons name="file-image-plus-outline" size={30} color="white" />
          </TouchableOpacity>
            </View>  
          </View>      
        
      ))}
      <TouchableOpacity onPress={addPasso}
       style={{
        width:100,
        height:60,
        backgroundColor:'#0B2873',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#fff',
        
       }}
      >
        <Text style={{fontSize:18, color:'#fff', fontWeight:'bold'}}>+ Passos</Text>
      </TouchableOpacity>

   <ModalCamera  visible={visible} onClose={() => setVisible(!visible)} onPictureTaken={handlePictureTaken} />
   <ZoomModal visible={visibleZoom}  onClose={() => setVisibleZoom(!visibleZoom)} image={photo} ImgPosition={handlePictureConfig}/>
    </View>
  );
};

const styles = StyleSheet.create({
  passoContainer: {
    //marginBottom: 1,
    flexDirection:'row'
  },
  input: {
    backgroundColor:'#5192AE',
        width:260,
        minHeight:40,
        fontSize:16,
        paddingLeft:8,
        marginBottom:5,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10
        
    
  },
});

export default PassosForm;
