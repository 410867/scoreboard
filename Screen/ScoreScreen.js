import React, { createContext, useContext} from 'react';
import {
    Alert,
    Button,
    SafeAreaView,
    StatusBar,
    StyleSheet, Text,
    View,
} from 'react-native';
import RenderingList from "./Components/RenderingList";

const DataContext = createContext();

const ScoreScreen = () => {
/*    const list = props.list;
    const addItem = props.addItem;
    const removeItem = props.removeItem;*/
    const { data } = useContext(DataContext);

    return (
        <View style={styles.container}>
            <Text style={styles.textName}>{data}</Text>
            <Text style={styles.textName}>1111111111111</Text>
            <Text style={styles.textName}>1111111111111</Text>
            <Text style={styles.textName}>1111111111111</Text>
            <Text style={styles.textName}>1111111111111</Text>
            <Text style={styles.textName}>1111111111111</Text>
{/*          <RenderingList list={list} removeItem={removeItem}/>
          <Button color={'green'} title="Добавити команду" onPress={addItem} />
          <StatusBar style="auto" />*/}
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

export default ScoreScreen;
