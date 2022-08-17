import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ProfileCircle({ firstName, lastName }) {
    return (
        <View style={styles.container}>
            <Text>{firstName[0] + lastName[0]}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f3f3",
        borderRadius: 100,
        height: 40,
        width: 40,
        padding: 10
    }
});
