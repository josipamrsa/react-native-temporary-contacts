import React, { useState } from 'react';
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native';
import * as Icon from 'react-native-feather';

export default function ModalWithBackdrop({ children, isOpen, setIsOpen, header }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => setIsOpen(!isOpen)}>
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Pressable style={styles.close} onPress={() => setIsOpen(!isOpen)}>
                        <Text style={styles.header}>{header}</Text>
                        <Icon.XCircle stroke={"black"} width={34} height={34} />
                    </Pressable>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "50%",
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },

    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        borderRadius: 5,
        padding: 10,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%"
    },

    header: {
        fontSize: 20,
        width: "60%"
    },

    close: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 10,
        marginBottom: 20
    }
});
