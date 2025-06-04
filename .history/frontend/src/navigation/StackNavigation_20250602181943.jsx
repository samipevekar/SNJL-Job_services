import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' in='CheckAuth' component={Home}  />
    </Stack.Navigator>
  );
}