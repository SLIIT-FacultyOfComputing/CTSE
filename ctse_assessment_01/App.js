import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* import screen for navigation */

import Homepage from './screens/Homepage';
import MedicineManagementHome from './screens/MedicineHome';

/* create stack for navigation */
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name='Home' 
          component={Homepage} 
          options={{title: 'Welcome'}}/>
      <Stack.Screen 
          name='Medicine' 
          component={MedicineManagementHome} 
          options={{title: 'Medicine Management'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}