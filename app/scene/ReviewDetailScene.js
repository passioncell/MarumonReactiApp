import React, {Component} from 'react';
import {Text,View, Image, Dimensions, ScrollView, WebView } from 'react-native';
import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-render-html';

const apiBaseUrl = "http://10.0.2.2:3000/";
var {height, width} = Dimensions.get('window');

export default class ReviewDetailScene extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
    }
    this.props = props;
  }


  render(){
    return (
      <View style={{padding:10, backgroundColor:'#fff'}}>
        <ScrollView>
          <Image
            style={{width: width, height: 200}}
            source={{uri: apiBaseUrl+'uploads/cover/'+this.props.coverImage}}
            renderNode={this._renderNode}
          />
          <View style={{padding:10}}>
            <Text style={{marginBottom:5}}>{this.props.id}</Text>
            <Text style={{marginBottom:5}}>{this.props.title}</Text>
            <Text style={{marginBottom:5}}>{this.props.writtenDate}</Text>
            <Text style={{marginBottom:5}}>시공 분류 : {this.props.category}</Text>
            <Text style={{marginBottom:5}}>시공 지역 : {this.props.ragion}</Text>
            <Text style={{marginBottom:5}}>시공 방법 : {this.props.method}</Text>
            <Text style={{marginBottom:5}}>블로그 링크 : {this.props.detailLinkUrl}</Text>
            <HTML html={this.props.content} imagesMaxWidth={Dimensions.get('window').width} />
          </View>
        </ScrollView>
      </View>
    );
  }


  _renderNode = (node, index, siblings, parent, defaultRender) => {
    if(node.name == 'img'){
      const a = node.attribs;
      const imageHtml = '<img src="${a.src}" width="${a.width}" height="${a.height}">';
      return (
        <View key={index} style={{width: width, height: height}}>
          <WebView source={{html: imageHtml}} />
        </View>
      );
    }
  }
}