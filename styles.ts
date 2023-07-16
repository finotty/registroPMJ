import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:15,
        backgroundColor:'#09090A'
    },
    cabecalho:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    cabecalhoTXT:{
        color:'#fff',
        fontSize:32,
        fontWeight:'bold'
    },
    corpo:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:-20
    },
    corpoBTN:{
        backgroundColor:'#0B2873',
        width:300,
        height:70,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        margin:10
    },
    corpoTXT:{
        color:'#fff',
        fontSize: 18,
        fontWeight:'bold'
    },
    tabela:{    
        padding:5,
        borderBottomWidth:1
    },
    tabelaTXT:{
       fontSize:14,
    },
    tabelaBTN:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    flatlist:{
        backgroundColor:"#5192AE",
        borderRadius:10,
        width:'82%'   
    },
    input:{
        backgroundColor:'#5192AE',
        width:300,
        borderRadius:10,
        height:40,
        fontSize:16,
        paddingLeft:8,
        marginBottom:10
    },
    inputMultiline:{
        height:100, 
        textAlignVertical:'top',
        paddingTop:2, 
        textAlign:'justify'
    },
    rodape:{
        flex:3,
        marginBottom:45,
        alignItems:'center',
        justifyContent:'center',
        

    }
});
