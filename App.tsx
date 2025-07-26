// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import { Provider } from 'react-redux';
// import LoginScreen from './src/screens/LoginScreen';
// import store from './src/store/slices/store';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen name="Login" component={LoginScreen} />
//           {/* Add more screens */}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }

// App.tsx

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

import MainNavigator from './src/MainNavigator'; // where your screens are declared
import store from './src/store/slices/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer> {/* ✅ only one instance here */}
        <MainNavigator />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
