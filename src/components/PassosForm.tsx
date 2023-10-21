import React, { useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Passo {
  numero: number;
  descricao: string;
}

interface PassosFormProps {
  onSubmit: (passos: Passo[]) => void;
}

const PassosForm: React.FC<PassosFormProps> = ({ onSubmit }) => {
  const [passos, setPassos] = useState<Passo[]>([{ numero: 1, descricao: '' }]);

  const addPasso = () => {
    const newPasso: Passo = { numero: passos.length + 1, descricao: '' };
    setPassos([...passos, newPasso]);

  };

  const handleInputChange = (index: number, value: string) => {
    const updatedPassos = passos.map((passo, i) =>
      i === index ? { ...passo, descricao: value } : passo
    );
    setPassos(updatedPassos);
    handleSubmit();
  };

   function handleSubmit () {
    onSubmit(passos);
    
  };

  return (
    <View style={{alignItems:'center'}}>
      {passos.map((passo, index) => (
        <View key={index} style={styles.passoContainer}>
          {/*<Text style={{color:'#fff'}}>Passo {passo.numero}:</Text>*/}
          <TextInput
            style={styles.input}
            placeholder={`Passo ${passo.numero}`}
            value={passo.descricao}
            onChangeText={(text) => handleInputChange(index, text)}
            multiline
          />
          <TouchableOpacity style={{
            backgroundColor:'#0B2873',
            width:40,
            minHeight:40,
           // borderTopRightRadius:10,
           // borderBottomRightRadius:10,
           borderRadius:10,
            justifyContent:'center',
            alignItems:'center',
            marginTop:-8
          }}>
            <MaterialCommunityIcons name="file-image-plus-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={addPasso}
       style={{
        width:100,
        height:60,
        backgroundColor:'#0B2873',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#fff'
       }}
      >
        <Text style={{fontSize:18, color:'#fff', fontWeight:'bold'}}>+ Passos</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  passoContainer: {
    marginBottom: 10,
    flexDirection:'row'
  },
  input: {
    backgroundColor:'#5192AE',
        width:260,
        //borderRadius:10,
        minHeight:40,
        fontSize:16,
        paddingLeft:8,
        marginBottom:10,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10
        
    
  },
});

export default PassosForm;
