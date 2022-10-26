import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ItemContact from '../../../components/itemContact';
import {getAllUsers} from './reducers/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactScreen = ({navigation}) => {
  const stateContact = useSelector(state => state.contactReducer);
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // React.useEffect(() => {
  //   console.log('contactData', stateContact);
  // }, [stateContact]);

  const onTapItem = async ({data}) => {
    const currentPhone = await AsyncStorage.getItem('@phone');

    navigation.push('ChatScreen', {
      fullName: data.fullName,
      phone: data.phone,
      senderPhone: data.senderPhone ?? currentPhone,
      currentPhone: currentPhone,
      historyId: null,
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      setRefreshing(false);
      dispatch(getAllUsers());
    });
  }, []);

  return (
    <View style={styles.containerListView}>
      <FlatList
        data={stateContact.listContacts}
        onRefresh={() => onRefresh()}
        showsHorizontalScrollIndicator={false}
        refreshing={refreshing}
        renderItem={({item}) => (
          <ItemContact
            item={item}
            onPress={() => {
              // console.log('log', item);
              onTapItem({data: item});
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
});

export default ContactScreen;
