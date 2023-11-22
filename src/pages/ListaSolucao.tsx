import React,{useState, useEffect} from 'react';
import { View, Text, FlatList,Alert } from 'react-native';
import { styles } from '../../styles';
import { Botao } from '../components/Botao';
import { TabelaSolucao } from '../components/TabelaSolucao';
import { useNavigation } from '@react-navigation/native';
import bank from '../conexaoFirebase/FireBD';
import { getFirestore, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { dateFormat } from '../utils/firestoreDateFormat';
import ModalS from '../components/ModalS';
import ModalDetalhes from '../components/ModalDetalhes';

type OrderProps ={
  id: string;
  when: any;
  solucao:string;
  title:string;
}
export function ListaSolucao() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState <OrderProps[]>([]);
  const db = getFirestore(bank);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetalhes, setModalDetalhes] = useState(false);
  const [dados, setDados] = useState({});
  
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const toggleModalDetalhes = () => {
    setModalDetalhes(!modalDetalhes);
  };
  
  function mostraChamado(when:any){
    const filtroChamados = orders.filter(item => item.when === when);
    const ordersFormatado = filtroChamados.map(item => {
     return { 
      solucao: item.solucao,
      title:item.title,
      dataFechamento: item.when,
      
    }})
    setDados(ordersFormatado[0]);
    setModalDetalhes(true);
  }

  useEffect(() => {
   
    const buscaDados =  async () => {  
     /*
       Esta  função  lê dados  de uma coleção no Firebase em tempo real, 
       ordena pela data e atualiza o estado da aplicação com as informações 
       relevantes. 
      */ 
     const q = query(collection(db,'solution'),orderBy("created_at","desc"));
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
     const order: OrderProps[] = [];
       
       querySnapshot.forEach((doc) => {
         const {solucao,created_at,title} = doc.data();
           order.push({
             id: doc.id,
             solucao,
             title,
             when:dateFormat(created_at)});
       });

       setOrders(order);
            
     });
       
       return unsubscribe;    }
        
     buscaDados();
    
   },[])
  return (
    <View style={styles.container}>
       <View style={styles.cabecalho}>
           <Text style={styles.cabecalhoTXT}>Instruções</Text>
       </View>

       <View style={[styles.corpo,{flex:1}]}>
          <Botao
          style={{}}
          disabled={false}
          title='Adicionar instrução'
          onPress={toggleModal}
          />
       </View>

       <View style={[styles.rodape,{flex:4}]}>
          <FlatList
           style={styles.flatlist}
           data={orders}
           keyExtractor={item => item.id}
           renderItem={
            ({item}) => <TabelaSolucao onPress={() => mostraChamado(item.when)} data={item}/>
           }
          />
       </View>
       <ModalS visible={modalVisible} onClose={toggleModal} />
       <ModalDetalhes visible={modalDetalhes}  onClose={toggleModalDetalhes} data={dados}/>
    </View>
  );
}