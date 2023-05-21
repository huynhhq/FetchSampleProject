import {Dimensions, Platform} from 'react-native';

const {
  name: APP_NAME,
  displayName: APP_DISPLAY_NAME,
} = require('../../app.json');

const dimensions = Dimensions.get('window');

const {width, height} = dimensions;

export enum FONT_SIZE {
  SMALLEST = 8,
  SMALLER = 10,
  SMALL = 12,
  NORMAL = 14,
  BIG = 16,
  BIGGER = 18,
  BIGGEST = 20,
  RATIO = 1.5,
}

export enum DURATION {
  SHORT = 200,
  NORMAL = 400,
  LONG = 600,
}

export const CONSTANTS = {
  APP_NAME,
  APP_DISPLAY_NAME,
  IS_ANDROID: Platform.OS === 'android',
  IS_IOS: Platform.OS === 'ios',
  BASE_URL: '',
  BUNDLE_ID: '',
  APPLE_ID: '',
  IS_IPHONE_X:
    Platform.OS === 'ios' && !Platform.isPad && (width >= 812 || height >= 812),
  ICON_PREFIX: Platform.OS === 'ios' ? 'ios-' : 'md-',
};
