import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { authenticate } from '../store/actions/Auth'
import Colors from '../constants/colors'
import { useDispatch } from 'react-redux'

const StartupScreen = props => {

    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const { token, userId, expiryDate } = JSON.parse(userData);
            const expirationData = new Date(expiryDate);
            if (expirationData <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }
           await dispatch(authenticate(token,userId));
           props.navigation.navigate('Shop');
        };
        tryLogin();
    }, [dispatch])
    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
export default StartupScreen;