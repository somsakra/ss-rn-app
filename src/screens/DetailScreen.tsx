import {Button, View, Text, FlatList, SafeAreaView} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {increment, addAmount} from '../features/counter/counterSlice';
import {getAllNote} from '../features/note/noteSlice';
import {getDog} from '../features/dogs/dogSlice';
import {useEffect} from 'react';

export default function DetailScreen({navigation}: {navigation: any}) {
  const count = useAppSelector(state => state.counter.value);
  const noteDatas = useAppSelector(state => state.note);
  const {notes} = noteDatas.value;

  const dogDatas = useAppSelector(state => state.dog);
  const dogs = dogDatas.value;
  const dispatch = useAppDispatch();

  const handleClickAdd3 = () => {
    dispatch(addAmount(3));
  };

  useEffect(() => {
    const result = dispatch(getDog());
    console.log(result);
  }, []);

  if (dogDatas.loading) return <Text>Loading....</Text>;

  type ItemProps = {title: string};

  const Item = ({title}: ItemProps) => <Text>{title}</Text>;

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{count}</Text>
      <Text>DetailScreen</Text>
      <SafeAreaView>
        <FlatList
          data={DATA}
          renderItem={(item: any) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="+3" onPress={handleClickAdd3} />
    </View>
  );
}
