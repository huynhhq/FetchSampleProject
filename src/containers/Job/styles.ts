import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    marginTop: 30,
  },
  tabBarItem: {
    flex: 1,
    backgroundColor: '#efeef4',
    paddingVertical: 18,
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 50,
  },
  activeTabBarItem: {
    backgroundColor: '#161324',
  },
  tabLabel: {
    color: '#a3a1a7',
  },
  tabActiveLabel: {
    color: '#d4d1de',
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
  hailIcon: {
    marginRight: 8,
    marginLeft: 2,
    marginTop: 8,
  },
  circleIcon: {
    marginRight: 8,
    marginTop: 6,
  },
});

export default styles;
