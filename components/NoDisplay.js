import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function NoDisplay(props) {
    return (
        <View style={styles.container}>
            <Text>No data to display</Text>
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
