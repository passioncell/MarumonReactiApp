import React, {Component} from 'react';
import {View, StyleSheet, Text, Alert, FlatList, Image, TouchableHighlight} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

const apiBaseUrl = "http://10.0.2.2:3000/";

export default class ReviewScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      refreshing: false,
      data: [],
      loadFinished: false
    }
  }

  onEndReached = () => {
    console.log('onEndReached');
    let nextPageNumber = this.state.pageNumber + 1;
    let loadCount = 10;

    if (this.state.loadFinished == false) {
      this.setState({pageNumber: nextPageNumber, loading: true});
      this._getReviewList(this.state.pageNumber)
        .then((result) => {
          console.log("onEndedReached -> ", result);
          let addedData = this.state.data.concat(result);
          loadCount = result.length;
          this.setState({
            data: addedData,
            loading: false
          });
        })
        .then(() => {
          console.log('loadCount : ' + loadCount);
          if (loadCount <= 0) {
            this.setState({loadFinished: true})
          }
        })
    }
  };

  onRefresh = () => {
    console.log("onRefresh");
    this.setState({
      pageNumber: 1,
      data: [],
      loadFinished: false
    });
    this._getReviewList(1).then((result) => {
      this.setState({data: result})
    })
  };

  _getReviewList = (pageNumber) => {
    const url = apiBaseUrl + 'review/mobile/list?pageNumber=' + pageNumber;
    return fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          error: res.error || null,
          loading: false,
          refreshing: false
        });
        return res;
      })
      .catch((error) => {
        this.setState({error, loading: false})
      })
  };

  render() {
    return (
      <List style={{flex: 1}}>
        <FlatList
          data={this.state.data}
          initialNumToRender={5}
          onEndReachedThreshold={1}
          onEndReached={this.onEndReached}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          renderItem={({item}) => {
            return (
              <ReviewListItem
                id={item.id}
                title={item.title}
                content={item.content}
                name={item.name}
                category={item.category}
                ragion={item.ragion}
                method={item.method}
                detailLinkUrl={item.detailLinkUrl}
                thumnail={item.thumnailImage}
                coverImage={item.coverImage}
                writtenDate={item.writtenDate}
              />
            );
          }}
        />
      </List>
    );
  }

  componentDidMount() {
    this._getReviewList(this.state.pageNumber).then((result) => {
      this.setState({data: result})
    })
  }

}

class ReviewListItem extends Component {
  render() {
    return (
      <View style={{padding: 10, flexDirection: 'row'}}>
        <TouchableHighlight onPress={() => {
          Actions.reviewDetail(this.props)
        }}>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: apiBaseUrl + 'uploads/thumnail/' + this.props.thumnail}}/>
        </TouchableHighlight>
        <View style={{flexDirection: 'column', padding: 10}}>
          <Text style={{marginBottom: 2}}>{this.props.title}</Text>
          <Text style={{marginBottom: 2}}>{this.props.category}</Text>
          <Text>{this.props.ragion}</Text>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});