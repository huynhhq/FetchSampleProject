import {DIMS} from '@values';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: DIMS.height - 220,
    width: 400,
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: 'orange',
    opacity: 0.6,
  },
  topHeader: {
    flexDirection: 'row',
    backgroundColor: '#161520',
    alignItems: 'center',
    padding: 20,
  },
  jobItemContainer: {
    backgroundColor: '#161324',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  jobDes: {
    flex: 1,
    lineHeight: 25,
    flexWrap: 'wrap',
  },
  hailIcon: {},
  circleIcon: {},
  icon: {
    width: 52,
    height: 52,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btnFocusContainer: {
    position: 'absolute',
    right: 20,
    top: -70,
  },
  btnFocus: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: 'white',
  },
});

export default styles;
