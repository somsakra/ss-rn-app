import {Button, View, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {increment, addAmount} from '../features/counter/counterSlice';
import React from 'react';

export default function HomeScreen({navigation}: {navigation: any}) {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  const handleClickAdd = () => {
    dispatch(increment());
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{count}</Text>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Detail');
        }}
      />
      <Button title="Add" onPress={handleClickAdd} />
    </View>
  );
}
