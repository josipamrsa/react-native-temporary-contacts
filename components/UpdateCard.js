import React, { useState } from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import * as Icon from 'react-native-feather';
import ContactRow from './ContactRow';
import UpdateContact from './UpdateContact';
import ModalWithBackdrop from './ModalWithBackdrop';

export default function UpdateCard({ contact, uid, updateContact, deleteContact }) {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <View key={uid} style={styles.container}>
            <ContactRow contact={contact} setIsEdit={setIsEdit} deleteContact={deleteContact} />
            <ModalWithBackdrop isOpen={isEdit} setIsOpen={setIsEdit} header={"Update contact basic data"}>
                <UpdateContact contact={contact} setIsEdit={setIsEdit} update={updateContact} />
            </ModalWithBackdrop>
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
});
