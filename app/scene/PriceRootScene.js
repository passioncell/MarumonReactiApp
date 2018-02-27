import React, {Component} from 'react';

import {Scene, Router} from 'react-native-router-flux';
import PriceScene from "./PriceScene";
import ConsultScene from "./ConsultScene";
import ReviewRootScene from "./ReviewRootScene";
import ReviewScene from "./ReviewScene";
import {Actions} from "react-native-router-flux";
import {Text} from 'react-native';


export default class PriceRootScene extends Component<Props> {
  render(){
    return (
      <Router key="1">
        <Scene key="root">
          <Scene key="PriceScene" component={PriceScene} title="바로견적" initial={true} />
          <Scene key="ConsultScene" component={ConsultScene} title="상담문의" />
        </Scene>
      </Router>
    );
  }

}