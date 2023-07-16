import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';

type BTNProps = {
  title: string;
  disabled: boolean;
  onPress: () => void;
  style:any
}

export const Botao = ({ title, onPress,disabled,style }: BTNProps) => {
  return (
    <TouchableOpacity 
     disabled={disabled}
     style={[styles.corpoBTN,style]} 
     onPress={onPress} >
        <Text style={styles.corpoTXT}>
          {title}
        </Text>
    </TouchableOpacity>
  );
};
