import React from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  I18nManager,
} from 'react-native';
import SlideButtonThumb, {SlideButtonThumbProps} from './slideButtonThumb';
import SlideButtonText, {SlideButtonTextProps} from './slideButtonText';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {DIMS} from '@values';

const DEFAULT_HEIGHT = 56;
const DEFAULT_THUMB_WIDTH = 60;
const DEFAULT_BORDER_RADIUS = DEFAULT_HEIGHT / 2;
const DEFAULT_COMPLETE_THRESHOLD = 70;
const DEFAULT_CONTAINER_COLOR = '#1859ca';
const DEFAULT_UNDERLAY_COLOR = '#348ECB';
const DEFAULT_TITLE = 'Completed';
const DEFAULT_AUTO_RESET = false;
const DEFAULT_AUTO_RESET_DELAY = 1080;
const DEFAULT_ANIMATION = false;
const DEFAULT_ANIMATION_DURATION = 180;
const DEFAULT_SCROLL_PERCENTAGE = 100;

export type SlideButtonPropsExtends = Omit<
  SlideButtonCommonProps,
  'translateX' | 'scrollDistance' | 'endReached' | 'isRTL'
> &
  Omit<
    SlideButtonThumbProps,
    | 'opacity'
    | 'gestureHandler'
    | 'translateX'
    | 'scrollDistance'
    | 'endReached'
    | 'isRTL'
  > &
  Omit<
    SlideButtonTextProps,
    'translateX' | 'scrollDistance' | 'endReached' | 'isRTL'
  >;

interface SlideButtonProps extends SlideButtonPropsExtends {
  width?: number;
  disabled?: boolean;
  completeThreshold?: number;
  onSlideStart?: () => void;
  onSlideEnd?: () => void;
  onReachedToStart?: () => void;
  onReachedToEnd?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  autoReset?: boolean;
  autoResetDelay?: number;
}

type AnimatedGHContext = {
  startX: number;
};

export type SlideButtonCommonProps = {
  height?: number;
  borderRadius?: number;
  padding?: number;
  translateX: Animated.SharedValue<number>;
  endReached: boolean;
  scrollDistance: number;
  reverseSlideEnabled?: boolean;
  animation?: boolean;
  animationDuration?: number;
  dynamicResetEnabled?: boolean;
  dynamicResetDelaying?: boolean;
  scrollPercentage?: number;
};

