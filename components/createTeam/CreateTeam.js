import React, {
  Component
} from 'react';
import {
  Text,
  View,
} from 'react-native';

import styles from './styles';

export default function CreateTeam(props) {
  return (
    <View style={ styles.container }>
      <Text>Create a Team</Text>
      <Text>Random Code:</Text>
      <Text>{ Math.random().toString(36).substring(2, 10) }</Text>
    </View>
  );
}