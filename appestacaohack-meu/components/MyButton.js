import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Metrics, Colors, Fonts } from '../values'
 
export default props => {
  const { style, ...rest } = props
  return(
    <TouchableOpacity style={ [Estilo.button, style] }
          { ...rest }
    > 
      <Text style={ Estilo.text }> 
        { props.title }
      </Text>
    </TouchableOpacity>
  )
}

const Estilo = StyleSheet.create(
  {
    button: {
      height: 42,
      borderRadius: Metrics.radius.base,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: Fonts.buttonText,
      color: Colors.white,
      textTransform: 'uppercase'
    }
  }
)