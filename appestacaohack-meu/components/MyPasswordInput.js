import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import { Metrics, Colors } from '../values'

// icons - https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';

export default props => {

  const { style, ...rest } = props

  const [escondido, setEscondido] = useState(true)

  return(
    <View style={ [Estilo.container, style] }> 

      <TextInput style={ Estilo.input } 
                { ...rest }
                secureTextEntry={ escondido }
      />

      <TouchableOpacity onPress={ () => setEscondido(!escondido) }> 
        <Ionicons name={ escondido ? "eye-off-sharp" : "eye-sharp" } 
                  size={24} 
                  color={Colors.dark} 
        />      
      </TouchableOpacity>
     
    </View>
  )
}

const Estilo = StyleSheet.create(
  {
    container: {
      height: 48,
      borderWidth: 1,
      borderRadius: Metrics.radius.base,
      paddingHorizontal: Metrics.padding.base,
      backgroundColor: Colors.white,
      flexDirection: 'row',
      alignItems: 'center'
    },
    input: {
      paddingVertical: Metrics.padding.small,
      flexGrow: 1,
      marginRight: Metrics.margin.small
    }

  }
)