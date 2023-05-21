import React, {useState} from 'react';

import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';

import Header from '@components/Header';
import {Container, View, Text, Touchable} from '@components/uikit';
import GradientBackgroundView from '@components/GradientBackgroundView';
import OngoingTab from './components/OngoingTab';
import AvailableTab from './components/AvailableTab';
import HistoryTab from './components/HistoryTab';
import {DIMS} from '@values';
import styles from './styles';

type State = NavigationState<Route>;

const FuncComponent: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const [routes] = useState([
    {key: 'ongoing', title: 'Ongoing'},
    {key: 'available', title: 'Available'},
    {key: 'history', title: 'History'},
  ]);

  const renderScene = SceneMap({
    ongoing: OngoingTab,
    available: AvailableTab,
    history: HistoryTab,
  });

  const renderItem = (route: Route, index: number) => {
    return (
      <Text
        style={tabIndex === index ? styles.tabActiveLabel : styles.tabLabel}>
        {route.title}
      </Text>
    );
  };

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => (
    <View style={styles.tabBar}>
      {props.navigationState.routes.map((route: Route, index: number) => {
        return (
          <Touchable
            style={[
              styles.tabBarItem,
              index === routes.length - 1 && {marginRight: 0},
              tabIndex === index && styles.activeTabBarItem,
            ]}
            key={route.key}
            onPress={() => props.jumpTo(route.key)}>
            {renderItem(route, index)}
          </Touchable>
        );
      })}
    </View>
  );

  return (
    <Container>
      <GradientBackgroundView>
        <Header title="Jobs" />
        <TabView
          navigationState={{index: tabIndex, routes}}
          renderScene={renderScene}
          onIndexChange={setTabIndex}
          initialLayout={{width: DIMS.width}}
          renderTabBar={renderTabBar}
        />
      </GradientBackgroundView>
    </Container>
  );
};
export default FuncComponent;
