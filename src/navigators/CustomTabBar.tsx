import React, {useEffect, useState} from 'react';
import {StyleSheet, Keyboard} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {COLORS} from '@values';
import {ms} from '@values/platform';
import {Touchable, Text, VectorIcons} from '@components/uikit';

interface Props extends BottomTabBarProps {}

const BOTTOM_MENU_HEIGHT = ms(52);

const CustomTabBar: React.FC<Props> = ({state, descriptors, navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const fadeIn = {
    from: {
      height: 0,
      opacity: 0,
    },
    to: {
      height: BOTTOM_MENU_HEIGHT,
      opacity: 1,
    },
  };

  const fadeOut = {
    from: {
      height: BOTTOM_MENU_HEIGHT,
      opacity: 1,
    },
    to: {
      height: 0,
      opacity: 0,
    },
  };

  const CURRENT_ROUTES = {
    ...state.routes,
    icons: [
      {
        index: 0,
        icon: (
          <VectorIcons
            size={30}
            name="home"
            provider="Foundation"
            color={COLORS.primaryBlue}
          />
        ),
        inactiveIcon: (
          <VectorIcons
            size={30}
            name="home"
            provider="Foundation"
            color={COLORS.neutral300}
          />
        ),
      },
      {
        index: 1,
        icon: (
          <VectorIcons
            size={30}
            name="monetization-on"
            provider="MaterialIcons"
            color={COLORS.primaryBlue}
          />
        ),
        inactiveIcon: (
          <VectorIcons
            size={30}
            name="monetization-on"
            provider="MaterialIcons"
            color={COLORS.neutral300}
          />
        ),
      },
      {
        index: 2,
        icon: (
          <VectorIcons
            size={30}
            name="directions-car"
            provider="MaterialIcons"
            color={COLORS.primaryBlue}
          />
        ),
        inactiveIcon: (
          <VectorIcons
            size={30}
            name="directions-car"
            provider="MaterialIcons"
            color={COLORS.neutral300}
          />
        ),
      },
      {
        index: 3,
        icon: (
          <VectorIcons
            size={30}
            name="menu"
            provider="MaterialIcons"
            color={COLORS.primaryBlue}
          />
        ),
        inactiveIcon: (
          <VectorIcons
            size={30}
            name="menu"
            provider="MaterialIcons"
            color={COLORS.neutral300}
          />
        ),
      },
    ],
  };

  return (
    <Animatable.View
      style={styles.container}
      duration={250}
      animation={isKeyboardVisible ? fadeOut : fadeIn}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          typeof options.tabBarLabel !== 'string'
            ? route.name
            : options.tabBarLabel;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        let iconComp = CURRENT_ROUTES.icons[index].icon;

        if (isFocused) {
          iconComp = CURRENT_ROUTES.icons[index].icon;
        } else {
          iconComp = CURRENT_ROUTES.icons[index].inactiveIcon;
        }

        return (
          <Touchable
            key={index.toString()}
            style={styles.tabBar}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            {iconComp}
            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? '#1d3dae' : COLORS.neutral300,
                },
              ]}>
              {label}
            </Text>
          </Touchable>
        );
      })}
    </Animatable.View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral25,
    paddingTop: 10,
  },
  tabBar: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontWeight: '700',
    fontSize: ms(10),
    lineHeight: ms(16),
    color: 'red',
  },
  icon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },
});
