import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Button from 'react-native-button';
import {Select, Option} from "react-native-chooser";
import { Actions } from 'react-native-router-flux';


export default class PriceScene extends Component {

  constructor() {
    super();
    this.state = {
      buildInfo: {
        type: '주거시공',
        target: '마루',
        area: {
          type: '공급면적',
          pyung: 18,
          roomEa: 1
        },
        isExtendVeranda: false,
        nowBuildState: false,
        residentialEnv: '가구 없음',
        selectedChoice: ''
      }
    }
  } // constructor();;

  // data array
  supplyArea = ['18', '20', '24', '26', '30', '32', '36', '40', '45', '50'];
  execlusiveArea = ['12', '16', '18', '20', '22', '24', '27', '34', '38', '42'];
  maruPrice = [
    [115, 85, 195, 200],
    [150, 110, 270, 290],
    [170, 125, 300, 325],
    [190, 140, 340, 360],
    [210, 155, 360, 395],
    [230, 170, 390, 430],
    [250, 190, 435, 485],
    [320, 240, 540, 600],
    [360, 265, 600, 680],
    [400, 290, 650, 755]
  ];
  jangpanPrice = [
    [33, 39, 50, 62, 72, 90, 120],
    [45, 53, 65, 83, 96, 120, 160],
    [50, 59, 70, 93, 108, 135, 180],
    [55, 65, 80, 105, 120, 150, 200],
    [60, 73, 90, 115, 132, 165, 220],
    [70, 79, 95, 125, 144, 180, 240],
    [75, 89, 110, 140, 162, 200, 270],
    [95, 110, 135, 177, 204, 255, 340],
    [105, 125, 150, 197, 223, 185, 380],
    [120, 138, 170, 220, 250, 315, 420]
  ];
  decotilePrice = [
    [42, 60, 89],
    [56, 80, 116],
    [63, 90, 130],
    [70, 100, 150],
    [77, 110, 163],
    [84, 120, 178],
    [95, 135, 200],
    [120, 170, 245],
    [133, 190, 270],
    [147, 210, 300]
  ];

  _setBuildType = (value) => {
    let {buildInfo} = this.state;
    buildInfo.type = value;
    this.setState({buildInfo});
  };

  _setBuildTarget = (value) => {
    let {buildInfo} = this.state;
    buildInfo.target = value;
    this.setState({buildInfo});
  };

  _setAreaType = (value) => {
    let {buildInfo} = this.state;
    buildInfo.area.type = value;
    this.setState({buildInfo});

    if (buildInfo.area.type === '공급면적') {
      buildInfo.area.pyung = this.supplyArea[0];
    } else {
      buildInfo.area.pyung = this.execlusiveArea[0];
    }
  };

  _setExtendVerand = (value) => {
    let {buildInfo} = this.state;
    buildInfo.isExtendVeranda = value;
    this.setState({buildInfo});
  };

  _setResidentialEnv = (value) => {
    let {buildInfo} = this.state;
    buildInfo.residentialEnv = value;
    this.setState({buildInfo});
  };

  _setNowBuildState = (value) => {
    console.log('_setNowBuildState : ' + value)
    let {buildInfo} = this.state;
    buildInfo.nowBuildState = value;
    this.setState({buildInfo});
  };

  _areaOnSelect(value, label) {
    let {buildInfo} = this.state;
    buildInfo.area.pyung = value;
    this.setState({buildInfo});

    console.log(buildInfo);


  }

  _roomEaOnSelect(value, label) {
    let {buildInfo} = this.state;
    buildInfo.area.roomEa = value;
    this.setState({buildInfo});
  }


