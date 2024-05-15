import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from "react";
import ColorsScreen from "./ColorsScreen";

export default function RenderingList(props) {
    const list = props.list;
    const removeItem = props.removeItem;

    function RenderingList(list) {
        return list.map((item, index) => {
            return(
                <View style={styles.containerItem} key={index}>
                    <View style={styles.containerText}><Text style={styles.textSize}>{item.name}</Text></View>
                    <View style={styles.containerText}><Text style={styles.textSize}>{item.count}</Text></View>
                    <View style={styles.containerText}>
                        {
                            index === 0 ?
                                <Text style={styles.textDelete}>Видалити</Text> :
                                <TouchableOpacity style={styles.buttonDelete} onPress={() => removeItem(item.id)}>
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            );
        });
    }

    return (
        <View style={styles.containerList}>
            {RenderingList(list)}
        </View>
    );
}

const styles = StyleSheet.create({
    containerList: {
        width: '100%',
        alignItems: 'flex-start',
        gap: 20,
        marginBottom: 20,
    },

    containerItem: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },

    containerText: {
        width: 90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textSize: {
        fontSize: 15,
    },

    textDelete: {
        fontSize: 15,
    },

    buttonDelete: {
        alignItems: 'center',
    },

    buttonText: {
        color: "red",
        fontSize: 40,
        transform: "rotate(45deg)",
    },

});
