import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS
} from 'react-native';

import StepDataUser from './components/stepDataUser/StepDataUser';

class walknewv extends Component {
  handleNavigation = (route) => {
    console.log('navigation', route);
  };

  handleRightButtonPress = () => this.handleNavigation('right');
  handleLeftButtonPress = () => this.handleNavigation('left');

  render() {
    return (
      <NavigatorIOS
        initialRoute={ {
          component: StepDataUser,
          title: 'Home',
          rightButtonTitle: 'Right',
          onRightButtonPress: this.handleRightButtonPress,
          leftButtonTitle: 'Left',
          onLeftButtonPress: this.handleLeftButtonPress,
        } }
        style={ { flex: 1 } }
      />
    );
  }
}

AppRegistry.registerComponent('walknewv', () => walknewv);