  _renderPriceResult(target, resultPriceArr) {
    console.log(target, resultPriceArr);


    switch (target) {
      case '마루':
        return (
          <View style={styles.PriceResultBox}>
            <View>
            {resultPriceArr.map((item, key) => (
              <View>
                <Button
                  key={key}
                  style={styles.PriceResultBtn}
                  onPress = {this._getMaruClickEvent.bind(this, key)}
                >
                  {key == 0 ? '강마루 - ' : null}
                  {key == 1 ? '강화마루 - ' : null}
                  {key == 2 ? '헤링본 - ' : null}
                  {key == 3 ? '온돌마루 - ' : null}
                  {item} 만원
                </Button>
              </View>
              )
            )}
            </View>
          </View>
        );
      case '장판':
        return (
          <View style={styles.PriceResultBox}>
            {resultPriceArr.map((item, key) => (
              <Text
                key={key}
                style={styles.PriceResultBtn}
                onPress = {this._getJangpanClickEvent.bind(this, key)}
              >
                {key == 0 ? '1.8mm - ' : null}
                {key == 1 ? '2.0mm - ' : null}
                {key == 2 ? '2.2mm - ' : null}
                {key == 3 ? '2.5mm - ' : null}
                {key == 4 ? '3.0mm - ' : null}
                {key == 5 ? '4.5mm - ' : null}
                {key == 6 ? '6.0mm - ' : null}
                {item} 만원 </Text>)
            )}
          </View>
        );
      case '데코타일':
        return (
          <View style={styles.PriceResultBox}>
            {resultPriceArr.map((item, key) => (
              <Text key={key}
                    style={styles.PriceResultBtn}
                    onPress = {this._getDecotileClickEvent.bind(this, key)}
              >
                {key == 0 ? '일반형 - ' : null}
                {key == 1 ? '고급형 - ' : null}
                {key == 2 ? '헤링본 - ' : null}
                {item} 만원 </Text>)
            )}
          </View>
        );
    }
  }

  _renderPriceRouter(target) {
    targetRowIdx = 0;
    areaType = this.state.buildInfo.area.type;
    resultPriceArr = [];

    if (areaType === '공급면적') {
      for (var i = 0; i < this.supplyArea.length; i++) {
        if (this.supplyArea[i] === this.state.buildInfo.area.pyung) {
          targetRowIdx = i;
        }
      }
    } else {
      for (var i = 0; i < this.execlusiveArea.length; i++) {
        if (this.execlusiveArea[i] === this.state.buildInfo.area.pyung) {
          targetRowIdx = i;
        }
      }
    }

    switch (target) {
      case '마루':
        for (var i = 0; i < this.maruPrice[targetRowIdx].length; i++) {
          resultPriceArr.push(this.maruPrice[targetRowIdx][i]);
        }
        break;
      case '장판':
        for (var i = 0; i < this.jangpanPrice[targetRowIdx].length; i++) {
          resultPriceArr.push(this.jangpanPrice[targetRowIdx][i]);
        }
        break;
      case '데코타일':
        for (var i = 0; i < this.decotilePrice[targetRowIdx].length; i++) {
          resultPriceArr.push(this.decotilePrice[targetRowIdx][i]);
        }
        break;
    }

    return this._renderPriceResult(target, resultPriceArr);
  }


  _setAndRoute = (value) => {
    let {buildInfo} = this.state;
    buildInfo.selectedChoice = value;
    this.setState({buildInfo});

    Actions.ConsultScene({buildInfo:buildInfo});
  };

  _getMaruClickEvent = (key) => {
    switch(key){
      case 0:
        return (
          this._setAndRoute('강마루')
        );
      case 1:
        return (
          this._setAndRoute('강화마루')
        );
      case 2:
        return (
          this._setAndRoute('헤링본')
        );
      case 3:
        return (
          this._setAndRoute('온돌마루')
        );
    }
  };

