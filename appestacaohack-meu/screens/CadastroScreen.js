import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

import { Metrics, Colors } from '../values'

import { MyButton, MyPasswordInput, MyTextInput } from '../components'

// Icons
import { MaterialIcons } from '@expo/vector-icons';

// Caixa de seleção com Picker
import { Picker } from '@react-native-picker/picker'

// Import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

export default props => {

  // variáveis de Estado
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [email, setEmail] = useState('')
  const [continente, setContinente] = useState('')
  const [senha, setSenha] = useState('')

  const listaContinentes = [
    'América do Norte',
    'América central',
    'América do Sul',
    'Europa',
    'Ásia',
    'África',
    'Oceania',
    'Antártida'
  ]

  async function cadastrar(){
    // consistencias
    if( nome == '' || sobrenome == '' || email == '' || senha == '' || continente == ''){
      alert('Preencha todos os campos')
      return
    }

    // Estrutura dos dados
    const Usuario = {
      nome: nome,
      sobrenome: sobrenome,
      email: email.toLowerCase(),
      senha: senha,
      continente: continente
    }

    try{
      const dados = await JSON.stringify(Usuario)

      // Salvando um arquivo com o nome do arquivo como sendo o email do usuário
      await AsyncStorage.setItem(email, dados)

      props.navigation.reset(
        {
          index: 0,
          routes: [ {name: 'PerfilScreen', params: { email: email } } ]
        }
      )
    } catch(erro){
      console.log(erro)
    }

  }

  return(
    <ScrollView style={ Estilo.container }> 
      <View style={ Estilo.containerIcon }> 
        <MaterialIcons name="person-add" 
                      size={100} 
                      color={ Colors.white } 
        />      
      </View>

      <MyTextInput style={ Estilo.formItem } 
                   placeholder='Nome'
                   value={ nome }
                   onChangeText={ char => setNome(char) }
      />

      <MyTextInput style={ Estilo.formItem }
                   placeholder='Sobrenome'
                   value={ sobrenome }
                   onChangeText={ char => setSobrenome(char) }
      />

      <MyTextInput style={ Estilo.formItem }
                   placeholder='E-mail'
                   keyboardType='email-address'
                   value={ email }
                   onChangeText={ char => setEmail(char) }
      />
      
      <View style={ [Estilo.containerPicker, Estilo.formItem] }> 

        <Picker style={ Estilo.picker}
                selectedValue={ continente }
                onValueChange={ (value, index) => setContinente(value) }
        > 
          <Picker.Item value='' label='Continente' />
          {
            listaContinentes.map( (value, index) => (
                <Picker.Item value={value} label={value} />
              ) 
            )
          }
        </Picker>
      
      </View>

      <MyPasswordInput style={ Estilo.formItem }
                       placeholder='Senha'
                       keyboardType='numeric'
                       value={ senha }
                       onChangeText={ char => setSenha(char) }
      />

      <MyButton title='Cadastrar '
                onPress={ cadastrar }
      />




    </ScrollView>
  )
}

const Estilo = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      padding: Metrics.padding.base
    },
    containerIcon: {
      alignItems: 'center'
    },
    formItem: {
      marginBottom: Metrics.margin.base
    },
    containerPicker: {
      borderWidth: 1,
      borderRadius: Metrics.radius.base,
      backgroundColor: Colors.white,
      justifyContent: 'center'
    },
    picker: {
      paddingVertical: Metrics.padding.small,
      paddingHorizontal: Metrics.padding.picker,
      borderWidth: 0,
      backgroundColor: Colors.white
    }
  }
)