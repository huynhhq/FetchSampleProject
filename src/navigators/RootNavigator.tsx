import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {RootStackParamList} from 'root-stack-params';
import BottomTabNavigator from './BottomTabNavigator';
import {setTopLevelNavigator} from '@helpers/navigation';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigatorRef => {
          setTopLevelNavigator(navigatorRef);
        }}
        theme={navTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
          }}
          initialRouteName={'bottomTabs'}>
          <RootStack.Screen
            name="bottomTabs"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
