import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';

import * as Icon from "react-native-feather";
import * as Linking from "expo-linking";

import ProfileCircle from './ProfileCircle';

export default function DisplayContactCard({ contact }) {
    const changeColorByDuration = (duration) => {
        switch (duration) {
            case 1:
                return ({
                    backgroundColor: "#dfc4ac",
                });
            case 7:
                return ({
                    backgroundColor: "#dfacc7",
                });
            case 30:
                return ({
                    backgroundColor: "#acdfc4",
                });
            default:
                return ({
                    backgroundColor: "#acc7df",
                });
        }
    }

    const communicateWithContact = (type, phone) => {
        let testCall = "914215930";
        Linking.openURL(`${type}:+385${testCall}`);
        console.log("call")
    }

    return (
        <View key={contact.userId} style={
            { ...styles.card, ...changeColorByDuration(contact.keepFor) }}>
            <View style={styles.contactDetails}>
                <ProfileCircle firstName={contact.firstName} lastName={contact.lastName} contact={contact} />

                <View>
                    <Text style={styles.nameTag}>{contact.firstName} {contact.lastName}</Text>
                    <Text style={styles.phoneTag}>{contact.phone}</Text>
                    <Text style={styles.descriptionTag}>{contact.description}</Text>

                </View>
            </View>

            <View style={styles.contactOptions}>
                <Pressable
                    style={styles.control}
                    onPress={() => communicateWithContact("tel", contact.phone)}>
                    <Icon.PhoneCall stroke="black" width={28} height={28} />
                </Pressable>

                <Pressable
                    style={styles.control}
                    onPress={() => communicateWithContact("sms", contact.phone)}>
                    <Icon.MessageSquare stroke="black" width={28} height={28} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 1,
        backgroundColor: "#f3f3f3",
        padding: 10,
        borderRadius: 15,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 20,
        padding: 15,
        margin: "2%",
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    contactDetails: {
        flexDirection: "row",
        alignItems: "center"
    },

    nameTag: {
        fontSize: 20,
        marginLeft: 5
    },

    phoneTag: {
        marginLeft: 5
    },

    descriptionTag: {
        fontStyle: "italic",
        fontSize: 12,
        marginLeft: 5
    },

    contactOptions: {
        flexDirection: "row"
    },

    control: {
        marginLeft: 7
    }
});
