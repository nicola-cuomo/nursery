import { FlatList, StyleSheet } from 'react-native';

import { useEffect, useReducer, useState } from 'react';
import ActivitiesButtons, { ActivityButtonType } from '../../components/Activities';
import { Text, View } from '../../components/Themed';
import { Action, ActionType, Activities, ActivityEnum } from '../../types/activity.type';
import axios from 'axios';

const initialState: ActivityButtonType[] = [{ name: ActivityEnum.WAKE_UP, color: 'red' }, { name: ActivityEnum.BIBERON, color: 'blue' }];

function reducer(prevState: Activities, action: ActionType): Activities {
  switch (action.type) {
    case Action.ADD_ACTIVITY:
      return [...prevState, action.payload];

    default:
      return prevState;
  }
}

export default function TabOneScreen() {
  const [state, dispatch] = useReducer(reducer, []);
  const [example, setExample] = useState('');

  useEffect(() => {
    const result = axios.get('https://nursery.up.railway.app/');

    result.then((res) => {
      setExample(res.data);
    }
    ).catch((err) => {
      console.log(err);
    });
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities</Text>
      <Text style={styles.title}>{example ? example : '...loading'}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ActivitiesButtons activities={initialState} dispatch={dispatch} />
      <FlatList
        data={state}
        renderItem={({ item }) => <Text >{item.name}</Text>}
        keyExtractor={item => item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
