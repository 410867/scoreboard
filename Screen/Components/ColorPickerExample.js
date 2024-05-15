/*
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import ColorPicker from 'react-native-color-picker';

const ColorPickerExample = () => {
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('#FFFFFF');

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const onColorChange = (newColor) => {
        setColor(newColor);
        hideDialog();
    };

    return (
        <View style={styles.container}>
            <Button onPress={showDialog}>Open Color Picker</Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Select a color</Dialog.Title>
                    <Dialog.Content>
                        <ColorPicker
                            color={color}
                            onColorChange={onColorChange}
                            style={styles.colorPicker}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    colorPicker: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
});

export default ColorPickerExample;
*/
