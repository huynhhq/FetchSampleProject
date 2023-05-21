import {
  Dimensions,
  PixelRatio,
  Platform as PlatformBase,
  TextStyle,
} from 'react-native';
// import { getVersion } from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

class PBase {
  readonly deviceWidth = width;
  readonly deviceHeight = height;
  readonly platform = PlatformBase.OS;
  readonly borderWidth = 1.5 / PixelRatio.getPixelSizeForLayoutSize(1);
  readonly baseScreenWith = 375;
  readonly baseScreenHeight = 812;
  readonly select = PlatformBase.select;
  readonly OS = PlatformBase.OS;
  readonly scaleWidth = this.deviceWidth / this.baseScreenWith;
  readonly scaleHeight = this.deviceHeight / this.baseScreenHeight;
  readonly scale = this.deviceWidth < 600 ? this.scaleWidth : this.scaleHeight;
  readonly SizeScale = (size = 12): number => {
    return this.scale * size;
  };
  readonly hs = (size = 12): number => {
    return this.scaleWidth * size;
  };
  readonly vs = (size = 12): number => {
    return this.scaleHeight * size;
  };
  // readonly appVersion = getVersion();
  readonly headerHeight = this.SizeScale(50);
  readonly version = PlatformBase.Version;
  readonly fontNames = {};
  readonly textBase: TextStyle = {
    fontSize: this.SizeScale(),
    // fontFamily: this.fontNames.poppinsMedium,
  };
  readonly footerMarginBottom = this.SizeScale(55);
}

export const Platform = new PBase();
export const ms = Platform.SizeScale;
export const hs = Platform.hs;
export const vs = Platform.vs;
export const vsFactor = (size: number, factor = 1.6) =>
  size * (1 - factor * (1 - vs(1)));
