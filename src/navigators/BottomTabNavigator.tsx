import React from 'react';

import {BottomTabParamList} from 'root-stack-params';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomTabBar from './CustomTabBar';
import {HomePage, CoinPage, JobPage, MenuPage} from '@containers';

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
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'coin'}
        component={CoinPage}
        options={{
          tabBarLabel: 'Coin',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'job'}
        component={JobPage}
        options={{
          tabBarLabel: 'Job',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'menu'}
        component={MenuPage}
        options={{
          tabBarLabel: 'Menu',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
