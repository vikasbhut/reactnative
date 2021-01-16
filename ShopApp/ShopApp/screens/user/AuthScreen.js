import React, { useReducer, useCallback, useState ,useEffect} from 'react';
import { StyleSheet, View, Button, ActivityIndicator ,Alert,KeyboardAvoidingView} from 'react-native'
import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { signUp, login } from '../../store/actions/Auth'


const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE"
const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:
            const updatedInputs = { ...state.inputValues, [action.input]: action.value };
            const updatedValidities = { ...state.inputValidities, [action.input]: action.isValid };
            let formIsValid = true;
            for (let key in updatedValidities) {
                formIsValid = formIsValid && updatedValidities[key];
            }
            return {
                inputValues: updatedInputs,
                inputValidities: updatedValidities,
                formIsValid: formIsValid
            }
        default:
            return state;
    }
}
const AuthScreen = props => {

    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            email: '',
            pass: ''
        },
        inputValidities: {
            email: false,
            pass: false,
        },
        formIsValid: false
    });
    const textChangedHandler = useCallback(
        (inputIdentifier, text, isValid) => {
            formDispatch({ type: FORM_INPUT_UPDATE, value: text, input: inputIdentifier, isValid: isValid });
        },
        [formDispatch],
    );

    let action;
    const authHandler = async () => {
        if (isSignUp) {
            action = signUp(formState.inputValues.email, formState.inputValues.pass);
        }
        else {
            action = login(formState.inputValues.email, formState.inputValues.pass);
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            if(!isSignUp)
            {
                props.navigation.navigate('Shop');
            }
        }
        catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
        if(isSignUp)
        {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        if(error)
        {
            Alert.alert('An error occurred!!',error,[{text:"Okay"}]);
        }
    },[error])
    return (
        <KeyboardAvoidingView style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradinet}>
            <Card style={styles.authContainer}>
                <Input
                    id="email"
                    label="E-mail"
                    KeyboardType="email-address"
                    required
                    email
                    autoCapitalize="none"
                    errorText="Please enter a valid email address"
                    onInputChange={textChangedHandler}
                    initialValue=''
                />

                <Input
                    id="pass"
                    label="Password"
                    KeyboardType="default"
                    secureTextEntry
                    required
                    min={5}
                    errorText="Please enter a valid password"
                    onInputChange={textChangedHandler}
                    initialValue=''
                />
                <View style={styles.buttonContainer}>
                    {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> : <Button title={isSignUp ? "SIGN UP" : "LOGIN"} color={Colors.primary} onPress={authHandler} />}
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={`Switch To ${isSignUp ? "LOGIN" : "SIGN UP"}`} color={Colors.accent} onPress={() => {
                        setIsSignUp(prevState => !prevState);
                    }} />
                </View>
            </Card>
        </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    title: "Authenticate"
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradinet: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    authContainer: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 10
    }
});
export default AuthScreen;