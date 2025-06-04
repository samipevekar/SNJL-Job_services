import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName='CheckAuth'>
      <Stack.Screen name='Home' component={Home}  />
    </Stack.Navigator>
  );
}