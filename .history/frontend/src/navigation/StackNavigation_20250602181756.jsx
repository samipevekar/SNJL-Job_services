import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={AuthCheck}/>
    </Stack.Navigator>
  );
}