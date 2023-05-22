import React, {
  ComponentType,
  memo,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import {
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  TextStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Spinner, {SpinnerType} from 'react-native-spinkit';
import {View} from 'react-native-animatable';
import {destructPropsToStyle} from '@helpers/uikitHelper';
import {
  IModifiersSpacing,
  IModifiersStyling,
  IModifiersText,
  IModifiersLayout,
  IModifiersTest,
} from 'custom-ui-kit';

import {IconProps} from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {isUndefined} from 'lodash';
import {COLORS} from '@values';
import Text from './text';

export interface Props
  extends TouchableOpacityProps,
    IModifiersSpacing,
    IModifiersStyling,
    IModifiersText,
    IModifiersLayout,
    IModifiersTest {
  textStyle?: StyleProp<TextStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  title?: string;
  loading?: boolean;
  indicatorProvider?: SpinnerType;
  indicatorColor?: string;
  fontWeight?: string;
  indicatorSize?: 'large' | 'small' | number;
  disabledBg?: string;
  disabledColor?: string;
  iconProps?: IconProps;
  rightIconProps?: IconProps;
  isSolid?: boolean;
}

const duration = 150;

const FuncComponent = memo((props: PropsWithChildren<Props>) => {
  const {
    textStyle,
    style,
    title,
    loading,
    indicatorColor,
    indicatorProvider,
    indicatorSize,
    disabledBg,
    disabledColor,
    onPress,
    disabled,
    iconProps,
    rightIconProps,
    isSolid = false,
    iconContainerStyle,
    ...rest
  } = props;

  const {_props, _styles} = useMemo(() => destructPropsToStyle(rest), [rest]);

  const _onPress = useCallback(
    (e: GestureResponderEvent) => {
      !loading && onPress?.(e);
    },
    [loading, onPress],
  );

  const renderIndicator = useMemo(() => {
    if (typeof indicatorSize === 'string') {
      return <ActivityIndicator size={indicatorSize} color={indicatorColor} />;
    }

    return (
      <Spinner
        size={indicatorSize}
        color={indicatorColor}
        type={indicatorProvider}
      />
    );
  }, [indicatorColor, indicatorProvider, indicatorSize]);

  const containerStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
    _styles.layoutStyle,
    _styles.spacingStyle,
    styles.wrapper,
    _styles.stylingStyle,
    style,
  ]);
  const _textStyle: StyleProp<TextStyle> = StyleSheet.flatten([
    _styles.textStyle,
    textStyle,
  ]);

  const wrapperLoading = loading ? undefined : styles.transparent;
  const titleOpacity = !loading ? undefined : styles.transparent;

  if (disabled) {
    containerStyle.backgroundColor = disabledBg;
    _textStyle.color = disabledColor;
  }

  return (
    <TouchableOpacity {..._props} onPress={_onPress} disabled={disabled}>
      <View transition="backgroundColor" style={containerStyle}>
        {typeof loading === 'boolean' ? (
          <View
            duration={duration}
            transition="opacity"
            useNativeDriver
            style={[StyleSheet.absoluteFill, styles.absolute, wrapperLoading]}>
            {renderIndicator}
          </View>
        ) : null}
        {iconProps ? (
          <View style={[iconContainerStyle, {marginRight: title ? 4 : 0}]}>
            <Icon color="white" {...iconProps} solid={isSolid} />
          </View>
        ) : null}
        {!isUndefined(title) ? (
          <View
            transition={'opacity'}
            duration={duration}
            useNativeDriver
            style={[titleOpacity, styles.absolute, styles.textW]}>
            <Text style={_textStyle}>{title}</Text>
          </View>
        ) : null}
        {rightIconProps ? (
          <Icon color="white" {...rightIconProps} solid={isSolid} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
});

(FuncComponent as ComponentType<Props>).defaultProps = {
  indicatorSize: 'small',
  indicatorProvider: 'ArcAlt',
  br: 8,
  disabledBg: COLORS.primaryBlur,
  disabledColor: COLORS.white,
  indicatorColor: COLORS.white,
  fontSize: 14,
  fontWeight: '700',
  bg: COLORS.neutral900,
  bold: true,
  color: COLORS.white,
  paddingV: 14,
};

export default FuncComponent;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: 8,
    // paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
  },
  absolute: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  textW: {
    zIndex: 0,
  },
  transparent: {
    opacity: 0,
  },
});
