import {
    useState,
    useEffect,
    useRef
} from "react";

import {
    Alert,
    Platform,
    ToastAndroid,
    Dimensions
} from 'react-native';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import { EXPO_PUSH_URL } from '../utils/Configuration';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
});

const usePushNotifications = () => {
    const [expoPushToken, setExpoPushToken] = useState('');      
    const [notification, setNotification] = useState(false);    
    const notificationListener = useRef();                       
    const responseListener = useRef();                           

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        }
    }, []);

    const sendPushNotification = async (expoToken, incomingMessage) => {
        if (!incoming) return;

        const message = {
            to: expoToken,
            sound: 'default',
            title: "Temporary contacts",
            body: incomingMessage
        }

        await fetch(EXPO_PUSH_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });
    }

    const registerForPushNotificationsAsync = async () => {
        let token;

        if (Constants.isDevice) {
            const { 
                status: existingStatus 
            } = await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                Alert.alert(
                    "Permission denied",
                    "Failed to get push token for push notifications!",
                    [{
                        text: 'OK',
                        onPress: () => console.log('fail')
                    }]
                );
                return;
            }

            token = (await Notifications.getExpoPushTokenAsync()).data;
        }

        else {
            Alert.alert(
                "Incompatible device",
                "Must use physical device for push notifications!",
                [{
                    text: 'OK',
                    onPress: () => console.log('fail')
                }]
            );
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: "default",                                     
                importance: Notifications.AndroidImportance.MAX,    
                vibrationPattern: [0, 250, 250, 250],                
                lightColor: '#FF231F7C'                              
            });
        }

        return token;
    }

    const showToast = (message, offset) => {
        const toastHeight = parseInt(Dimensions.get('window').height * offset);
        ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.TOP, 0, toastHeight);
    }

    return {
        sendPushNotification,
        expoPushToken,
        showToast
    }
}

export default usePushNotifications;