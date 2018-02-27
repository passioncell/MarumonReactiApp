import React, {Component} from 'react';

import {View, Text} from 'react-native';

import TabView from "./app/scene/MainTabScene";
type Props = {};



export default class App extends Component<Props> {

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <TabView/>
      </View>
    );
  }
}

