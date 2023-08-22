import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import Header from '../Components/Header/Header'

const Vehicles = ({route}) => {
  const{data}=route.params
  return (
    <View style={styles.container}>
        <Header data={data}/>
    </View>
  )
}

export default Vehicles

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',
        padding:10
    }
})