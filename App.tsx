import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import MainNavigation from './src/navigations/main.navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { Colors } from './src/constant/color';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from '@/navigations/auth.navigation';

const theme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
  },
};

export default function App() {

  

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
