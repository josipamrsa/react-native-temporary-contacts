import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function UpdateContactScreen({ navigation }) {
    useEffect(() => {
        const refreshData = navigation.addListener('focus', () => {
            // FIXME - TESTING PURPOSES
            console.log("refreshed");
        });

        return refreshData;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>Edit or delete contacts</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '5%',
        justifyContent: "center",
        alignItems: "center"
      },
});
