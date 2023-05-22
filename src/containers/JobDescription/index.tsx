import React, {useCallback, useRef, useState} from 'react';

import styles from './styles';
import {
  View,
  Text,
  Image,
  Divider,
  VectorIcons,
  Touchable,
} from '@components/uikit';
import BottomSheet from '@components/BottomSheet';
import images from '@assets';
import {COLORS, DIMS} from '@values';
import SlideButton from '@components/SlideButton/slideButton';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Animated} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import MapHeader from './component/MapHeader';

const ASPECT_RATIO = DIMS.width / DIMS.height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const origin = {latitude: 1.3372374096202626, longitude: 103.96157921165839};
const destination = {
  latitude: 1.3070215591273626,
  longitude: 103.83352010981045,
};

const BOTTOM_DEFAULT_HEIGHT = 220;
const MAP_HEIGHT = DIMS.height - BOTTOM_DEFAULT_HEIGHT;

const FuncComponent: React.FC = () => {
  const map = useRef<MapView>(null);
  const [position, setPosition] = useState<'bottom' | 'middle' | 'top'>(
    'bottom',
  );
  const [mainViewHeight, setMainViewHeight] = useState<number>(MAP_HEIGHT);

  const handleOnChangeMap = useCallback(
    (
      bottomSheetPosition: 'bottom' | 'middle' | 'top',
      direction: 'up' | 'down',
    ) => {
      if (direction === 'up' && bottomSheetPosition === 'middle') {
        setPosition(bottomSheetPosition);
        setTimeout(() => {
          setMainViewHeight(MAP_HEIGHT - BOTTOM_DEFAULT_HEIGHT);
        }, 1000);
      } else if (direction === 'down' && bottomSheetPosition === 'bottom') {
        setMainViewHeight(MAP_HEIGHT);
        setPosition(bottomSheetPosition);
      } else {
        setPosition(bottomSheetPosition);
      }
    },
    [],
  );

  const bottomSheetCallback = (
    bottomSheetPosition: 'bottom' | 'middle' | 'top',
    direction: 'up' | 'down',
  ) => {
    'worklet';
    runOnJS(handleOnChangeMap)(bottomSheetPosition, direction);
  };

  return (
    <View flex>
      <View style={styles.container}>
        <MapHeader title="LY-4b3dec" price={65} hide={position === 'top'} />
        <Animated.View
          style={[
            styles.mapContainer,
            {
              height: mainViewHeight,
            },
          ]}>
          <MapView
            ref={map}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: 1.3372374096202626,
              longitude: 103.96157921165839,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker
              identifier="Marker1"
              coordinate={{
                latitude: 1.3372374096202626,
                longitude: 103.96157921165839,
              }}
            />
            <Marker
              identifier="Marker2"
              coordinate={{
                latitude: 1.3070215591273626,
                longitude: 103.83352010981045,
              }}
            />
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={'AIzaSyB_TOIiMbwf7pkyJt-lY8jfHpEcuSyrUEk'}
              mode="DRIVING"
              strokeWidth={3}
              strokeColor="hotpink"
            />
          </MapView>
        </Animated.View>
        <BottomSheet defaultHeight={220} callBack={bottomSheetCallback}>
          {position !== 'top' && (
            <View style={styles.btnFocusContainer}>
              <Touchable
                style={styles.btnFocus}
                onPress={() =>
                  map?.current?.fitToSuppliedMarkers(['Marker1', 'Marker2'], {
                    animated: true,
                  })
                }>
                <VectorIcons name="locate" provider="Ionicons" size={30} />
              </Touchable>
            </View>
          )}
          <View style={{position: 'relative'}}>
            <View style={styles.topHeader}>
              <View flexD="row" alignItems flex>
                <Text color="white" fontSize={25} style={{fontWeight: '600'}}>
                  12
                </Text>
                <View marginL={20}>
                  <Text color="#cfcdd9" fontSize={18}>
                    December
                  </Text>
                  <Text color="#4c4a56">N95899</Text>
                </View>
              </View>
              <Text color="#cfcdd9" fontSize={25}>
                $65.00
              </Text>
            </View>
            <View flexD="row" padding={20}>
              <Image source={images.shield} marginR={20} />
              <Text
                color="#095bf7"
                fontSize={18}
                style={{fontWeight: '600', letterSpacing: -0.4}}>
                STANDARD RIDE
              </Text>
            </View>
            <View marginH={35} marginT={15}>
              <View flexD="row">
                <View width={20} alignItems marginR={30}>
                  <VectorIcons
                    name="hail"
                    provider="MaterialIcons"
                    color={COLORS.primaryBlue}
                    size={18}
                    style={styles.hailIcon}
                  />
                  <View height={180}>
                    <Divider column thickness={2} color={COLORS.primaryBlue} />
                  </View>
                  <VectorIcons
                    name="circle"
                    provider="MaterialIcons"
                    color={COLORS.primaryBlue}
                    size={20}
                    style={styles.circleIcon}
                  />
                </View>
                <View>
                  <View height={195}>
                    <Text
                      color="#1c1b1f"
                      fontSize={20}
                      style={{fontWeight: '700'}}>
                      Expo Hall 7
                    </Text>
                    <Text color="#bdbdbf" fontSize={14}>
                      Expo Hall 7, Singapore
                    </Text>
                    <Text color="#83b859" style={{fontWeight: '600'}}>
                      Picked up
                    </Text>
                  </View>
                  <View>
                    <Text color="#537aba">6:06PM</Text>
                    <Text
                      color="#1c1b1f"
                      fontSize={20}
                      style={{fontWeight: '700'}}>
                      Far East Plaza
                    </Text>
                    <Text color="#bdbdbf" fontSize={14}>
                      14, Scott Road, Orchard, Singapore, Singapore, 228213
                    </Text>
                    <Text color="#83b859" style={{fontWeight: '600'}}>
                      Dropped - off
                    </Text>
                  </View>
                </View>
              </View>
              <View flexD="row" marginT={40}>
                <View flex>
                  <Text color="#9b9b9c">Job Date</Text>
                </View>
                <Text color="#18181c" style={{fontWeight: 'bold'}}>
                  12/12/2023
                </Text>
              </View>
              <View marginT={50}>
                <SlideButton
                  height={56}
                  icon={<Image source={images.swipe} style={styles.icon} />}
                  onReachedToEnd={() => {}}
                  reverseSlideEnabled={false}
                  autoReset={true}
                  animation={true}
                />
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};
export default FuncComponent;
