import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Navigations
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

const Stack  = createStackNavigator();

const Drawer = createDrawerNavigator();

//Páginas
import Login from './pages/Login';
import Home from './pages/Home';

const Logout = ( {navigation} ) => {
  return(
    <View>
      <Text>Deseja realmente sair da aplicação?</Text>
      <Button title='Sair' onPress={() => {
        AsyncStorage.removeItem('@jwt');
        navigation.push('Login');
      }}></Button>
    </View>
  )
}

const Autenticado = () => {
  return(
 
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
 
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Autenticado" component={Autenticado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
