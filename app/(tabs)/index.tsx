import { FlatList, StyleSheet } from 'react-native';

import { useReducer } from 'react';
import ActivitiesButtons, { ActivityButtonType } from '../../components/Activities';
import { Text, View } from '../../components/Themed';
import { Action, ActionType, Activities, ActivityEnum } from '../../types/activity.type';

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities</Text>
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
