import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from './uikit';
import {ms} from '@values';

interface Props {
  title: string;
}
const Header: React.FC<Props> = ({title}) => {
  return (
    <View paddingH={25} paddingT={30}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: ms(30),
    fontWeight: '700',
  },
});
