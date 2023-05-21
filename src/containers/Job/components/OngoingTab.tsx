import React, {useCallback} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {JobDTO} from '../types';
import {View} from '@components/uikit';
import JobItem from './JobItem';

const SAMPLE_DATA: JobDTO[] = [
  {
    id: 1,
    startingLocation: 'Expo Hall 7',
    startingLocationDes: 'Expo Hall 7, Singapore',
    destination: 'Far East Plaza',
    destinationDes: '14, Scotts Road, Orchard, Singapore. Singapore. 228213',
    time: '7 months',
    price: 65,
  },
];

const OngoingTab: React.FC = () => {
  const renderItem = useCallback((info: ListRenderItemInfo<JobDTO>) => {
    const {item, index} = info;
    return <JobItem key={index} item={item} />;
  }, []);

  return (
    <View paddingH={15}>
      <FlatList
        contentContainerStyle={{marginTop: 40}}
        data={SAMPLE_DATA}
        renderItem={renderItem}
      />
    </View>
  );
};

export default OngoingTab;
