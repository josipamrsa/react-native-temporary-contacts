import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CustomizableButton from './CustomizableButton';

export default function DisplayUserCard(props) {
    const changeColorByDuration = (duration) => {
        switch (duration) {
            case "day":
                return ({ backgroundColor: "#acdfdd" });
            case "week":
                return ({ backgroundColor: "#acdfc3" });
            case "month":
                return ({ backgroundColor: "#acc7df" });
            default:
                return ({ backgroundColor: "white" });
        }
    }

    return (
        <View style={styles.cardsContainer}>
            {
                props.fullContacts.map((fc, i) => {
                    Object.keys(fc).forEach(k => console.log(k));
                    return (
                        <View key={i} style={
                            { ...styles.card, ...changeColorByDuration(fc.keepFor) }
                        }>
                            <View>
                                <Text style={styles.nameTag}>{fc.firstName} {fc.lastName}</Text>
                                <Text style={styles.descriptionTag}>{fc.description}</Text>
                            </View>

                            <CustomizableButton
                                button={styles.button}
                                description={"Call"}
                                action={() => { console.log("call") }} />
                        </View>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 1
    },

    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        padding: 15,
        marginTop: "2%"
    },

    nameTag: {
        fontSize: 20
    },

    descriptionTag: {
        fontStyle: "italic",
        fontSize: 12
    },

    button: {
        backgroundColor: "lightsalmon",
        width: "25%"
    }
});
