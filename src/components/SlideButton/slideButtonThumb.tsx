import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {SlideButtonCommonProps} from './slideButton';

const DEFAULT_WIDTH = 56;

export interface SlideButtonThumbProps extends SlideButtonCommonProps {
  gestureHandler?:
    | ((event: GestureEvent<PanGestureHandlerEventPayload>) => void)
    | undefined;
  icon?: React.ReactNode;
  thumbStyle?: StyleProp<ViewStyle>;
  animStarted?: () => void;
  animEnded?: () => void;
  isRTL: boolean;
}

const SlideButtonThumb = ({
  icon,
  gestureHandler,
  translateX,
  height,
  endReached,
  borderRadius,
  thumbStyle,
  animStarted,
  animEnded,
  isRTL,
  animation,
  animationDuration,
  dynamicResetEnabled,
  dynamicResetDelaying,
}: SlideButtonThumbProps) => {
  const opacityValue = useSharedValue(1);

  const play = () => {
    const repeatCount = dynamicResetEnabled ? -1 : 6;
    opacityValue.value = withRepeat(
      withTiming(0.4, {
        duration: animationDuration!,
        easing: Easing.inOut(Easing.ease),
      }),
      repeatCount,
      true,
      () => {
        runOnJS(animFinished)();
      },
    );
  };

  const stop = () => {
    cancelAnimation(opacityValue);
    runOnJS(animFinished)();
  };

  const animFinished = () => {
    animEnded && animEnded();
  };

  const thumbAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: endReached ? opacityValue.value : 1,
      transform: [{translateX: translateX.value}],
    };
  });

  const thumbDynamicStyle = {
    width: DEFAULT_WIDTH,
    height,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  };

  const iconContainerDynamicStyle = {
    width: DEFAULT_WIDTH,
    height,
    transform: [{scaleX: isRTL ? -1 : 1}],
  };

  React.useEffect(() => {
    if (endReached) {
      if (animation) {
        animStarted && animStarted();
        play();
      }
    }
  }, [endReached]);

  React.useEffect(() => {
    if (dynamicResetEnabled) {
      if (!dynamicResetDelaying) {
        stop();
      }
    }
  }, [dynamicResetDelaying]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        testID="ThumbContainer"
        style={[
          styles.thumbContainer,
          thumbAnimStyle,
          thumbDynamicStyle,
          thumbStyle,
        ]}>
        <Animated.View
          testID="IconContainer"
          style={[styles.iconContainer, iconContainerDynamicStyle]}>
          {icon}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default React.memo(SlideButtonThumb);

const styles = StyleSheet.create({
  thumbContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
