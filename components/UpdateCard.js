import React, { useState } from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import * as Icon from 'react-native-feather';
import ContactRow from './ContactRow';
import UpdateContact from './UpdateContact';

export default function UpdateCard({ contact, uid, updateContact, deleteContact }) {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <View key={uid} style={styles.container}>
            <ContactRow contact={contact} setIsEdit={setIsEdit} deleteContact={deleteContact} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isEdit}
                onRequestClose={() => setIsEdit(!isEdit)}>
                <View style={styles.modal}>
                    <UpdateContact contact={contact} setIsEdit={setIsEdit} update={updateContact} />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.close}
                            onPress={() => setIsEdit(!isEdit)}>
                            <Icon.X stroke={"black"} />
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: "#f3f3f3",
        margin: 4,
        padding: 10,
        borderRadius: 10,
    },

    modal: {
        flex: 1,
        justifyContent: "center",
        width: "90%",
        margin: "5%",
        height: "50%",
        padding: 20
    },

    buttonContainer: { 
        justifyContent: "center" ,
        alignItems: "center"
    },

    close: {
        backgroundColor: "darkgray",
        padding: 20,
        marginTop: 10,
        width: "23%",
        borderRadius: 50
    },
});
