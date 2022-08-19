import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import ModalWithBackdrop from './ModalWithBackdrop';

export default function ProfileCircle({ firstName, lastName, contact }) {
    const [isDetailView, setIsDetailView] = useState(false);

    return (
        <Pressable style={styles.container} onPress={() => { setIsDetailView(!isDetailView) }}>
            <Text style={styles.initials}>{firstName[0] + lastName[0]}</Text>

            <ModalWithBackdrop isOpen={isDetailView} setIsOpen={setIsDetailView} header={"Contact details"}>
                <View style={styles.contactDetail}>
                    <View style={styles.row}>
                        <Text style={styles.rowname}>Name: </Text>
                        <Text style={styles.rowdata}>{contact.firstName} {contact.lastName}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.rowname}>Phone: </Text>
                        <Text style={styles.rowdata}>{contact.phone}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.rowname}>Location: </Text>
                        <Text style={styles.rowdata}>{contact.location}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.rowname}>Description: </Text>
                        <Text style={styles.rowdata}>{contact.description}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.rowname}>Temporary: </Text>
                        <Text style={styles.rowdata}>{contact.keepFor ? `yes (${contact.keepFor} day/s)` : `no`}</Text>
                    </View>

                    {
                        contact.keepFor ?
                            <View>
                                <Text style={styles.expiry}>{`Expires on ${contact.deletionDate}`}</Text>
                            </View> :
                            <View>
                                <Text style={styles.expiry}>{`No expiration date (permanent contact)`}</Text>
                            </View>
                    }

                </View>
            </ModalWithBackdrop>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f3f3",
        borderRadius: 100,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center"
    },

    initials: {
        color: "gray"
    },

    contactDetail: {
        marginLeft: "20%",
        marginBottom: 25
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "70%"
    },

    rowname: {
        fontWeight: "bold",
        width: "85%"
    },

    rowdata: {
        fontStyle: "italic",
        justifyContent: "flex-start",
        width: "80%"
    },

    expiry: {
        marginTop: 25,
        textAlign: "center",
        fontStyle: "italic",
        color: "gray",
        width: "80%"
    },

    /*  button: {
         borderRadius: 20,
         padding: 20,
         elevation: 2,
     },
 
     buttonClose: {
         backgroundColor: "lightgray",
     },
 
     buttonCloseText: {
         color: "white",
         textTransform: "uppercase"
     } */
});
