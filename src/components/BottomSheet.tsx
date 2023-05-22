import React, {PropsWithChildren, useCallback} from 'react';
import {StyleSheet} from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {DIMS} from '@values';

const MAX_TRANSLATE_Y = -DIMS.height;
const MIDDLE_TRANSLATE_Y = -DIMS.height / 3.6;
const MIDDLE_HOLD_Y = 50;
const BORDER_HEIGHT = 25;

interface BottomSheetProps extends PropsWithChildren {
  children?: React.ReactNode;
  defaultHeight?: number;
  callBack?: (
    bottomSheetPosition: 'bottom' | 'middle' | 'top',
    direction: 'up' | 'down',
  ) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  defaultHeight = 0,
  callBack,
}) => {
  const translateY = useSharedValue(0);
  const swipeDirection = useSharedValue<'up' | 'down'>('up');
  const scrollTo = useCallback(
    (destination: number) => {
      'worklet';

      translateY.value = withSpring(destination, {damping: 50});
    },
    [translateY],
  );

  const handleCallback = useCallback(
    (
      bottomSheetPosition: 'bottom' | 'middle' | 'top',
      direction: 'up' | 'down',
    ) => {
      'worklet';
      callBack && callBack(bottomSheetPosition, direction);
    },
    [callBack],
  );

  const context = useSharedValue({y: 0});
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(
        translateY.value,
        MAX_TRANSLATE_Y + defaultHeight,
      );
      if (event.translationY < 0) {
        swipeDirection.value = 'up';
      } else {
        swipeDirection.value = 'down';
      }
    })
    .onEnd(() => {
      let bottomSheetPosition: 'bottom' | 'middle' | 'top' = 'bottom';
      let direction: 'up' | 'down' = 'up';
      if (
        swipeDirection.value === 'up' &&
        translateY.value > MIDDLE_TRANSLATE_Y
      ) {
        scrollTo(MIDDLE_TRANSLATE_Y);
        bottomSheetPosition = 'middle';
        direction = 'up';
      } else if (
        swipeDirection.value === 'up' &&
        translateY.value < MIDDLE_TRANSLATE_Y + MIDDLE_HOLD_Y
      ) {
        scrollTo(MAX_TRANSLATE_Y + defaultHeight + BORDER_HEIGHT);
        bottomSheetPosition = 'top';
        direction = 'up';
      } else if (
        swipeDirection.value === 'down' &&
        translateY.value < MIDDLE_TRANSLATE_Y + MIDDLE_HOLD_Y
      ) {
        scrollTo(MIDDLE_TRANSLATE_Y);
        bottomSheetPosition = 'middle';
        direction = 'down';
      } else if (
        swipeDirection.value === 'down' &&
        translateY.value > MIDDLE_TRANSLATE_Y + MIDDLE_HOLD_Y
      ) {
        scrollTo(0);
        bottomSheetPosition = 'bottom';
        direction = 'down';
      }
      handleCallback(bottomSheetPosition, direction);
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [0, MAX_TRANSLATE_Y + defaultHeight],
      [10, 0],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          rBottomSheetStyle,
          {top: DIMS.height - defaultHeight},
        ]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    minHeight: DIMS.height,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 10,
  },
});

export default BottomSheet;
