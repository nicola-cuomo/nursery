import { RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useReducer, useState } from 'react';
import ActivitiesButtons from '../../components/Activities';
import ActivityItem from '../../components/ActivityItem';
import { Text, View } from '../../components/Themed';
import { Action, ActionType, Activities, Activity } from '../../types/activity.type';
import { initialState } from './initial';
import trpc from '../utils/trpc';


export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState(true);
  const queryClint = useQueryClient();
  const mutation = useMutation((data: string) => trpc.addActivity.mutate(data))

  const reducer = (prevState: Activities, action: ActionType): Activities => {
    switch (action.type) {
      case Action.ADD_ACTIVITY:
        action.payload.newActivity && mutation.mutate(action.payload.newActivity.text, {
          onSuccess: (data) => {
            queryClint.invalidateQueries(['activities']);
          }
        });
        return prevState;
      case Action.INITIALIZE:
        return action.payload.activities ?? [];
      default:
        return prevState;
    }
  }
  const [state, dispatch] = useReducer(reducer, []);

  useQuery(['activities'], () => trpc.getActivities.query(), {
    onSuccess: (data) => {
      dispatch({ type: Action.INITIALIZE, payload: { activities: data } });
      setRefreshing(false);
    },
    onError: (error) => {
      console.log(error);
    }
  });


  const onRefresh = () => {
    setRefreshing(true);
    queryClint.invalidateQueries(['activities']);
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text style={styles.title}>Activities</Text>
        <Text style={styles.title}>{mutation.isLoading && '...loading'}</Text>
        <View style={styles.separator} lightColor="gray" darkColor="rgba(255,255,255,0.1)" />
        <ActivitiesButtons activities={initialState} dispatch={dispatch} />
        {state.map((activity) => <ActivityItem key={activity.id} activity={activity} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
