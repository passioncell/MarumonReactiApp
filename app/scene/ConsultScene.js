import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput, Button} from 'react-native';
import CheckBox from 'react-native-checkbox';

const apiBaseUrl = "http://10.0.2.2:3000/";

export default class ConsultScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buildInfo: props.buildInfo,
      customerName: '',
      customerPhone: '',
      privacy: false,
      errorMsg: '',
      successMsg: ''
    }
  }

  componentDidMount() {
  }

  _setPrivacy = () => {
    this.setState({
      privacy: !this.state.privacy
    });
  };

  _setCustomerName = (text) => {
    this.setState({
      customerName: text
    });
  };

  _setCustomerPhone = (text) => {
    this.setState({
      customerPhone: text
    })
  };



  _sendConsultForm = () => {

    fetch(apiBaseUrl+'estimate/m_consult.do', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        buildInfo: this.state.buildInfo,
        customerName: this.state.customerName,
        customerPhone: this.state.customerPhone
      }),
    })
      .then((response) => {console.log(response)})
      .catch((e) => {console.log(e)})

  };


  _validCheck = () => {
    if (this.state.customerName.length <= 0) {
      this.setState({
        errorMsg: '이름을 입력해주세요.'
      });
      return false;
    }

    if (this.state.customerPhone.length < 4) {
      this.setState({
        errorMsg: '연락처를 입력해주세요.'
      });
      return false;
    }

    if (this.state.privacy == false) {
      this.setState({
        errorMsg: '개인정보수집에 동의해주셔야 합니다.'
      });
      return false;
    }

    this.setState({
      errorMsg: '',
      successMsg: '상담신청이 완료되었습니다.'
    });

    this._customerNameInputText.clear();
    this._customerPhoneInputText.clear();
    this._sendConsultForm();
  };


  render() {
    return (
      <View style={styles.root}>
        <View>
          <Text>고객 성함</Text>
          < TextInput
            onChangeText={this._setCustomerName}
            ref={(component) => this._customerNameInputText = component}
          />

          <Text>고객 연락처</Text>
          < TextInput
            keyboardType="phone-pad"
            onChangeText={this._setCustomerPhone}
            ref={(component) => this._customerPhoneInputText = component}
          />
        </View>


        <View
          style={{marginTop: 30, marginBottom: 20}}
        >
          <CheckBox
            label='개인정보수집동의'
            onChange={this._setPrivacy}
          />
        </View>


        <View style={{marginTop: 10, marginBottom: 10}}>
          <Button
            style={{flex: 1}}
            onPress={this._validCheck}
            title="전송"
            ref={(component) => this._submitBtn = component}
          >
            전송
          </Button>
        </View>

        <View>
          <Text
            style={{color: 'red'}}
          >
            {this.state.errorMsg}
          </Text>
          <Text
            style={{color: 'green'}}
          >
            {this.state.successMsg}
          </Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  root: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff'
  }
});