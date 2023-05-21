import {CONSTANTS} from '@values';
import React, {ComponentType, memo, PropsWithChildren} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import commonStyles from './styles';

interface IKeyboardAvoidingViewProps extends PropsWithChildren<any> {
  keyboardVerticalOffset?: number;
}

const FuncComponent = memo((props: IKeyboardAvoidingViewProps) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-40}
      behavior="padding"
      style={commonStyles.flex1}>
      {props.children}
    </KeyboardAvoidingView>
  );
});

(FuncComponent as ComponentType<IKeyboardAvoidingViewProps>).defaultProps = {
  keyboardVerticalOffset: CONSTANTS.IS_ANDROID
    ? 61
    : CONSTANTS.IS_IPHONE_X
    ? 93
    : 69,
};

export default FuncComponent;
