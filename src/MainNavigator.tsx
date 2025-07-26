import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import PropertyForm from '../src/screens/PropertyForm';
import PropertyViewDetails from '../src/screens/PropertyViewDetails';


const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="PropertyForm" component={PropertyForm} />
    <Stack.Screen
  name="PropertyDetails"
  component={PropertyViewDetails}
  options={{ title: 'Property Details' }}
/>
  </Stack.Navigator>
);

export default MainNavigator;
