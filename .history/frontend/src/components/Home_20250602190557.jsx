import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, getMeAsync, selectUser } from '../redux/slice/authSlice'
import { removeToken } from '../storage/AuthStorage'

const Home = ({navigation}) => {

    const dispatch = useDispatch()

    const user = useSelector(selectUser)

    const handleLogout = async () => {
        await removeToken()
        dispatch(clearUser())
        navigation.navigate('Login')
    }

    useEffect(()=>{
        dispatch(getMeAsync())
    },[])
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