import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

export default function ProfileCircle({ firstName, lastName, contact }) {
    const [isDetailView, setIsDetailView] = useState(false);

    return (
        <Pressable style={styles.container} onPress={() => { setIsDetailView(!isDetailView) }}>
            <Text style={styles.initials}>{firstName[0] + lastName[0]}</Text>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isDetailView}
                onRequestClose={() => setIsDetailView(!isDetailView)}>
                <TouchableOpacity style={styles.modal} onPress={() => setIsDetailView(!isDetailView)}>

                    <View>
                        <Text style={styles.header}>Contact details</Text>

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
                                null
                        }

                    </View>
                </TouchableOpacity>
            </Modal>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f3f3",
        borderRadius: 100,
        height: 40,
        width: 40,
        padding: 10
    },

    initials: {
        color: "gray"
    },

    modal: {
        width: "90%",
        height: "40%",
        padding: 20,
        margin: "5%",
        marginTop: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1.0,
        shadowRadius: 4,
        elevation: 5
    },

    header: {
        fontSize: 20,
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: 20
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%"
    },

    rowname: {
        fontWeight: "bold",
        width: "70%"
    },

    rowdata: {
        fontStyle: "italic",
        width: "70%"
    },

    expiry: {
        marginTop: 25,
        textAlign: "center",
        fontStyle: "italic",
        color: "gray"
    },

    button: {
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
    }
});