const SlideButton = ({
  width,
  height,
  borderRadius,
  completeThreshold,
  disabled,
  title,
  titleContainerStyle,
  titleStyle,
  icon,
  thumbStyle,
  containerStyle,
  onReachedToStart,
  onReachedToEnd,
  onSlideEnd,
  onSlideStart,
  reverseSlideEnabled,
  autoReset,
  autoResetDelay,
  animation,
  animationDuration,
  dynamicResetEnabled,
  dynamicResetDelaying,
  scrollPercentage,
}: SlideButtonProps) => {
  const [dimensions, setDimensions] = React.useState({width: 0, height: 0});
  const [endReached, setEndReached] = React.useState<boolean>(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>();

  const gestureDisabled = useSharedValue(disabled);
  const dragX = useSharedValue(0);

  const isRTL = I18nManager.isRTL;
  const rtlMultiplier = isRTL ? -1 : 1;
  const opacity = 1;

  let borderWidth = 0;
  let thumbWidth = DEFAULT_THUMB_WIDTH;
  let childHeight = height!;
  if (thumbStyle !== undefined) {
    let tWidth = StyleSheet.flatten(thumbStyle).width;
    if (tWidth !== undefined) {
      thumbWidth = Number(tWidth);
    }
  }

  if (containerStyle !== undefined) {
    let bWidth = StyleSheet.flatten(containerStyle).borderWidth;
    if (bWidth !== undefined) {
      borderWidth = Number(bWidth);
    }
  }

  const radius = borderRadius!;
  const scrollDistance =
    (((dimensions.width - thumbWidth - borderWidth * 2) * scrollPercentage!) /
      100) *
    rtlMultiplier;
  const slideThreshold = scrollDistance * (completeThreshold! / 100);

  const onLayoutContainer = async (e: LayoutChangeEvent) => {
    const {width: containerW, height: containerH} = e.nativeEvent.layout;
    const {width: w, height: h} = dimensions;
    if (w !== width || h !== height) {
      setDimensions({width: containerW, height: containerH});
    }
  };

  React.useEffect(() => {
    gestureDisabled.value = disabled;
  }, [disabled]);

  React.useEffect(() => {
    if (dynamicResetEnabled && !dynamicResetDelaying) {
      reset();
    }
  }, [dynamicResetDelaying]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const underlayTitleAnimStyle = useAnimatedStyle(() => {
    return {
      left: -DIMS.width + dragX.value * rtlMultiplier + thumbWidth,
    };
  });

  const underlayDynamicStyle = {
    height: childHeight - borderWidth * 2,
  };

  const handleComplete = (reached: boolean) => {
    if (reached) {
      setEndReached(true);
      onReachedToEnd && onReachedToEnd();
      if (!dynamicResetEnabled) {
        if (autoReset) {
          gestureDisabled.value = true;
          timeoutRef.current = setTimeout(() => {
            reset();
          }, autoResetDelay);
        }
      }
      if (!reverseSlideEnabled) {
        gestureDisabled.value = true;
      }
    } else {
      setEndReached(false);
      onReachedToStart && onReachedToStart();
    }
  };

  const clamp = (value: number, lowerBound: number, upperBound: number) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const reset = () => {
    'worklet';
    dragX.value = withSpring(0, {damping: 20, stiffness: 100}, () => {
      runOnJS(handleComplete)(false);
    });
    gestureDisabled.value = false;
  };

  const moveTo = (value: number, complete: boolean) => {
    'worklet';
    dragX.value = withSpring(value, {damping: 20, stiffness: 100}, () => {
      runOnJS(handleComplete)(complete);
    });
  };

  const animatedGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_, context) => {
      context.startX = dragX.value;
      runOnJS(onSlideStart!)();
    },
    onActive: (event, context) => {
      if (gestureDisabled.value) {
        return;
      }

      const translationX = context.startX + event.translationX;
      if (isRTL) {
        dragX.value = clamp(translationX, scrollDistance, 0);
      } else {
        dragX.value = clamp(translationX, 0, scrollDistance);
      }
    },
    onEnd: () => {
      if (gestureDisabled.value) {
        return;
      }

      runOnJS(onSlideEnd!)();

      if (isRTL) {
        if (dragX.value > slideThreshold) {
          if (dragX.value === 0) {
            runOnJS(handleComplete)(false);
            return;
          }
          moveTo(0, false);
        } else {
          if (dragX.value === scrollDistance) {
            runOnJS(handleComplete)(true);
            return;
          }
          moveTo(scrollDistance, true);
        }
      } else {
        if (dragX.value < slideThreshold) {
          if (dragX.value === 0) {
            runOnJS(handleComplete)(false);
            return;
          }
          moveTo(0, false);
        } else {
          if (dragX.value === scrollDistance) {
            runOnJS(handleComplete)(true);
            return;
          }
          moveTo(scrollDistance, true);
        }
      }
    },
  });

  return (
    <View
      style={[
        styles.container,
        {opacity},
        containerStyle,
        {height, ...(width ? {width} : {})},
      ]}
      onLayout={onLayoutContainer}>
      <SlideButtonText
        title={title}
        titleStyle={titleStyle}
        titleContainerStyle={titleContainerStyle}
        height={childHeight}
        borderRadius={radius}
        translateX={dragX}
        scrollDistance={scrollDistance}
      />

      <SlideButtonThumb
        gestureHandler={animatedGestureHandler}
        translateX={disabled ? {value: scrollDistance} : dragX}
        icon={icon}
        borderRadius={radius}
        height={childHeight}
        endReached={endReached}
        scrollDistance={scrollDistance}
        thumbStyle={thumbStyle}
        isRTL={isRTL}
        animation={animation}
        animationDuration={animationDuration}
        dynamicResetEnabled={dynamicResetEnabled}
        dynamicResetDelaying={dynamicResetDelaying}
        animStarted={() => {
          if (reverseSlideEnabled) {
            gestureDisabled.value = true;
          }
        }}
        animEnded={() => {
          if (reverseSlideEnabled) {
            gestureDisabled.value = false;
          }
        }}
      />
    </View>
  );
};

export default React.memo(SlideButton);

SlideButton.defaultProps = {
  height: DEFAULT_HEIGHT,
  borderRadius: DEFAULT_BORDER_RADIUS,
  title: DEFAULT_TITLE,
  completeThreshold: DEFAULT_COMPLETE_THRESHOLD,
  disabled: false,
  reverseSlideEnabled: true,
  autoReset: DEFAULT_AUTO_RESET,
  autoResetDelay: DEFAULT_AUTO_RESET_DELAY,
  animation: DEFAULT_ANIMATION,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  dynamicResetEnabled: false,
  dynamicResetDelaying: false,
  scrollPercentage: DEFAULT_SCROLL_PERCENTAGE,
  onSlideStart: () => {},
  onSlideEnd: () => {},
  onReachedToStart: () => {},
  onReachedToEnd: () => {},
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DEFAULT_CONTAINER_COLOR,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: DEFAULT_HEIGHT,
    borderRadius: DEFAULT_HEIGHT / 2,
  },
  underlayContainer: {
    position: 'absolute',
    backgroundColor: DEFAULT_UNDERLAY_COLOR,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 28,
    color: 'white',
  },
});
