import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import AuthCheck from '../helpers/AuthCheck';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName='AuthCheck' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AuthCheck' component={AuthCheck}   />
      <Stack.Screen name='Home' component={Home}   />
      <Stack.Screen name='Login' component={Home}   />
      <Stack.Screen name='Home' component={Home}   />
    </Stack.Navigator>
  );
}