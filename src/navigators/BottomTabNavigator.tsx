import React from 'react';

import {BottomTabParamList} from 'root-stack-params';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomTabBar from './CustomTabBar';
import Home from '@containers/Home';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'home'}
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={'home'}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'coin'}
        component={Home}
        options={{
          tabBarLabel: 'Coin',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'job'}
        component={Home}
        options={{
          tabBarLabel: 'Job',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'menu'}
        component={Home}
        options={{
          tabBarLabel: 'Menu',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
