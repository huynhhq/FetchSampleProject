import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

interface Props extends PropsWithChildren {}
const GradientBackgroundView: React.FC<Props> = ({children}) => {
  return (
    <LinearGradient colors={['white', 'gray']} style={styles.container}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackgroundView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
