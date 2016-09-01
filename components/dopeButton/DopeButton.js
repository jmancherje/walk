import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Dimensions from 'Dimensions';

const { width, height } = Dimensions.get('window');

export default class DopeButton extends Component {
  state = {
    pressed: false
  }

  render() {
    const {
      text = 'empty button',
      color = '#a4daf1',
      pressedColor = '#6379bb',
      onPress = () => console.log('pressed dope button'),
      pressedTextColor = '#c3edfb',
      textColor = '#242f33'
    } = this.props;

    const renderedTextColor = this.state.pressed ?
      pressedTextColor :
      textColor

    return (
      <TouchableHighlight
        onPressIn={ () => this.setState({ pressed: true }) }
        onPressOut={ () => this.setState({ pressed: false }) }
        style={ [styles.button, { backgroundColor: color }] }
        underlayColor={ pressedColor }
        onPress={ onPress }
      >
        <Text style={ [styles.buttonText, { color: renderedTextColor }] }>
          { text }
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    width: width / (1.5),
    backgroundColor: '#a4daf1',
    borderWidth: 1,
    borderColor: 'blue'
  }
})