import React, { useState} from 'react';
import { Modal, View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { styles } from '../../styles';
import { Botao } from '../components/Botao';
import app from '../conexaoFirebase/FireBD';
import { getFirestore ,collection,Timestamp,addDoc} from "firebase/firestore";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PassosForm from './PassosForm';
import ReactNativeModal from 'react-native-modal';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const ModalS: React.FC<ModalProps> = ({ visible, onClose }) => {
  
  const db = getFirestore(app);
  const [solucao, setSolucao] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false)

  const handlePassosSubmit = (passos: any) => {
        // Criando a string "solucao"
        const solucaoForm = passos
        .map((passo:any) => `Passo ${passo.numero} : ${passo.descricao}`)
        .join('\n\n');
        setSolucao(solucaoForm);
    
  };

  async function registrarInstrucao(){
    setLoading(true);
 
    if(!title || !solucao){
      return Alert.alert('Registrar', 'Preencha todos os campos.');
    }

    await addDoc(collection(db, "solution"), {
      title,
      solucao,
      created_at: Timestamp.now(),
    })
    .then(() => {  
        onClose();
        setLoading(false)

    }).catch(error => {
      console.log(error);
      return Alert.alert('Solicitação', 'Não foi possivel registrar instrução.');
    })
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
      <KeyboardAwareScrollView  style={[styles.container]}>
            <ScrollView  showsVerticalScrollIndicator={false} style={{ flex:1,marginBottom:20}} >
              <View style={{ marginTop:40}}>
                    <View style={styles.cabecalho}>
                     <Text style={styles.cabecalhoTXT}>Registrar Instrução</Text>
                    </View>

                    <View style={[styles.corpo,{marginTop:50}]}>
                       <TextInput 
                            style={styles.input}
                            placeholder='Título:'
                            onChangeText={(text) => setTitle(text)}
                        />

                        <PassosForm  onSubmit={handlePassosSubmit} />
                       
                    </View>

                </View>    
            </ScrollView>
                  
                    <View  style={{justifyContent:'flex-end', alignItems:'center'}}>
                        <Botao 
                            style={loading == true ? { backgroundColor:'#4e4d4a'}: null }
                            disabled={loading}
                            title='Registrar' 
                            onPress={() => registrarInstrucao()} 
                        /> 
                    </View>
                 
    </KeyboardAwareScrollView>
    </ReactNativeModal>
  );
};


export default ModalS;
