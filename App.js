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
import { ThemeProvider } from './theme/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ActivitiesStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Activities Home" component={Activities} />
      <Stack.Screen name="AddActivity" component={AddActivity} />
    </Stack.Navigator>
  );
}

function DietStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="DietHome" component={Diet} />
      <Stack.Screen name="AddDiet" component={AddDiet} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Settings Home" component={Settings} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
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
        component={SettingsStack} 
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;