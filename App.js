import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AddContactScreen from './screens/AddContactScreen';
import ViewContactScreen from './screens/ViewContactsScreen';
import ManageContactScreen from './screens/ManageContactScreen';

import useContactTaskManager from './hooks/useContactTaskManager';
import { CHECK_READY_FOR_DELETION } from './utils/Configuration'

useContactTaskManager.defineATask(CHECK_READY_FOR_DELETION);
const Drawer = createDrawerNavigator();

export default function App() {
  const { checkStatusAsync, toggleFetchTask } = useContactTaskManager
    .useTaskManagerFunctions(CHECK_READY_FOR_DELETION);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='View contacts'>
        <Drawer.Screen name="View contacts" component={ViewContactScreen} />
        <Drawer.Screen name="Add a contact" component={AddContactScreen} />
        <Drawer.Screen name="Manage contacts" component={ManageContactScreen} />
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
