import React,{useState} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
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
    const [tecnico, setTecnico] = useState('');
    const [problema, setProblema] = useState('');
    const [solucao, setSolucao] = useState('');
    const [obs, setObs] = useState('');
    const [solicitante, setSolicitante] = useState('');
    const [loading, setLoading] = useState(false);
    const [resolvido, setResolvido] = useState(false);
    const [horaInicial, setHoraInicial] = useState('');
    const [horaFinal, setHoraFinal] = useState('');
    const [isChecked, setChecked] = useState(false);

    function formatarMensagem(){
        const fObs = obs != ''? 'Observação: '+obs: obs;
        const fSolicitante = solicitante != '' ? 'Solicitante: '+solicitante+'\n\n' : solicitante;
        const fResolvido = resolvido == true ? 'Sim (X)' : 'Não (X)';
        const msg = 'Chamado #'+
                    'Local do serviço: '+secretaria+' \n'+
                    'Nome do solicitante: '+fSolicitante+' \n'+
                    'Técnico: '+tecnico+' \n\n'+

                    'Problema: '+problema+' \n\n'+
                    '*Preenchido pelo técnico*'+'\n'+

                    '*Horário inicial do suporte: '+horaInicial+' \n\n'+  //incluir
                    '*Horário final do suporte: '+horaFinal+' \n\n'+    //incluir

                    '*Resolução do suporte: '+solucao+' \n\n'+
                    
                    'Resolvido: '+fResolvido+' \n\n' //incluir
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
              <View style={{ marginTop:40}}>
                    <View style={styles.cabecalho}>
                     <Text style={styles.cabecalhoTXT}>Registrar chamado</Text>
                    </View>

                    <View style={[styles.corpo,{marginTop:50}]}>
                       <TextInput 
                            style={styles.input}
                            placeholder='Técnico:'
                            onChangeText={setTecnico}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder='Solicitante:'
                            onChangeText={setSolicitante}
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
                            <View style={{flexDirection:'row', width:'82%', justifyContent:'space-between'}}>
                                <TextInput 
                                    style={[styles.input,{width:'49%'}]}
                                    placeholder='Hora Inicial:'
                                    onChangeText={setHoraInicial}
                                />
                                <TextInput 
                                    style={[styles.input,{width:'49%'}]}
                                    placeholder='Hora Final:'
                                    onChangeText={setHoraFinal}
                                />
                            </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#fff', fontSize:18}}>Resolvido?</Text>
                            <Text style={{color:'#fff'}} >Sim</Text>
                            <Checkbox style={{}} value={resolvido} onValueChange={setResolvido} />
                            <Text style={{color:'#fff'}} >Não</Text>
                            <Checkbox style={{}} value={resolvido} onValueChange={setResolvido} />

                           

                        </View>

                        <TextInput 
                            style={[styles.input,styles.inputMultiline,{height:55}]}
                            placeholder='OBS(opcional):'
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