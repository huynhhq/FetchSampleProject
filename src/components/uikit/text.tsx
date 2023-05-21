import React, {ComponentType, memo, PropsWithChildren, useMemo} from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {
  IModifiersSpacing,
  IModifiersStyling,
  IModifiersText,
  IModifiersLayout,
  IModifiersTest,
} from 'custom-ui-kit';

import {destructPropsToStyle} from '@helpers/uikitHelper';
import {COLORS} from '@values';

export interface ITextProps
  extends TextProps,
    IModifiersSpacing,
    IModifiersStyling,
    IModifiersText,
    IModifiersLayout,
    IModifiersTest {}

const FuncComponent = (props: PropsWithChildren<ITextProps>) => {
  const {_styles, _props} = useMemo(() => destructPropsToStyle(props), [props]);
  const style = StyleSheet.flatten([
    _styles.textStyle,
    _styles.stylingStyle,
    _styles.spacingStyle,
    _styles.layoutStyle,
  ]);

  return <Text {..._props} style={style} />;
};

(FuncComponent as ComponentType<ITextProps>).defaultProps = {
  color: COLORS.neutral700,
};

export default memo(FuncComponent);
