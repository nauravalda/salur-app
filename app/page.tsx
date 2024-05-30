import { View,Text } from 'lucide-react-native';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Refrigerator,Compass,ReceiptText,UserCircle } from 'lucide-react-native';

import HomeScreen from './home';
import ProfileScreen from './profile';
import RefrigeratorScreen from './refrigerator';
import PurchaseScreen from './purchase';

const homeName = "Home";
const profileName = "Akun";
const refrigeratorName = "Kulkasku";
const purchaseName = "Pesanan Saya";

const Tab = createBottomTabNavigator();

export default function Screen() {
    return (
      <Tab.Navigator initialRouteName={homeName}>
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Compass size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={refrigeratorName}
          component={RefrigeratorScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Refrigerator size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={profileName}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <UserCircle size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={purchaseName}
          component={PurchaseScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <ReceiptText size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
}