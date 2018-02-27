import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import PriceRootScene from "./PriceRootScene";
import ReviewRootScene from "./ReviewRootScene";

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};



export default class TabView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'priceRootScene', title: '바로견적'},
        {key: 'reviewRootScene', title: '시공후기'},
      ],
    };
  }

  _handleIndexChange = index => this.setState({index});

  _renderHeader = props => <TabBar {...props} />;

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={SceneMap({
          priceRootScene: () => <PriceRootScene/>,
          reviewRootScene: () => <ReviewRootScene/>,
        })}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 20
  }
});