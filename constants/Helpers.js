import React from 'react';
import { ToastAndroid, Dimensions } from 'react-native';

export const showToast = (message, offset) => {
    const toastHeight = parseInt(Dimensions.get('window').height * offset);
    ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.TOP, 0, toastHeight);
}

export const checkIfEmptyFields = (args) => {
    return args.map(arg => arg !== "").reduce((a, b) => a * b);
}

