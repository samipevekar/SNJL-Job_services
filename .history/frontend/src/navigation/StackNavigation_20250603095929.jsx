import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import AuthCheck from '../helpers/AuthCheck';
import LoginScreen from '../screens/Auth/Login';
import SignupScreen from '../screens/Auth/Signup';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName='AuthCheck' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AuthCheck' component={AuthCheck}   />
      <Stack.Screen name="Main" component={TabNavigation}  />
      <Stack.Screen name='Home' component={Home}   />
      <Stack.Screen name='Login' component={LoginScreen}   />
      <Stack.Screen name='Signup' component={SignupScreen}   />
    </Stack.Navigator>
  );
}