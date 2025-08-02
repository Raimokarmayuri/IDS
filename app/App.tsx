// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Import all screens
import Dashboard from '../src/screens/Dashboard';
import LoginScreen from '../src/screens/LoginScreen';
import PropertyForm from '../src/screens/PropertyForm';
import PropertyViewDetails from '../src/screens/PropertyViewDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="PropertyDetails" component={PropertyViewDetails} />
        <Stack.Screen name="PropertyForm" component={PropertyForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
