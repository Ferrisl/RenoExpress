/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Home/Containers/home';
import Inventory from './src/Inventory/Containers/inventory';
import Record from './src/Record/Containers/record';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const styleHeader = {headerStyle:{backgroundColor: '#528E6F'}, headerTitleStyle: {color: 'white', alignSelf: 'center'}}

const App: () => Node = () => {
  //const isDarkMode = useColorScheme() === 'dark';

  /* const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }; */

  LogBox.ignoreAllLogs();
  StatusBar.setBackgroundColor('#009688') //E04E4B

  return (
    <NavigationContainer>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar barStyle={ 'light-content'} />
        <Drawer.Navigator initialRouteName="Inventory" >
          {/* <Drawer.Screen name="Home" component={Home} /> */}
          <Drawer.Screen name="Inventario" component={Inventory} />
          <Drawer.Screen name="Compra/Venta" component={Record} />
        </Drawer.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
