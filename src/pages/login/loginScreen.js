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
import {ClipPath, Svg, Ellipse, Rect} from 'react-native-svg';
import InputTextComponent from '../../components/inputText';
import ButtonComponent from '../../components/button';
import {ColorWhile, ColorMain} from '../../constants/color';
import {requestUserPermission} from '../../utils/permissionUtils';
import {createUser} from './reducers/actions';
import {connect} from 'react-redux';
import toastMessage from '../../utils/toastUtils';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    // console.log('this.props.error  ', this.props.error);
    if (this.props.error === true) {
      toastMessage(this.props.data.message);
    }
    if (this.props.error === false && this.props.isFetched === true) {
      this.props.navigation.dispatch(StackActions.replace('HomeScreen'));
    }
  }

  _renderLoading() {
    if (this.props.isFetching === true) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return null;
    }
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
});

const mapDispatchToProps = {
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
