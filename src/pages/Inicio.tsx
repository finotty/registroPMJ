import React,{useState, useEffect} from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { styles } from '../../styles';
import { Botao } from '../components/Botao';
import { Tabela } from '../components/Tabela';
import { useNavigation } from '@react-navigation/native';
import app from '../conexaoFirebase/FireBD';
import { getFirestore, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { dateFormat } from '../utils/firestoreDateFormat';

type OrderProps ={
  id: string;
  secretaria : string;
  when: any;
  problema:string;
  solucao:string;

}
export function Inicio() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState <OrderProps[]>([]);
  const db = getFirestore(app);
  
  function concatenar(objeto:any) {
    const { secretaria, problema, solucao, dataFechamento } = objeto;
    const resultado = `Secretaria: ${secretaria} \n\nProblema: ${problema} \n\nSolução: ${solucao}\n\nEncerrado em: \n${dataFechamento}`;
    return resultado;
  }
  
  function mostraChamado(when:any){
    const filtroChamados = orders.filter(item => item.when === when);
    const ordersFormatado = filtroChamados.map(item => {
     return { 
      secretaria: item.secretaria,
      problema: item.problema,
      solucao: item.solucao,
      dataFechamento: item.when
    }
    })
 
    Alert.alert('Informações sobre o chamado',concatenar(ordersFormatado[0]))
    
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
         const {secretaria,problema,solucao,created_at} = doc.data();
           order.push({
             id: doc.id,
             secretaria,
             problema,
             solucao,
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
             title='Registrar chamado' 
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
    </View>
  );
}