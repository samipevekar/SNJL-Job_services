import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { clearUser } from '../redux/slice/authSlice'

const Home = ({navigation}) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        
        dispatch(clearUser())
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