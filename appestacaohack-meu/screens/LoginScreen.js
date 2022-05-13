import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import { Colors, Metrics } from '../values'

// Components
import { MyTextInput, MyPasswordInput, MyButton } from '../components'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default props => {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function fazerLogin(){
    // console.log('clicou')

    // consistecias
    if(email == ''){
      alert('Preencha o E-mail')
      return
    } else if(senha == ''){
      alert('Preencha a senha')
      return
    }

    try{
      // recuperar o cadastro do usuário
      const cadastro = await AsyncStorage.getItem(email.toLowerCase())

      // converte JSON
      const Usuario = JSON.parse(cadastro)

      if(Usuario == null){
        alert('Usuário não localizado')
      } else if( senha == Usuario.senha ){
         props.navigation.reset(
            {
              index: 0,
              routes: [ {name: 'PerfilScreen', params: { email: email }} ]
            }
         )
      } else {
        alert('Usuário ou senha inválidos!')
      }
    }catch(erro){
      console.log(erro)
    }

  }

  return(
    <View style={ Estilo.container }> 

      <View style={ Estilo.containerLogin }> 
        <View style={ Estilo.containerLogoCellep}> 
          <Image source={ require('../assets/logo_cellep.png') } />        
        </View>

        <MyTextInput placeholder="E-mail"
                     keyboardType="email-address" 
                     style={ Estilo.formItem }   
                     value={ email }    
                     onChangeText={ char => setEmail(char) }    
        />

        <MyPasswordInput placeholder="Senha" 
                         keyboardType="numeric"
                         style={ Estilo.formItem }
                         value={ senha }
                         onChangeText={ char => setSenha(char) }
        />

        <MyButton title='Entrar' 
                  style={ Estilo.formItem }
                  onPress={ fazerLogin }
        />

        <View style={ Estilo.containerCadastro }> 
          <Text style={ Estilo.cadastroText}> 
            Não Tem cadastro?
          </Text>
          <TouchableOpacity onPress={ () => props.navigation.navigate('CadastroScreen') }> 
            <Text style={ Estilo.cadastroButton}> 
              Clique Aqui
            </Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={ Estilo.containerLogoHack }> 
        <Image style={ Estilo.logoEH}
            source={ require('../assets/logo_estacao_hack.png')} 
        />
      </View>
     
    </View>
  )
}

const Estilo = StyleSheet.create(
  {
    container: {
      backgroundColor: Colors.background,
      flexGrow: 1,
      padding: Metrics.padding.base
    },
    containerLogoCellep: {
      alignItems: 'center',
      marginBottom: Metrics.margin.base
    },
    containerLogin: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    formItem: {
      marginBottom: Metrics.margin.base
    },
    containerCadastro: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    cadastroText: {
      color: Colors.white,
      paddingRight: Metrics.padding.small
    },
    cadastroButton: {
      color: Colors.primary,
      fontWeight: 'bold'
    },
    logoEH: {
      width: 100,
      height: 100,
      resizeMode: 'contain'
    },
    containerLogoHack: {
      alignItems: 'flex-end'
    }
  }
)