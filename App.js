import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import ShoppingScreen from './src/screens/ShoppingScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen 
            name="Shopping" 
            component={ShoppingScreen} 
            options={{ title: 'Shopping', headerTitleAlign: 'center' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
