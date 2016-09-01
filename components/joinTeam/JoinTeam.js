import React, {
  Component
} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import styles from './styles';

export default class JoinTeam extends Component {
  
  state = {
    text: "Enter Code!"
  }

  handleBlur = () => {
    console.log('blur');
    if (this.state.text.trim() === '') {
      this.setState({ text: "Enter Code!" });
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>Join a Team</Text>
        <Text>Enter a team code:</Text>
        <TextInput
          style={ styles.inputCode }
          value={ this.state.text }
          onChangeText={ text => this.setState({ text }) }
          onFocus={ () => this.setState({ text: '' }) }
          onBlur={ this.handleBlur }
        />
        <TouchableHighlight onPress={ () => console.log(this.state.text) }>
          <Text style={ [styles.submitButton, styles.blueText] }>
            Join Team
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}