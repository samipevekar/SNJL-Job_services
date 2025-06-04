import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // You can change to FontAwesome, MaterialIcons, etc.

import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import colors from '../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {getMeAsync, selectUser} from '../redux/slice/authSlice';
import AdminDashboard from '../screens/Admin/AdminDashboard';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeAsync());
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'options' : 'options-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grayDark,
      })}>
      {user?.role === 'recruiter' && (
        <Tab.Screen name="Home" component={Home} />
      )}
      {user?.role === 'admin' && (
        <Tab.Screen name="Dashboard" component={AdminDashboard} />
      )}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
