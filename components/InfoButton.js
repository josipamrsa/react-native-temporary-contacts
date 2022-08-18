import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, Modal } from 'react-native';
import * as Icon from 'react-native-feather';

export default function InfoButton(props) {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <View>
            <Pressable style={styles.container} onPress={() => setShowHelp(true)}>
                <Icon.HelpCircle stroke="white" width={38} height={38} />
            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showHelp}
                onRequestClose={() => setShowHelp(!showHelp)}>
                <Pressable style={styles.modal} onPress={() => setShowHelp(false)}>
                    <Text>
                        <View style={styles.info}>
                            <Icon.Edit stroke="black" />
                            <Text>Edit basic contact details (name, phone, description, location)</Text>
                        </View>
                        <View style={styles.info}>
                            <Icon.Trash2 stroke="black" />
                            <Text>Delete contact from the app itself</Text>
                        </View>
                        <View style={styles.info}>
                            <Icon.Clock stroke="black" />
                            <Text>Set a new expiry date for this contact</Text>
                        </View>
                    </Text>
                </Pressable>
            </Modal >

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "darkgray",
        borderRadius: 50,
        padding: 10
    },

    modal: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: "45%",
        marginLeft: "10%",
        width: "80%",
        padding: 20,
        backgroundColor: "white"
    },

    info: {
        flexDirection: "row",
        width: "50%"
    }

});
