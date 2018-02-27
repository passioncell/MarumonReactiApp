import React, {Component} from 'react';
import {Text} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import ReviewScene from "./ReviewScene";
import ReviewDetailScene from "./ReviewDetailScene"


export default class ReviewRootScene extends Component<Props> {
  render(){
    return (
      <Router key="2">
        <Scene key="root">
          <Scene key="ReviewScene" component={ReviewScene} title="ReviewScene" initial={true} />
          <Scene key="ReviewDetailScene" component={ReviewDetailScene} title="ReviewDetailScene" />
        </Scene>
      </Router>
    );

  }

  componentDidMount(){
    // Actions.ReviewScene();
  }
}