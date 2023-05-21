import React, {ComponentType, memo, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {IModifiersTest} from 'custom-ui-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FONT_SIZE, DIMS, COLORS} from '@values';

interface IErrorProps extends IModifiersTest {
  iconColor?: string;
  titleColor?: string;
  btnColor?: string;
  iconSize?: number;
  flex?: boolean;
  onReload?: () => void;
}

const FuncComponent = (props: IErrorProps) => {
  const {iconSize, iconColor, onReload, titleColor, btnColor} = props;
  const textStyle = useMemo(
    () => [styles.text, {color: titleColor}],
    [titleColor],
  );
  const btnStyle = useMemo(() => [styles.rs, {color: btnColor}], [btnColor]);

  return (
    <View style={styles.container}>
      <Ionicons name="ios-alert" color={iconColor} size={iconSize} />
      <TouchableOpacity style={styles.btn} onPress={onReload}>
        <Text style={textStyle}>{'알 수 없는 오류가 발생했습니다.'}</Text>
        <Text style={btnStyle}>{'재시작?'}</Text>
      </TouchableOpacity>
    </View>
  );
};

(FuncComponent as ComponentType<IErrorProps>).defaultProps = {
  iconColor: 'tomato',
  iconSize: 60,
  titleColor: COLORS.gray,
  btnColor: COLORS.button,
  flex: true,
};

export default memo(FuncComponent);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    paddingBottom: DIMS.bottomSpace,
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    marginTop: DIMS.padding,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rs: {
    fontSize: FONT_SIZE.BIGGEST,
    fontWeight: 'bold',
    marginTop: 7,
  },
});
