import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activities from './screens/Activities';
import AddActivity from './screens/AddActivity';
import AddDiet from './screens/AddDiet';
import Diet from './screens/Diet';
import Settings from './screens/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ActivitiesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ActivitiesHome" component={Activities} />
      <Stack.Screen name="AddActivity" component={AddActivity} />
    </Stack.Navigator>
  );
}

function DietStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DietHome" component={Diet} />
      <Stack.Screen name="AddDiet" component={AddDiet} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Activities" 
        component={ActivitiesStack} 
      />
      <Tab.Screen 
        name="Diet" 
        component={DietStack} 
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;