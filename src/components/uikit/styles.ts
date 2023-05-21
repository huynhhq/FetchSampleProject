import {Platform, StyleSheet} from 'react-native';
import {FONT_SIZE, DIMS, CONSTANTS, COLORS} from '../../values';

const variables = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
};

export let paddingTopUnSafe = 0;
if (CONSTANTS.IS_IPHONE_X) {
  paddingTopUnSafe = DIMS.statusBarHeight - 10;
} else if (Platform.OS === 'ios') {
  paddingTopUnSafe = 16;
}

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
  },
  padding: {
    padding: DIMS.padding,
  },
  paddingV: {
    paddingVertical: DIMS.padding,
  },
  containerPaddingV: {
    paddingVertical: CONSTANTS.IS_IPHONE_X ? 0 : DIMS.padding,
  },
  paddingH: {
    paddingHorizontal: DIMS.padding,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: COLORS.error,
    fontSize: FONT_SIZE.SMALLER,
    paddingVertical: 3,
  },
  paddingWithoutBottom: {
    padding: DIMS.padding,
    paddingBottom: 0,
  },
  textBold: {
    fontWeight: 'bold',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  // background
  bgSuccess: {
    backgroundColor: variables.success,
  },
  bgPrimary: {
    backgroundColor: variables.primary,
  },
  bgWarning: {
    backgroundColor: variables.warning,
  },
  bgDanger: {
    backgroundColor: variables.danger,
  },
  // border radius
  bRadius2: {
    borderRadius: 2,
  },
  bRadius4: {
    borderRadius: 4,
  },
  bRadius6: {
    borderRadius: 6,
  },
  bRadius8: {
    borderRadius: 8,
  },
  btnTextStyle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    color: COLORS.white,
  },
});
