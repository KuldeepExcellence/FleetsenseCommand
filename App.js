import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect,useContext } from 'react'
import Navigation from './Src/Screens/Navigation'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from "./Src/Components/AuthContext";
import { AuthStack } from './Src/Screens/Navigation';

function AppNav() {
  const { userToken } = useContext(AuthContext)
  return (
    <NavigationContainer>
      {userToken !== null ? <Navigation></Navigation> : <AuthStack></AuthStack>}
    </NavigationContainer>
  )
}


const App = () => {
  return (
    <AuthProvider>
    <AppNav></AppNav>
  </AuthProvider>

  )
}

export default App

const styles = StyleSheet.create({})