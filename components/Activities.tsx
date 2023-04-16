import React, { Dispatch } from 'react';
import { Button, ColorValue, StyleSheet, View } from 'react-native';
import { Action, ActionType, ActivityEnum } from '../types/activity.type';

export type ActivityButtonType = {
    name: ActivityEnum,
    color: ColorValue,
}

type Props = { activities: ActivityButtonType[], dispatch: Dispatch<ActionType> }

const ActivitiesButtons = ({ activities, dispatch }: Props) => {
    return (
        <View style={styles.container}>
            {activities.map((activity) => {
                return (
                    <Button
                        key={activity.name}
                        onPress={() => {
                            dispatch({ type: Action.ADD_ACTIVITY, payload: { newActivity: { text: activity.name } } })
                        }}
                        title={activity.name}
                        color={activity.color}
                        accessibilityLabel="Learn more about this purple button"
                    />
                )
            })
            }
        </View>
    )
}

export default ActivitiesButtons

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
});