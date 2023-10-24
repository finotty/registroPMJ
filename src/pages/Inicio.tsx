import React,{useState, useEffect} from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { styles } from '../../styles';
import { Botao } from '../components/Botao';
import { Tabela } from '../components/Tabela';
import { useNavigation } from '@react-navigation/native';
import bank from '../conexaoFirebase/FireBD';
import { getFirestore, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { dateFormat } from '../utils/firestoreDateFormat';

//import ModalS from '../components/ModalS';
import ModalInicio from '../components/ModalInicio';


type OrderProps ={
  id: string;
  secretaria : string;
  when: any;
  problema:string;
  solucao:string;
  tecnico:string;

}
export function Inicio() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState <OrderProps[]>([]);
  const db = getFirestore(bank);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState({});
  
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  function concatenar(objeto:any) {
    const { secretaria, problema, solucao, tecnico, dataFechamento } = objeto;
    const resultado = `Secretaria: ${secretaria} \n\nProblema: ${problema} \n\nSolução: ${solucao} \n\nTécnico: ${tecnico} \n\nEncerrado em: \n${dataFechamento}`;
    return resultado;
  }
  
  function mostraChamado(when:any){
    const filtroChamados = orders.filter(item => item.when === when);
    const ordersFormatado = filtroChamados.map(item => {
     return { 
      secretaria: item.secretaria,
      problema: item.problema,
      solucao: item.solucao,
      tecnico: item.tecnico,
      dataFechamento: item.when
    }})
    setDataModal(ordersFormatado[0]);
    setModalVisible(true);
    //Alert.alert('Informações sobre o chamado',concatenar(ordersFormatado[0]))
    
  }

  useEffect(() => {
  
    const buscaDados =  async () => {  
     /*
       Esta  função  lê dados  de uma coleção no Firebase em tempo real, 
       ordena pela data e atualiza o estado da aplicação com as informações 
       relevantes. 
      */ 
     const q = query(collection(db,'orders'),orderBy("created_at","desc"));
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
     const order: OrderProps[] = [];
       
       querySnapshot.forEach((doc) => {
         const {secretaria,problema,solucao,tecnico,created_at} = doc.data();
           order.push({
             id: doc.id,
             secretaria,
             problema,
             solucao,
             tecnico,
             when:dateFormat(created_at)});
       });

       setOrders(order);
            
     });
       
       return unsubscribe;    
   }
        
     buscaDados();
    
   },[])
  return (
    <View style={styles.container}>
       <View style={styles.cabecalho}>
           <Text style={styles.cabecalhoTXT}>ChamadosPMJ</Text>
       </View>

       <View style={styles.corpo}>
        <Botao
         style={{}}
         disabled={false}
         title='Lista de soluções'
         onPress={() => navigation.navigate('listaSolucao')}
        />
           <Botao
             style={{}}
             disabled={false} 
             title='Finalizar chamado' 
             onPress={() => navigation.navigate('registro')}/>

       </View>

       <View style={styles.rodape}>
          <FlatList
           style={styles.flatlist}
           data={orders}
           keyExtractor={item => item.id}
           renderItem={
            ({item}) => <Tabela onPress={() => mostraChamado(item.when)} data={item}/>
           }
          />
       </View>
       <ModalInicio visible={modalVisible} onClose={toggleModal} data={dataModal}/>
    </View>
  );
}