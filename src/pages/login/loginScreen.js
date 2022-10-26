/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ViewCustom from '../../components/viewCustom';
import StatusBarCustom from '../../components/statusBarCustom';
import {ClipPath, Svg, Ellipse, Rect, Path, Circle} from 'react-native-svg';
import InputTextComponent from '../../components/inputText';
import ButtonComponent from '../../components/button';
import {ColorWhile, ColorMain} from '../../constants/color';
import {requestUserPermission} from '../../utils/permissionUtils';
import {createUser} from './reducers/actions';
import {connect} from 'react-redux';
import toastMessage from '../../utils/toastUtils';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/loading';

const {width, height} = Dimensions.get('window');

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phone: '',
      data: {},
    };
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
  }
  async componentDidMount() {
    const phoneLocal = await AsyncStorage.getItem('@phone');
    this.state.phone = this.setState({phone: phoneLocal});
    const fullNameLocal = await AsyncStorage.getItem('@fullName');
    this.state.fullName = this.setState({fullName: fullNameLocal});

    // console.log('componentDidMount', phoneLocal);
    requestUserPermission();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this._checkEventActions();
    }
  }

  _checkEventActions() {
    // console.log('this.props.isFetched ', this.props.isFetched);
    if (this.props.error === true) {
      toastMessage(this.props.messageError);
    }
    if (this.props.error === false && this.props.isFetched === true) {
      this.props.navigation.dispatch(StackActions.replace('HomeScreen'));
    }
  }

  _renderLoading() {
    // if (this.props.isFetching === true) {
    //   return <ActivityIndicator size="large" color="#0000ff" />;
    // } else {
    //   return null;
    // }
    return <Loading isFetching={this.props.isFetching} />;
  }

  render() {
    return (
      <ViewCustom
        child={
          <View style={{flex: 1}}>
            <StatusBarCustom backgroundColor="#0000" barStyle="light-content" />
            <View style={{justifyContent: 'flex-end'}}>
              <Svg
                height={height / 1.2 - 60}
                width={width}
                style={StyleSheet.absoluteFill}>
                <ClipPath id="clip">
                  <Ellipse
                    cx={width / 2}
                    rx={height / 1.2 - 62}
                    ry={height / 1.2 - 62}
                  />
                </ClipPath>
                {/* <Image
                  preserveAspectRatio="xMidYMid slice"
                  href={require('../../../assets/login_background.jpg')}
                  clipPath="url(#clip)"
                /> */}
                <Rect
                  width={width}
                  height={height}
                  clipPath="url(#clip)"
                  fill={ColorMain}
                />
              </Svg>
            </View>
            {/* <Svg height="100" width="100">
              <Rect x="0" y="0" width="100" height="100" fill="black" />
              <Circle cx="50" cy="50" r="30" fill="yellow" />
              <Circle cx="40" cy="40" r="4" fill="black" />
              <Circle cx="60" cy="40" r="4" fill="black" />
              <Path d="M 40 60 A 10 10 0 0 0 60 60" stroke="black" />
            </Svg> */}

            {/* <Svg
              width="130"
              height="130"
              fill="blue"
              stroke="red"
              color="green"
              viewBox="-16 -16 544 544">
              <Path
                d="M318.37,85.45L422.53,190.11,158.89,455,54.79,350.38ZM501.56,60.2L455.11,13.53a45.93,45.93,0,0,0-65.11,0L345.51,58.24,449.66,162.9l51.9-52.15A35.8,35.8,0,0,0,501.56,60.2ZM0.29,497.49a11.88,11.88,0,0,0,14.34,14.17l116.06-28.28L26.59,378.72Z"
                strokeWidth="32"
              />
              <Path d="M0,0L512,512" stroke="currentColor" strokeWidth="32" />
            </Svg> */}
            <View
              style={{
                justifyContent: 'flex-end',
                flex: 1,
                paddingHorizontal: 20,
              }}>
              <Text style={styles.textTitle}>NHẬP THÔNG TIN</Text>
              {this._renderLoading()}

              <InputTextComponent
                value={this.state.phone}
                onChange={value => {
                  this.state.phone = this.setState({phone: value});
                }}
                keyboardType="phone-pad"
                placeholder="phone"
              />
              <InputTextComponent
                value={this.state.fullName}
                onChange={value => {
                  this.state.fullName = this.setState({fullName: value});
                }}
                placeholder="full name"
              />
              <ButtonComponent
                title="Next"
                styleButton={{marginBottom: '20%'}}
                onTap={() => {
                  this.props.createUser({
                    fullName: this.state.fullName,
                    phone: this.state.phone,
                  });
                  // this.props.navigation.navigate('HomeScreen');
                }}
              />
            </View>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
    backgroundColor: ColorWhile,
  },

  textTitle: {
    color: ColorWhile,
    fontSize: 25,
    marginBottom: ' 30%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  isFetching: state.loginReducer.isFetching,
  isFetched: state.loginReducer.isFetched,
  error: state.loginReducer.error,
  data: state.loginReducer.loginData,
  messageError: state.loginReducer.messageError,
});

const mapDispatchToProps = {
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
