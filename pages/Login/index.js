import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'reactive-native';

const Login = ({navigation}) => {

const [email, setEmail] = useState ('');
const [senha, setSenha] = useState ('');

const salvarToken = async (value) => {
    try {
      await AsyncStorage.setItem('@jwt', value)
    } catch (e) {
      // saving error
    }
}

const Entrar = () => {

    const corpo ={ 
        email : email,
        senha : senha
    }
    
    fetch('http://192.168.15.22:5000/api/Account/login', {
            method: 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(corpo)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status != 404){
                alert('Login efetuado!');
                console.log(data.token);
                
                salvarToken(data.token);
                navigation.push('Autenticado');
            }else{
                alert('Dados estão incorretos! :( ');
            }
        })

    }


    return( 
        <View style={styles.container}>
            <Text>Login</Text>

            <Image
                style={styles.logo}
                source={{
                    uri: 'https://raw.githubusercontent.com/sena-code/React-Node/main/4%20-%20Trabalhando%20com%20react-bootstrap%20e%20react-router-dom/nyous-react/src/assets/img/Logo.svg',
                }}
            />

            <TextInput
      style={styles.input}
      onChangeText={text => setEmail(text)}
      value={email}
      placeholder='Digite seu email...'
    /> 

         <TextInput
      style={styles.input}
      onChangeText={text => setSenha(text)}
      value={senha}
      secureTextEntry={true}
      placeholder='Digite sua senha...'
    />

       <TouchableOpacity
        style={styles.button}
        onPress={Entrar}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
        </View>

        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input : {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginTop: 10
    },
    button:{
       backgroundColor : 'black',
       paddin: 10,
       width: '90%',
       borderRadius: 6,
       marginTop: 10,
       justifyContent : 'center'
    
    },
    buttonText : {
        color : 'white'
    },
    logo : {
        width: 200,
        height: 200,
    }

});

export default Login;