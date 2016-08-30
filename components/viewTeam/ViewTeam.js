import React, {
  Component
} from 'react';
import {
  Text,
  View,
} from 'react-native';

import styles from './styles';

export default function ViewTeam(props) {
  return (
    <View style={ styles.container }>
      <Text>View your Team</Text>
      <Text>Team members: 2</Text>
      <Text>Justin: 5232</Text>
      <Text>Anthony: 5523</Text>
    </View>
  );
}