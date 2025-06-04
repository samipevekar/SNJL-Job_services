import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'

const Home = ({navigation}) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dis
        navigation.navigate('Login')
    }
  return (
    <View>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text onPress={handleLogout}>Logout</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})