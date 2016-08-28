/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import StepsView from './components/StepsView';

import AppleHealthKit from 'react-native-apple-healthkit';

// HealthKit initialization options
const HKPERMS = AppleHealthKit.Constants.Permissions;
const HKOPTIONS = {
  permissions: {
    read: [
      HKPERMS.StepCount,
      HKPERMS.DistanceWalkingRunning,
      HKPERMS.FlightsClimbed,
      HKPERMS.Height,
      HKPERMS.DateOfBirth,
      HKPERMS.BiologicalSex,
    ],
    write: [
      HKPERMS.StepCount
    ],
  }
};


class walknewv extends Component {

  constructor() {
    super();
    this.state = {
      stepsToday: 0,
      stepHistory: [],
      range: 7,
      average: 0
    };
  }

  componentDidMount() {
    AppleHealthKit.isAvailable((err,available) => {
      if(available){
        AppleHealthKit.initHealthKit(HKOPTIONS, (err, res) => {
          if(this._handleHKError(err, 'initHealthKit')){
            return;
          }
          this._fetchStepsToday();
          this._fetchStepsHistory();
        });
      }
    });
  }

  _fetchStepsToday() {
    AppleHealthKit.getStepCount(null, (err, res) => {
      if (this._handleHKError(err, 'getStepCount')) {
        return;
      }
      this.setState({ stepsToday: res.value });
    });
  }

  _fetchStepsHistory() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - this.state.range);
    let options = {
      startDate: currentDate.toISOString(),
    };
    AppleHealthKit.getDailyStepCountSamples(options, (err, res) => {
      if (this._handleHKError(err, 'getDailyStepCountSamples')) {
        return;
      }
      console.log('step history', res);
      this.setState({
        stepHistory: res,
        average: Math.floor(this._calculateAvgFromResponse(res))
      });
    });
  }

  _calculateAvgFromResponse(response) {
     return response.reduce((sum, day) => {
       return sum + day.value;
     }, 0) / this.state.range;
  }

  _handleHKError(err, method): boolean {
    if (err) {
      let errStr = 'HealthKit_ERROR[' + method + '] : ';
      errStr += (err && err.message) ? err.message : err;
      console.log(errStr);
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={ styles.container } >
        <Image source={ require('./assets/infinity.gif') }/>
        <Text>Steps Today:</Text>
        <Text>{ this.state.stepsToday || 'loading...' }</Text>
        <Text>Average over {this.state.range} days:</Text>
        <Text>{ this.state.average || 'loading...' }</Text> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    width: 100,
    height: 100,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('walknewv', () => walknewv);