import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
  TouchableHighlight
} from 'react-native';

import Dimensions from 'Dimensions';

const { height, width } = Dimensions.get('window');

import AppleHealthKit from 'react-native-apple-healthkit';

import CreateTeam from '../createTeam/CreateTeam';
import JoinTeam from '../joinTeam/JoinTeam';
import ViewTeam from '../viewTeam/ViewTeam';
import DopeButton from '../dopeButton/DopeButton';
console.log(DopeButton);

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


export default class StepDataUser extends Component {

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
      // if(false){
      if(available){
        AppleHealthKit.initHealthKit(HKOPTIONS, (err, res) => {
          if(this._handleHKError(err, 'initHealthKit')){
            return;
          }
          this._fetchStepsToday();
          this._fetchStepsHistory();
        });
      } else {
        // wait 1 second and set dummy data for use in sumulator
        const weekOfData = [];
        for (let i = 0; i < this.state.range; i++) {
          weekOfData[i] = { value: this._calcRandomStepCount() };
        }
        setTimeout(() => {
          this.setState({
            stepsToday: this._calcRandomStepCount(),
            stepHistory: weekOfData,
            average: Math.floor(this._calculateAvgFromResponse(weekOfData))
          });
        }, 1000);
      }
    });
  }

  _calcRandomStepCount() {
    return Math.floor(Math.random() * (11000 - 5000 + 1)) + 5000;
  }

  _fetchStepsToday() {
    AppleHealthKit.getStepCount(null, (err, res) => {
      if (this._handleHKError(err, 'getStepCount')) {
        return;
      }
      this.setState({ stepsToday: Math.floor(res.value) });
    });
  }

  _fetchStepsHistory() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - (this.state.range + 1));
    let options = {
      startDate: currentDate.toISOString(),
    };
    AppleHealthKit.getDailyStepCountSamples(options, (err, res) => {
      if (this._handleHKError(err, 'getDailyStepCountSamples')) {
        return;
      }

      this.setState({
        stepHistory: res,
        average: Math.floor(this._calculateAvgFromResponse(res))
      });
    });
  }

  _calculateAvgFromResponse(response) {
     const sumOfAllDays = response.reduce((sum, day) => {
       return sum + day.value;
     }, 0) - this.state.stepsToday;
     return sumOfAllDays / this.state.range;
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

  _handleNavigation = (nextRoute) => {
    this.props.navigator.push(nextRoute);
  };

  render() {
    const createTeamRoute = {
      component: CreateTeam,
      title: 'Create Team',
      // passProps: { myProp: 'bar' }
    };

    const joinTeamRoute = {
      component: JoinTeam,
      title: 'Join Team',
    };

    const viewTeamRoute = {
      component: ViewTeam,
      title: 'View Team',
    };

    return (
      <View style={ styles.container } >
        <Image source={ require('../../assets/infinity.gif') }/>
        <Text>Steps Today:</Text>
        <Text>{ this.state.stepsToday || 'loading...' }</Text>
        <Text>Average over { this.state.range } days:</Text>
        <Text>{ this.state.average || 'loading...' }</Text>
        <DopeButton
          text="Create Team"
          textColor="#f75e5e"
          pressedTextColor="#fff"
          color="#313131"
          pressedColor="#313131"
          onPress={ () => this._handleNavigation(createTeamRoute) }
        />
        <DopeButton
          text="Join Team"
          color="#32d821b0"
          textColor="#000000b0"
          onPress={ () => this._handleNavigation(joinTeamRoute) }
        />
        <DopeButton
          text="View Team"
          pressedColor="#000"
          pressedTextColor="#fff"
          onPress={ () => this._handleNavigation(viewTeamRoute) }
        />
        <DopeButton
          text="Update Steps"
          onPress={ () => this._fetchStepsToday() }
        />
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
  darkGreyFont: {
    color: '#242f33'
  },
});