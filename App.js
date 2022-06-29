import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as Contacts from 'expo-contacts';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AddContactScreen from './screens/AddContactScreen';
import ViewContactScreen from './screens/ViewContactsScreen';
import UpdateContactScreen from './screens/UpdateContactScreen';

/*
    <View style={styles.container}>
      <AddContactScreen />
    </View> 
*/

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='View contacts'>
        <Drawer.Screen name="View contacts" component={ViewContactScreen} />
        <Drawer.Screen name="Add a contact" component={AddContactScreen} />
        <Drawer.Screen name="Edit or delete a contact" component={UpdateContactScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
  },
});
