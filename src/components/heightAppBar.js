import {NativeModules, StatusBarIOS} from 'react-native';
const {StatusBarManager} = NativeModules;

const componentDidMount = () => {
  // eslint-disable-next-line no-undef
  if (Platform.OS === 'ios') {
    StatusBarManager.getHeight(response =>
      this.setState({statusBarHeight: response.height}),
    );

    this.listener = StatusBarIOS.addListener(
      'statusBarFrameWillChange',
      statusBarData =>
        this.setState({statusBarHeight: statusBarData.frame.height}),
    );
  }
};

const componentWillUnmount = () => {
  // eslint-disable-next-line no-undef
  if (Platform.OS === 'ios' && this.listener) {
    this.listener.remove();
  }
};

export {componentDidMount, componentWillUnmount};
