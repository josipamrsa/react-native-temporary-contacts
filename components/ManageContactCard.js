import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Icon from 'react-native-feather';
import ContactRow from './ContactRow';
import UpdateContact from './UpdateContact';
import ModalWithBackdrop from './ModalWithBackdrop';

export default function ManageContactCard({ contact, uid, updateContact, deleteContact }) {
    const [isEdit, setIsEdit] = useState(false);
    /* const [isDelete, setIsDelete] = useState(false); */
    const [isProlong, setIsProlong] = useState(false);

    return (
        <View key={uid} style={styles.container}>
            <ContactRow contact={contact} setIsEdit={setIsEdit} setIsProlong={setIsProlong} deleteContact={deleteContact} />

            <ModalWithBackdrop isOpen={isEdit} setIsOpen={setIsEdit} header={"Update contact basic data"}>
                <UpdateContact contact={contact} setIsEdit={setIsEdit} update={updateContact} />
            </ModalWithBackdrop>

            <ModalWithBackdrop isOpen={isProlong} setIsOpen={setIsProlong} header={"Permanency and expiry period"}>
                <Text>Change permanency or expiry period</Text>
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
