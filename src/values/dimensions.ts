import {
  Dimensions,
  Platform,
  PixelRatio,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {CONSTANTS} from './constants';

const {IS_IPHONE_X} = CONSTANTS;
const dimensions = Dimensions.get('window');

export const DIMS = {
  ...dimensions,
  padding: 15,
  margin5: 5,
  marginToChinX: IS_IPHONE_X ? 0 : 8,
  unsafeSpace: IS_IPHONE_X ? 0 : 5,
  os: Platform.OS,
  ratio: PixelRatio.get(),
  bottomSpace: IS_IPHONE_X ? 44 : 0,
  statusBarHeight:
    Platform.OS === 'android'
      ? StatusBar.currentHeight || 0
      : IS_IPHONE_X
      ? 44
      : 40,
  line: StyleSheet.hairlineWidth,
  hitSlop: {top: 4, right: 4, bottom: 4, left: 4},
  itemSize: 60,
};
