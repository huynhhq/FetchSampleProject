import React from 'react';

import {Touchable, View, Text, VectorIcons, Divider} from '@components/uikit';
import {JobDTO} from '../types';
import styles from '../styles';
import {COLORS} from '@values';
import {goScreen} from '@helpers/navigation';

interface Props {
  item: JobDTO;
}

const JobItem: React.FC<Props> = ({item}) => {
  return (
    <Touchable
      style={styles.jobItemContainer}
      onPress={() => goScreen('jobDescription')}>
      <View flexD="row">
        <View flex>
          <Text color="white" fontSize={15}>
            {item.startingLocation}
          </Text>
        </View>
        <View alignItems="flex-end">
          <Text color="#cfcdd9" fontSize={15}>{`$${item.price.toFixed(
            2,
          )}`}</Text>
          <View flexD="row" alignItems>
            <VectorIcons
              style={{marginRight: 5}}
              color="#4c4a56"
              name="time"
              size={20}
            />
            <Text color="#4c4a56">{`in ${item.time}`}</Text>
          </View>
        </View>
      </View>
      <View marginT={15}>
        <View flexD="row">
          <VectorIcons
            name="hail"
            provider="MaterialIcons"
            color={COLORS.primaryBlue}
            size={18}
            style={styles.hailIcon}
          />
          <Text style={styles.jobDes}>
            <Text color="white" fontSize={15}>
              {item.startingLocation}
            </Text>
            <Text color="#686672" fontSize={14}>
              {` - ${item.startingLocationDes}`}
            </Text>
          </Text>
        </View>
        <View width={20} height={30} justifyContent alignItems marginV={5}>
          <Divider column thickness={2} color={COLORS.primaryBlue} />
        </View>
        <View flexD="row">
          <VectorIcons
            name="circle"
            provider="MaterialIcons"
            color={COLORS.primaryBlue}
            size={20}
            style={styles.circleIcon}
          />
          <Text style={styles.jobDes}>
            <Text color="white" fontSize={15}>
              {item.destination}
            </Text>
            <Text color="#686672" fontSize={14}>
              {` - ${item.destinationDes}`}
            </Text>
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

export default JobItem;