  _getJangpanClickEvent = (key) => {
    switch(key){
      case 0:
        return (
          this._setAndRoute('1.8mm')
        );
      case 1:
        return (
          this._setAndRoute('2.0mm')
        );
      case 2:
        return (
          this._setAndRoute('2.2mm')
        );
      case 3:
        return (
          this._setAndRoute('2.5mm')
        );
      case 4:
        return (
          this._setAndRoute('3.0mm')
        );
      case 5:
        return (
          this._setAndRoute('4.5mm')
        );
      case 6:
        return (
          this._setAndRoute('6.0mm')
        );

    }
  };

  _getDecotileClickEvent = (key) => {
    switch(key){
      case 0:
        return (
          this._setAndRoute('일반형')
        );
      case 1:
        return (
          this._setAndRoute('고급형')
        );
      case 2:
        return (
          this._setAndRoute('헤링본')
        );
    }
  };

  render() {

    return (
      <ScrollView style={{padding: 10, backgroundColor:'#fff'}}>

        <Text style={styles.titleText}>■ 시공종류</Text>
        <View style={styles.optionLineArea}>
          <Button
            style={this.state.buildInfo.type === '주거시공' ? styles.BuildTypeActiveBtn : styles.BuildTypeBtn}
            onPress={() => this._setBuildType('주거시공')}>
            주거시공
          </Button>
          <Button
            style={this.state.buildInfo.type === '상업시공' ? styles.BuildTypeActiveBtn : styles.BuildTypeBtn}
            onPress={() => this._setBuildType('상업시공')}>
            상업시공
          </Button>
        </View>

        <Text style={styles.titleText}>■ 시공대상</Text>
        <View style={styles.optionLineArea}>
          <Button
            style={this.state.buildInfo.target === '마루' ? styles.BuildTargetActiveBtn : styles.BuildTargetBtn}
            onPress={() => this._setBuildTarget('마루')}>
            마루
          </Button>
          <Button
            style={this.state.buildInfo.target === '장판' ? styles.BuildTargetActiveBtn : styles.BuildTargetBtn}
            onPress={() => this._setBuildTarget('장판')}>
            장판
          </Button>
          <Button
            style={this.state.buildInfo.target === '데코타일' ? styles.BuildTargetActiveBtn : styles.BuildTargetBtn}
            onPress={() => this._setBuildTarget('데코타일')}>
            데코타일
          </Button>
        </View>

        <Text style={styles.titleText}>■ 시공면적</Text>
        <View style={styles.optionLineArea}>
          <Button
            style={this.state.buildInfo.area.type === '공급면적' ? styles.BuildTypeActiveBtn : styles.BuildTypeBtn}
            onPress={() => this._setAreaType('공급면적')}>
            공급면적
          </Button>
          <Button
            style={this.state.buildInfo.area.type === '전용면적' ? styles.BuildTypeActiveBtn : styles.BuildTypeBtn}
            onPress={() => this._setAreaType('전용면적')}>
            전용면적
          </Button>
        </View>


        <Text style={styles.titleText}>■ 면적선택</Text>
        <View style={styles.optionLineArea}>
          <Select
            onSelect={this._areaOnSelect.bind(this)}
            defaultText={this.state.buildInfo.area.pyung + ""}
            style={{borderWidth: 1, borderColor: '#5c34b7', alignItems: 'center', marginTop: 10,borderRadius:7}}
            textStyle={{fontSize:16}}
            backdropStyle={{backgroundColor: "#d3d5d6"}}
            optionListStyle={{backgroundColor: "#F5FCFF"}}
          >
            {(this.state.buildInfo.area.type === '공급면적') ?
              this.supplyArea.map((element, index) => (
                <Option value={element} key={index}>{element}평</Option>
              ))
              :
              this.execlusiveArea.map((element, index) => (
                <Option value={element} key={index}>{element}평</Option>
              ))
            }
          </Select>
        </View>

        <Text style={styles.titleText}>■ 방개수</Text>
        <View style={styles.optionLineArea}>
          <Select
            onSelect={this._roomEaOnSelect.bind(this)}
            defaultText={this.state.buildInfo.area.roomEa + ""}
            style={{borderWidth: 1, borderColor: "#5c34b7", alignItems: 'center', marginTop: 10, borderRadius:7}}
            textStyle={{fontSize:16}}
            backdropStyle={{backgroundColor: "#d3d5d6"}}
            optionListStyle={{backgroundColor: "#F5FCFF"}}
          >
            {['1', '2', '3', '4', '5'].map((element, index) => (
              <Option value={element} key={index}>{element}개</Option>
            ))}
          </Select>
        </View>


        <Text style={styles.titleText}>■ 베란다 확장</Text>
        <View style={styles.optionLineArea}>
          <Button
            style={!this.state.buildInfo.isExtendVeranda ? styles.BuildTypeActiveBtn : styles.BuildTypeBtn}
            onPress={() => this._setExtendVerand(false)}>
            확장 없음
          </Button>
          <Button
            style={this.state.buildInfo.isExtendVeranda ? styles.BuildTypeActiveBtn : styles.BuildTypeBtn}
            onPress={() => this._setExtendVerand(true)}>
            확장 있음
          </Button>
        </View>

        <Text style={styles.titleText}>■ 현재시공상태</Text>
        <View style={styles.optionLineArea}>
          <Button
            style={!this.state.buildInfo.nowBuildState ? styles.BuildTypeActiveBtn : styles.BuildTypeBtn}
            onPress={() => this._setNowBuildState(false)}>
            장판/바닥재 없음
          </Button>
          <Button
            style={this.state.buildInfo.nowBuildState ? styles.BuildTypeActiveBtn : styles.BuildTypeBtn}
            onPress={() => this._setNowBuildState(true)}>
            마루/대리석
          </Button>
        </View>

        <Text style={styles.titleText}>■ 시공당시 주거 환경</Text>
        <View style={styles.optionLineArea}>
          <Button
            style={this.state.buildInfo.residentialEnv === '가구 없음' ? styles.BuildTargetActiveBtn : styles.BuildTargetBtn}
            onPress={() => this._setResidentialEnv('가구 없음')}>
            가구없음
          </Button>
          <Button
            style={this.state.buildInfo.residentialEnv === '가구 있음' ? styles.BuildTargetActiveBtn : styles.BuildTargetBtn}
            onPress={() => this._setResidentialEnv('가구 있음')}>
            가구있음
          </Button>
          <Button
            style={this.state.buildInfo.residentialEnv === '시공당일 이사' ? styles.BuildTargetActiveBtn : styles.BuildTargetBtn}
            onPress={() => this._setResidentialEnv('시공당일 이사')}>
            시공당일이사
          </Button>
        </View>

        <Text style={styles.titleText}>■ 바로견적 결과</Text>
        <View style={{}}>
          {this._renderPriceRouter(this.state.buildInfo.target)}
        </View>


      </ScrollView>
    )
  } //render();;

}


const styles = StyleSheet.create({
  optionLineArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  titleText: {
    fontSize: 20,
    color: '#000',
    justifyContent: 'center',
  },
  BuildTypeBtn: {
    width: 150,
    flex: 1,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 5,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
  },
  BuildTypeActiveBtn: {
    width: 150,
    flex: 1,
    fontSize: 15,
    color: '#5c34b7',
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 5,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#5c34b7',
    justifyContent: 'center',
  },
  BuildTargetBtn: {
    width: 100,
    flex: 1,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 5,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
  },

  BuildTargetActiveBtn: {
    width: 100,
    flex: 1,
    fontSize: 15,
    color: '#5c34b7',
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 5,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#5c34b7',
    justifyContent: 'center',
  },
  PriceResultBox: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
    justifyContent: 'center',
  },
  PriceResultBtn: {
    color: '#fff',
    fontSize: 15,
    backgroundColor: '#5c34b7',
    padding: 10,
    marginBottom: 10,
    borderRadius: 7,
    justifyContent: 'center',
  }
});