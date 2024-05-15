import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimeExample1 = () => {
    const currentTime = new Date();

    // Получаем текущее время в формате часы:минуты:секунды
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    return (
        <View style={styles.container}>
            <Text style={styles.time}>
                Текущее время: {hours < 10 ? '0' : ''}{hours}:{minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    time: {
        fontSize: 24,
    },
});

export default TimeExample1;
