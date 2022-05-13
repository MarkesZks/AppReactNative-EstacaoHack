import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet,TouchableOpacity,Alert } from 'react-native'

import { Colors, Metrics, Fonts } from '../values'

import { MyButton } from '../components'

// icons
import { MaterialIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage'

export default props => {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [continente, setContinente] = useState('')
  
  // console.log(props.route.params.email)

  const emailCadastro = props.route.params.email

  useEffect( () => carregarDados() )

  async function carregarDados(){
    try{
      const cadastro = await AsyncStorage.getItem(emailCadastro)

      const Usuario = JSON.parse(cadastro)

      setNome(`${Usuario.nome} ${Usuario.sobrenome}`)
      setEmail(Usuario.email)
      setContinente(Usuario.continente)

    }catch(erro){
      console.log(erro)
    }
  }

function confirmExit(){
  Alert.alert('Sair','Deseja realmente sair ?',
   [
     {
       text:'Sim',
       onPress(){
         props.navigation.reset(
           {
             index:0,
             routes: [{name:'LoginScreen'} ]
           }
         )
       }

     },
     {
       text:'Não',
       

     }
   ]
   )
}

  return(
    <View style={ Estilo.container }> 

      <Text style={ Estilo.textTitle }> 
        Seja Bem Vindo(a)
      </Text>

      <View style={ Estilo.containerIconText }> 
        <MaterialIcons name="perm-identity" 
                       size={24} 
                       color={ Colors.white } 
        />
        <Text style={ Estilo.text }> 
          { nome }
        </Text>
      </View>

      <View style={ Estilo.containerIconText }> 
        <MaterialIcons name="mail-outline" 
                       size={24} 
                       color={ Colors.white } 
        />
        <Text style={ Estilo.text }> 
          { email }
        </Text>
      </View>

      <View style={ Estilo.containerIconText }> 
        <MaterialIcons name="language" 
                       size={24} 
                       color={ Colors.white } 
        />
        <Text style={ Estilo.text }> 
          { continente }
        </Text>
      </View>

    
      <MyButton title="Site Cel.Lep" 
                onPress={ () => props.navigation.navigate('WebScreen')}
                style={ Estilo.formItem
                 }
      />
     

      <MyButton title="Sair" 
                style={ Estilo.formItem }
                onPress={confirmExit}
      />
     
    </View>
  )
}

const Estilo = StyleSheet.create(
  {
    container:{
      backgroundColor: Colors.background,
      flexGrow: 1,
      justifyContent: 'center',
      padding: Metrics.padding.base
    },
    textTitle: {
      fontSize: Fonts.title,
      color: Colors.white,
      marginBottom: Metrics.margin.base
    },
    containerIconText: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Metrics.margin.base
    },
    text: {
      color: Colors.white,
      fontSize: Fonts.base,
      marginLeft: Metrics.margin.small
    },
    formItem: {
      marginBottom: Metrics.margin.base
    }
  }
)