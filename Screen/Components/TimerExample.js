import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Countdown from 'react-native-countdown-component';

const TimerExample = () => {
    const handleFinish = () => {
        // Действия по окончании обратного отсчета
        console.log('Countdown finished');
    };

    return (
        <View style={styles.container}>
            <Countdown
                until={20} // время в секундах
                onFinish={handleFinish}
                size={20}
                digitStyle={styles.digitStyle}
                digitTxtStyle={styles.digitTxtStyle}
                timeToShow={['M', 'S']}
                timeLabels={{ m: 'MM', s: 'SS' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    digitStyle: {
        backgroundColor: '#000',
        borderWidth: 2,
        borderColor: '#1CC625',
    },
    digitTxtStyle: {
        color: '#1CC625',
    },
});

export default TimerExample;
