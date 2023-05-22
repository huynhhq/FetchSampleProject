import React from 'react';
import {StyleSheet} from 'react-native';

import {DIMS, ms} from '@values';
import {Touchable, View, Text} from '@components/uikit';
import VectorIcons from '@components/uikit/vectorIcons';
import {goBack} from '@helpers/navigation';

interface Props {
  title: string;
  price: number;
  hide: boolean;
}
const MapHeader: React.FC<Props> = ({title, price, hide = false}) => {
  if (hide) {
    return (
      <View style={styles.container}>
        <Touchable style={styles.btnBack} onPress={() => goBack()}>
          <VectorIcons name="chevron-left" provider="FontAwesome" size={20} />
        </Touchable>
        <View alignItems>
          <Text style={styles.title}>{title}</Text>
          <View flexD="row" alignItems marginT={10}>
            <View marginR={10}>
              <Text style={styles.title}>${price.toFixed(2)}</Text>
            </View>
            <VectorIcons
              name="refresh"
              provider="FontAwesome"
              size={20}
              color="#2270ea"
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.transparentContainer}>
      <Touchable style={styles.btnTransparentBack}>
        <VectorIcons name="chevron-left" provider="FontAwesome" size={20} />
      </Touchable>
    </View>
  );
};

export default MapHeader;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    height: 100,
    width: DIMS.width,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  transparentContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    height: 100,
    width: DIMS.width,
  },
  btnBack: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  title: {
    fontSize: ms(15),
    fontWeight: '800',
  },
  btnTransparentBack: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    left: 6,
    top: 4,
  },
});
