import React, {PureComponent} from 'react';
import {StyleSheet, SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import RNRestart from 'react-native-restart';

import {DIMS} from '@values';

import View, {IViewProps} from './view';
import KeyboardAvoidingView from './keyboardAvoidingView';
import Error from './error';
import {LogUtils} from '@helpers/log';

interface IContainerProps extends IViewProps {
  PADDING?: boolean;
  PADDING_V?: boolean;
  PADDING_H?: boolean;
  unSafe?: boolean;
  keyboardAvoidingView?: boolean;
  safeAreaStyle?: StyleProp<ViewStyle>;
}

interface State {
  error?: Error | undefined;
  errorInfo?: any;
}

export default class Container extends PureComponent<IContainerProps, State> {
  constructor(props: IContainerProps) {
    super(props);
    this.state = {error: undefined};
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    LogUtils.log('[JS-EXCEPTION]: ', error, errorInfo);
  }

  render() {
    const {error} = this.state;
    const {
      children,
      PADDING,
      PADDING_H,
      PADDING_V,
      padding,
      paddingV,
      paddingH,
      keyboardAvoidingView,
      style,
      safeAreaStyle,
      ...rest
    } = this.props;

    const p = PADDING ? DIMS.padding : padding;
    const pv = PADDING_V ? DIMS.padding : paddingV;
    const ph = PADDING_H ? DIMS.padding : paddingH;

    const content = this.props.unSafe ? (
      <View
        {...rest}
        style={[styles.wrapper, style, error ? styles.center : undefined]}
        padding={p}
        paddingH={ph}
        paddingV={pv}>
        {error ? <Error flex onReload={RNRestart.Restart} /> : children}
      </View>
    ) : (
      <SafeAreaView style={[styles.wrapper, safeAreaStyle]}>
        <View
          {...rest}
          style={[styles.wrapper, style, error ? styles.center : undefined]}
          padding={p}
          paddingH={ph}
          paddingV={pv}>
          {error ? <Error flex onReload={RNRestart.Restart} /> : children}
        </View>
      </SafeAreaView>
    );

    return keyboardAvoidingView ? (
      <KeyboardAvoidingView>{content}</KeyboardAvoidingView>
    ) : (
      content
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
