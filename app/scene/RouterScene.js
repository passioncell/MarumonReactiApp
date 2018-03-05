import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {Text} from 'react-native';
import PriceScene from './PriceScene';
import ConsultScene from './ConsultScene';
import ReviewScene from './ReviewScene';
import ReviewDetailScene from './ReviewDetailScene';


export default class RouterScene extends Component {

  render(){
    const TabIcon = ({ focused, title }) => {
      return (
        <Text style={{color: focused ? 'white' :'#5c34b7'}}>{title}</Text>
      );
    };

    return (
      <Router>
        <Scene key="root" hideNavBar='true'>
          <Scene
            key="tabbar"
            tabs={true}
            tabBarStyle='red'
            activeBackgroundColor = '#5c34b7'
            showLabel={false}
          >
            {/*PriceRoot*/}
            <Scene key="priceRoot" title="바로견적" icon={TabIcon}>
              <Scene 
                key="price"
                component={PriceScene}
                title="바로견적"
                initial
              />
              <Scene
                key="consult"
                component={ConsultScene}
                title="상담문의"
              />
            </Scene>

            {/*ReviewRoot*/}
            <Scene key="reviewRoot" title="시공후기" icon={TabIcon}>
              <Scene
                key="review"
                component={ReviewScene}
                title="시공후기"
                initial
              />
              <Scene
                key="reviewDetail"
                component={ReviewDetailScene}
                title="시공후기 상세보기"
              />
            </Scene>


          </Scene>
        </Scene>
      </Router>
    );
  }

}
