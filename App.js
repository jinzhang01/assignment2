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
import { FontAwesome5, MaterialIcons, Ionicons} from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ActivitiesStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: 'lightblue', 
        },
      }}
    >
      <Stack.Screen name="Activities " component={Activities} />
      <Stack.Screen name="AddActivity" component={AddActivity} options={{ title: 'Add An Activity' }}/>
    </Stack.Navigator>
  );
}

function DietStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: 'lightblue', 
        },
      }}    
    >
      <Stack.Screen name="Diet " component={Diet} />
      <Stack.Screen name="AddDiet" component={AddDiet} options={{ title: 'Add A Diet Entry' }}/>
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: 'lightblue', 
        },
      }}
    >
      <Stack.Screen name="Settings " component={Settings} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: 'lightblue' },
      }}>
      <Tab.Screen
        name="Activities"
        component={ActivitiesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="running" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Diet" 
        component={DietStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fastfood" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen  
        name="Settings" 
        component={SettingsStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer >
        <MyTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;