import React,{useState} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import {Picker} from '@react-native-picker/picker';
import { styles } from '../../styles';
import { Botao } from '../components/Botao';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import bank from '../conexaoFirebase/FireBD';
import { getFirestore ,collection,Timestamp,addDoc} from "firebase/firestore";

export function Registro() {
    const navigation = useNavigation();
    const db = getFirestore(bank);
    const [secretaria, setSecretaria] = useState('');
    const [tecnico, setTecnico] = useState('');
    const [problema, setProblema] = useState('');
    const [solucao, setSolucao] = useState('');
    const [obs, setObs] = useState('');
    const [solicitante, setSolicitante] = useState('');
    const [loading, setLoading] = useState(false);
    const [resolvido, setResolvido] = useState(false);
    const [naoResolvido, setNaoResolvido] = useState(false);
    const [numeroChamado, setNumeroChamado] = useState('');
    const [horaFinal, setHoraFinal] = useState('');

    function formatarMensagem(){
        const fObs = obs != ''? 'Observação: '+obs : obs;
        
        const msg = 'Chamado n° '+numeroChamado+'\n'+
                    'Serviço: '+problema+' \n'+
                    'Local do serviço: '+secretaria+' \n'+
                    'Resolução do suporte: '+solucao+' \n'+     
                    'Horário final do suporte: '+horaFinal+' \n'+    
                    'Técnico: '+tecnico+' \n\n'+                
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
     
        if(!secretaria || !problema || !solucao || !tecnico){
          return Alert.alert('Registrar', 'Preencha todos os campos.');
        }
    
        await addDoc(collection(db, "orders"), {
          secretaria,
          problema,
          solucao,
          tecnico,
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

                    <View style={[styles.corpo,{marginTop:40}]}>
                    
                   <View style={{backgroundColor:'#5192AE', width:300,height:56, alignItems:'center', justifyContent:'center',paddingTop:11,marginBottom:10, borderRadius:10}}>

                    <Picker
                        style={[styles.input,{height:45,width:290}]}
                        selectedValue={tecnico}
                        onValueChange={(itemValue, itemIndex) =>
                            setTecnico(itemValue)
                        }>
                        <Picker.Item  label="Selecione o técnico" value="tecnico" />
                        <Picker.Item label="Hugo" value="hugo" />
                        <Picker.Item label="Pierry" value="pierry" />
                        <Picker.Item label="Leonardo" value="leonardo" />
                        <Picker.Item label="Felipe" value="felipe" />
                    </Picker>
                    </View>
                                      
                       <TextInput 
                            style={styles.input}
                            placeholder='N° Chamado'
                            onChangeText={setNumeroChamado}
                        />
            
                       <TextInput 
                            style={styles.input}
                            placeholder='Secretaria:'
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
                            <View style={{ width:'82%'}}>
                                <TextInput 
                                    style={[styles.input,{width:'49%'}]}
                                    placeholder='Hora Final:'
                                    onChangeText={setHoraFinal}
                                />
                            </View>
                 

                        <TextInput 
                            style={[styles.input,styles.inputMultiline,{height:55}]}
                            placeholder='OBS(opcional):'
                            multiline
                            onChangeText={setObs}
                        />
                    </View>

                    <View  style={[styles.rodape,{marginTop:10}]}>
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