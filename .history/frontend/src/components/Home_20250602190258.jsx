import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text onPress={()=>navigation.navigate('Signup')}>Logout</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})