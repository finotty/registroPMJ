import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';

type props ={
  data : any;
  onPress : () => void;
}
export const Tabela = ({onPress, data }:props) => {
  return (
    <View style={styles.tabela}>
      <TouchableOpacity style={styles.tabelaBTN} onPress={onPress}>
       <Text style={[styles.tabelaTXT,{fontSize:16}]}>{data.secretaria}</Text>
       <Text style={styles.tabelaTXT}>{data.when}</Text>
      </TouchableOpacity>
    </View>
  );
};
