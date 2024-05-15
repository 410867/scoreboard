import React from 'react';
import {
    Button,
    StyleSheet, Text,
    View,
} from 'react-native';

const MatchesScreen = (props) => {
    return (
        <View style={styles.container}>
            <Button color={'green'} title="Добавити команду" onPress={addItem}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
    },

    textName: {

    },
});

export default MatchesScreen;
