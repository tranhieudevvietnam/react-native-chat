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
import {ColorWhite} from '../../constants/color';
import ItemMessageTheir from './components/itemMessageTheir';
import InputMessage from './components/inputMessage';
import ViewCustom from '../../components/viewCustom';
import {useSelector, useDispatch} from 'react-redux';
import {
  onMessages,
  getOneUserByPhone,
  getAllMessages,
} from './reducers/actions';
import ItemMessageMine from './components/itemMessageMine';
import Loading from '../../components/loading';

const ChatScreen = ({navigation, route}) => {
  const {fullName, phone, senderPhone, currentPhone, historyId} = route.params;
  const stateChat = useSelector(state => state.chatReducer);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  const refContainer = React.useRef();

  const [keyboardStatus, setKeyboardStatus] = React.useState(undefined);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      setRefreshing(false);
      // setIndexCurrent(indexCurrent + 10);
      // dispatch(
      //   getAllMessages({
      //     index: indexCurrent + 10,
      //     historyId: historyId ?? stateChat.historyId,
      //   }),
      // );
    });
  }, []);

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
      refContainer.current.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  }, [stateChat, keyboardStatus]);

  React.useEffect(() => {
    dispatch(getOneUserByPhone({phoneString: phone}));
  }, []);

  React.useEffect(() => {
    dispatch(
      onMessages({
        phoneString: phone,
        senderPhoneString: senderPhone ?? currentPhone,
      }),
    );
  }, [stateChat.historyId]);

  React.useEffect(() => {
    // console.log('stateChat.historyId', stateChat.historyId);
    dispatch(
      getAllMessages({index: 10, historyId: historyId ?? stateChat.historyId}),
    );
  }, [stateChat.historyId]);

  return (
    <ViewCustom>
      <View style={styles.container}>
        <AppBar>
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
        </AppBar>
        <SafeAreaView style={{flex: 1}}>
          {/* <Loading isFetching={refreshing} /> */}

          {/* <ScrollView>
              {stateChat.listMessages.forEach(item => {
                if (item !== undefined) {
                  // console.log('itemChat: ', item);
                  // console.log('itemChat: ', Object.keys(item)[0]);
                  const data = item[Object.keys(item)[0]];
                  if (data.senderPhone === currentPhone) {
                    return (
                      <ItemMessageMine
                        item={data}
                        onLongPress={() => {
                          console.log('onLongPress', Object.keys(item)[0]);
                        }}
                      />
                    );
                  } else {
                    return (
                      <ItemMessageTheir
                        item={data}
                        onLongPress={() => {
                          console.log('onLongPress', Object.keys(item)[0]);
                        }}
                      />
                    );
                  }
                }
              })}
            </ScrollView> */}
          <FlatList
            style={{
              flex: 1,
              paddingHorizontal: 10,
              marginBottom: 10,
              paddingBottom: 10,
            }}
            ref={refContainer}
            inverted={true}
            showsHorizontalScrollIndicator={false}
            data={stateChat.listMessages}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
              onRefresh();
            }}
            // onScrollEndDrag={() => {
            //   console.log('end');
            //   onRefresh();
            // }}
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
                // console.log('itemChat: ', item);
                // console.log('itemChat: ', Object.keys(item)[0]);
                const data = item[Object.keys(item)[0]];
                if (data.senderPhone === currentPhone) {
                  return (
                    <ItemMessageMine
                      item={data}
                      onLongPress={() => {
                        console.log('onLongPress', Object.keys(item)[0]);
                      }}
                    />
                  );
                } else {
                  return (
                    <ItemMessageTheir
                      item={data}
                      onLongPress={() => {
                        console.log('onLongPress', Object.keys(item)[0]);
                      }}
                    />
                  );
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
            deviceTokenString={stateChat.deviceToken}
          />
        </SafeAreaView>
      </View>
    </ViewCustom>
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
    color: ColorWhite,
    fontWeight: 'bold',
  },
  textSub: {
    color: ColorWhite,
    opacity: 0.5,
  },
});

export default ChatScreen;
