import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './views/MainScreen';
import ExtraScoreScreen from './views/ExtraScoreScreen';
import ResultScreen from './views/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <MajorPicker/>
<<<<<<< HEAD
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainScreen"
          component={MainScreen}
        />
        <Stack.Screen name="ExtraScoreScreen"
          component={ExtraScoreScreen}
        />
        <Stack.Screen name="ResultScreen"
          component={ResultScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
=======
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainScreen"
            component={MainScreen}
          />
          <Stack.Screen name="ExtraScoreScreen"
            component={ExtraScoreScreen}
          />
          <Stack.Screen name="ResultScreen"
            component={ResultScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
>>>>>>> 2f0c3a0462fe1bc041a4c41bdd2251dd4869524f
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',


    width: '100%'

    //backgroundColor: 'red'
  },
});
