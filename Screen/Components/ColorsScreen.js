import React from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';

const colors = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Blue', hex: '#0000FF' },
    // Другие цвета...
];

const ColorItem = ({ hex }) => (
    <Button color={hex} title="    ">
        <View style={[styles.colorItem, { backgroundColor: hex }]}>
{/*            <Text style={styles.colorName}>{name}</Text>
            <Text style={styles.colorHex}>{hex}</Text>*/}
        </View>
    </Button>
);

const ColorsScreen = () => {
    return (
        <ColorItem hex={'#FF0000'} />
        /*<FlatList
            data={colors}
            renderItem={({ item }) => <ColorItem name={item.name} hex={item.hex} />}
            keyExtractor={(item) => item.name}
        />*/
    );
};

const styles = StyleSheet.create({
    colorItem: {
        padding: 10,
        alignItems: 'center',
    },
    colorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    colorHex: {
        fontSize: 14,
        color: 'white',
    },
});

export default ColorsScreen;
