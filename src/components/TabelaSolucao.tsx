import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';

type props ={
  data : any;
  onPress : () => void;
}
export const TabelaSolucao = ({onPress, data }:props) => {
  return (
    <View style={styles.tabelaSolucao}>
      <TouchableOpacity style={styles.tabelaSolucaoBTN} onPress={onPress}>
       <Text style={[styles.tabelaSolucaoTXT,{fontSize:18}]}>{data.title}</Text>  
      </TouchableOpacity>
    </View>
  );
};
