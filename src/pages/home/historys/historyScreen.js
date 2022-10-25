import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import ItemHistory from '../../../components/itemHistory';
import {useSelector, useDispatch} from 'react-redux';
import {getAllHistory} from './reducers/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = ({navigation}) => {
  const stateHistory = useSelector(state => state.historyReducer);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    dispatch(getAllHistory());
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onTapItem = async ({historyId, data}) => {
    const currentPhone = await AsyncStorage.getItem('@phone');
    navigation.push('ChatScreen', {
      fullName: data.fullName,
      phone: data.phone,
      senderPhone: data.senderPhone,
      currentPhone: currentPhone,
      historyId: historyId,
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      setRefreshing(false);
      dispatch(getAllHistory());
    });
  }, [dispatch]);

  return (
    <View style={styles.containerListView}>
      <FlatList
        data={stateHistory.listData}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        renderItem={({item}) => (
          <ItemHistory
            item={item}
            onPress={(historyId, data) => {
              console.log('ItemHistory', historyId);
              console.log('ItemHistory', data);
              onTapItem({historyId: historyId, data: data});
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerListView: {
    margin: 10,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default HistoryScreen;
