import React, {ComponentType, memo} from 'react';
import {ViewStyle, StyleProp, View} from 'react-native';
import {IModifiersTest} from 'custom-ui-kit';

import {DIMS} from '@values';

export type IThickness = 'hairline' | number;

interface IDividerProps extends IModifiersTest {
  color?: string;
  thickness?: IThickness;
  style?: StyleProp<ViewStyle>;
  column?: boolean;
}

const FuncComponent = (props: IDividerProps) => {
  const {color, thickness, style, column} = props;
  const w = thickness === 'hairline' || !thickness ? DIMS.line : thickness;
  const _style = column
    ? {width: w, height: '100%', backgroundColor: color}
    : {height: w, width: '100%', backgroundColor: color};

  return <View style={[_style, style]} />;
};

(FuncComponent as ComponentType<IDividerProps>).defaultProps = {
  color: 'rgba(179, 179, 179, 0.5)',
  thickness: 'hairline',
};

export default memo(FuncComponent);
export const renderDivider = () => <FuncComponent />;
