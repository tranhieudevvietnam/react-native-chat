/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Keyboard,
} from 'react-native';
import React from 'react';
import AppBar from '../../components/appBar';
import Avatar from '../../components/avatar';
import {ColorWhile} from '../../constants/color';
import ItemMessageTheir from './components/itemMessageTheir';
import InputMessage from './components/inputMessage';
import ViewCustom from '../../components/viewCustom';
import {useSelector, useDispatch} from 'react-redux';
import {onMessages} from './reducers/actions';
import ItemMessageMine from './components/itemMessageMine';

const ChatScreen = ({navigation, route}) => {
  const {fullName, phone, currentPhone, historyId} = route.params;
  const stateChat = useSelector(state => state.chatReducer);
  const refContainer = React.useRef();
  const dispatch = useDispatch();

  const [keyboardStatus, setKeyboardStatus] = React.useState(undefined);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      // console.log('Keyboard Shown');
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      // console.log('Keyboard Hidden');
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  React.useEffect(() => {
    if (stateChat.listMessages.length > 0) {
      // const count = stateChat.listMessages.length - 1;
      // console.log('stateChat.listMessages: ', stateChat.listMessages.length);
      // console.log('countScroll: ', countScroll);
      refContainer.current.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  }, [stateChat, keyboardStatus]);

  React.useEffect(() => {
    dispatch(onMessages({phoneString: phone}));
  }, [dispatch, phone]);

  return (
    <ViewCustom
      child={
        <View style={styles.container}>
          <AppBar
            child={() => (
              <View style={styles.containerAppBar}>
                <TouchableOpacity
                  style={styles.touchButtonBack}
                  onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../../../assets/icons/icon_back.png')}
                    style={styles.iconBack}
                  />
                </TouchableOpacity>
                <Avatar style={{marginRight: 10, width: 42, height: 42}} />
                <View>
                  <Text style={styles.textTitle}>{fullName}</Text>
                  <Text style={styles.textSub}>{phone}</Text>
                </View>
              </View>
            )}
          />
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              style={{flex: 1, paddingHorizontal: 10, marginBottom: 30}}
              ref={refContainer}
              inverted={true}
              data={stateChat.listMessages}
              keyExtractor={(item, index) => index.toString()}
              onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  refContainer.current?.scrollToIndex({
                    index: info.index,
                    animated: true / false,
                  });
                });
              }}
              renderItem={({item}) => {
                if (item !== undefined) {
                  if (item.senderPhone === currentPhone) {
                    return <ItemMessageMine item={item} />;
                  } else {
                    return <ItemMessageTheir item={item} />;
                  }
                }
              }}
            />

            {/* <ItemMessageTheir />
          <ItemMessageMine /> */}
            <InputMessage
              fullNameString={fullName}
              phoneString={phone}
              historyId={historyId ?? stateChat.historyId}
            />
          </SafeAreaView>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAppBar: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBack: {
    width: 11,
    height: 20,
  },
  touchButtonBack: {
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textTitle: {
    fontSize: 18,
    color: ColorWhile,
    fontWeight: 'bold',
  },
  textSub: {
    color: ColorWhile,
    opacity: 0.5,
  },
});

export default ChatScreen;
