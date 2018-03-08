import React, {Component} from 'react';
import {WebView} from 'react-native';
import {getReviewDetailPage} from '../api/base';

export default class ReviewDetailScene extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {};
    this.props = props;
  }


  render() {
    return (
      <WebView
        source={{ uri: getReviewDetailPage(this.props.id) }}
        style={{flex:1}}
      />
    );
  }

}