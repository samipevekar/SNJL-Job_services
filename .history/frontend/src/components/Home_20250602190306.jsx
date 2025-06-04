import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
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