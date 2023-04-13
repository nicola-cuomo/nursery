import { Button, DatePickerIOS, DatePickerIOSComponent, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Activity } from '../types/activity.type'
import { getColor } from '../app/(tabs)/initial'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Props = {
    activity: Activity
}

const ActivityItem = ({ activity }: Props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [newTime, setNewTime] = useState<Date>(new Date());

    const handleItemPress = () => {
        // setSelectedItemIndex(index);
        // setNewTime(items[index].time);
        setModalVisible(true);
    };

    const handleTimeInputChange = (date: DateTimePickerEvent) => {
        setNewTime(new Date(date.nativeEvent.timestamp ?? newTime.getTime()));
    };

    const handleModalSavePress = () => {
        // items[selectedItemIndex].time = newTime;
        setModalVisible(false);
    };
    return (
        <TouchableOpacity style={[styles.itemContainer, { backgroundColor: getColor(activity.name) }]} onPress={() => handleItemPress()} >
            <Text style={styles.itemText}>{activity.name}</Text>
            <Text style={styles.itemTime}>{'10:30'}</Text>
            <Modal visible={modalVisible} transparent animationType="fade">
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Select new time:</Text>
                    <DateTimePicker value={newTime} mode='time' minuteInterval={5} onChange={handleTimeInputChange} />
                    {/* <TextInput style={styles.modalInput} value={newTime} onChangeText={handleTimeInputChange} placeholder="HH:MM" /> */}
                    <TouchableOpacity style={styles.modalButton} onPress={handleModalSavePress}>
                        <Text style={styles.modalButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

export default ActivityItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    itemContainer: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    itemTime: {
        fontSize: 14,
        color: '#FFF',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        padding: 10,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
});