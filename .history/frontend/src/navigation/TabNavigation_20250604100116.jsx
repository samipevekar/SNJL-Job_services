import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // You can change to FontAwesome, MaterialIcons, etc.

import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import colors from '../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/slice/authSlice';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(()=>{
    di
  })

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grayDark,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
