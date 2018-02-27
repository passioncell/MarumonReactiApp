import React, {Component} from 'react';

import {Scene, Router} from 'react-native-router-flux';
import PriceScene from "./PriceScene";
import ConsultScene from "./ConsultScene";
import ReviewRootScene from "./ReviewRootScene";
import ReviewScene from "./ReviewScene";
import {Actions} from "react-native-router-flux";


export default class PriceRootScene extends Component<Props> {
  render(){
    return (
      <Router>
        <Scene key="root">
          <Scene key="PriceScene" component={PriceScene} title="바로견적" initial={true} />
          <Scene key="ConsultScene" component={ConsultScene} title="상담문의" />
          <Scene key="ReviewScene" component={ReviewScene} title="시공후기"/>
        </Scene>
      </Router>
    );
  }

}