import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary, // iOS blue
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Shops':
              iconName = focused ? 'storefront' : 'storefront-outline';
              break;
            case 'Accouting':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'Record Sale':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {user && (user?.role === 'manager' || user?.role === 'super_user') && <Tab.Screen name="Shops" component={Shop} />}
      {user && (user?.role === 'super_user' || user?.role === 'manager') && <Tab.Screen name="Accouting" component={AccoutingPage} />}
      {user && user?.role === 'user' && <Tab.Screen name="Record Sale" component={RecordSalePage} />}
    </Tab.Navigator>
  );
}
