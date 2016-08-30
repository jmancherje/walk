import React, {
  Component
} from 'react';
import {
  Text,
  View,
} from 'react-native';

import styles from './styles';

export default function JoinTeam(props) {
  return (
    <View style={ styles.container }>
      <Text>Join a Team</Text>
      <Text>Enter a team code:</Text>
    </View>
  );
}