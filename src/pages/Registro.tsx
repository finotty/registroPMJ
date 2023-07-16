import React,{useState} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { styles } from '../../styles';
import { Botao } from '../components/Botao';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';

import app from '../conexaoFirebase/FireBD';
import { getFirestore ,collection,Timestamp,addDoc} from "firebase/firestore";

export function Registro() {
    const navigation = useNavigation();
    const db = getFirestore(app);

    const [secretaria, setSecretaria] = useState('');
    const [problema, setProblema] = useState('');
    const [solucao, setSolucao] = useState('');
    const [obs, setObs] = useState('');
    const [loading, setLoading] = useState(false)

    function formatarMensagem(){
        const fObs = obs != ''? 'Observação: '+obs: obs
        const msg = 'Secretaria: '+secretaria+' \n\n'+
                    'Problema: '+problema+' \n\n'+
                    'Solução: '+solucao+' \n\n'+
                    fObs
       return msg;
    }

    function enviarMensagemWhatsApp() { 
        const mensagem = formatarMensagem();
        const mensagemEncoded = encodeURIComponent(mensagem);
        const url = `whatsapp://send?text=${mensagemEncoded}&app_absent=0&action=invite&chat_id=https://chat.whatsapp.com/`;
        Linking.openURL(url);
      }

      async function registrarChamado(){
        setLoading(true);
        /* 
         Verifica se os campos secretaria, problema e  solucao  estão  preenchidos.
         Em  seguida, adiciona um novo documento a uma  coleção  "orders" no  banco 
         de dados e, se tudo ocorrer bem, redireciona o usuário  para  o  Whatsapp, 
         para que possa escolher o contato que  deseja  enviar  as  informações  do 
         chamado. Caso contrário, informa ao usuário que não foi possível registrar
         a solicitação.
        */
     
        if(!secretaria || !problema || !solucao){
          return Alert.alert('Registrar', 'Preencha todos os campos.');
        }
    
        await addDoc(collection(db, "orders"), {
          secretaria,
          problema,
          solucao,
          created_at: Timestamp.now(),
        })
        .then(() => {
            enviarMensagemWhatsApp();
            navigation.goBack();
            setLoading(false)

        }).catch(error => {
          console.log(error);
          return Alert.alert('Solicitação', 'Não foi possivel registrar o chamado.');
        })
     
      }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
            <ScrollView  showsVerticalScrollIndicator={false} >
              <View style={{ marginTop:30}}>
                    <View style={styles.cabecalho}>
                     <Text style={styles.cabecalhoTXT}>Registrar chamado</Text>
                    </View>

                    <View style={[styles.corpo,{marginTop:60}]}>
                       <TextInput 
                            style={styles.input}
                            placeholder='Secretaria'
                            onChangeText={(text) => setSecretaria(text.toUpperCase())}

                        />
                        <TextInput 
                            style={[styles.input,styles.inputMultiline]}
                            placeholder='Problema:'
                            multiline
                            onChangeText={setProblema}
                        />
                        <TextInput 
                            style={[styles.input,styles.inputMultiline]}
                            placeholder='Solução:'
                            multiline
                            onChangeText={setSolucao}
                        />
                        <TextInput 
                            style={[styles.input,styles.inputMultiline]}
                            placeholder='OBS:'
                            multiline
                            onChangeText={setObs}
                        />
                    </View>

                    <View  style={[styles.rodape,{marginTop:20}]}>
                        <Botao 
                            style={loading == true ? { backgroundColor:'#4e4d4a'}: null }
                            disabled={loading}
                            title='Enviar para Whatsapp!' 
                            onPress={() => registrarChamado()} 
                        /> 
                    </View>

                </View>
       
            </ScrollView>


    </KeyboardAvoidingView>
  );
}