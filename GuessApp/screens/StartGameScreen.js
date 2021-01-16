import React, { useState ,useEffect} from "react";
import { View, StyleSheet, Text, Alert, Button,KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard ,Dimensions,ScrollView} from "react-native";
import Card from '../components/Card'
import Input from '../components/Input'
import BodyText from '../components/BodyText'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'


const StartGameScreen = props => {

    const [enterdValue, setEnterdValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNummber, setSelectedNumber] = useState();
    const[buttonWidth,setButtonWidth]=useState(Dimensions.get('window').width/4);


  

    useEffect(()=>{
        const updateLayout=()=>{
            setButtonWidth(Dimensions.get('window').width/4);
        }
        Dimensions.addEventListener('change',updateLayout);
        return ()=>{
            Dimensions.removeEventListener('change',updateLayout);
        }
    });
    const numberInputHandler = inputText => {
        //Replace anything from string which is not number with empty space
        setEnterdValue(inputText.replace(/[^0-9]/g, ''));
    }


    const resetInputHandler = () => {
        setEnterdValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {

        const chosenNumber = parseInt(enterdValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0) {
            Alert.alert("Invalid Number", "Number has to be a number between 1-99.", [{ text: "Okay", style: "cancel", onPress: resetInputHandler }]);
            return;
        }
        setConfirmed(true);
        setEnterdValue('');
        setSelectedNumber(parseInt(enterdValue));
        Keyboard.dismiss();
    }


    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = 
                        <Card style={styles.summaryContainer}>
                            <Text style={{fontSize:16}}>You Selected</Text>
                            <NumberContainer>
                                {selectedNummber}
                            </NumberContainer>
                            <MainButton  onPress={()=>props.onStartGame(selectedNummber)}>START GAME</MainButton>
                        
                       </Card>
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
             <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game</Text>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input style={styles.input}
                        maxLength={2}
                        keyboardType="number-pad"
                        blurOnSubmit={true}
                        onChangeText={numberInputHandler}
                        value={enterdValue}
                    />
                    <View style={styles.buttonContainer}>
                          <View style={{width:buttonWidth}}><Button title="RESET" color="#FF00FF" onPress={resetInputHandler} /></View>
                          <View style={{width:buttonWidth}}><Button title="CONFIRM" color="#f7287b" onPress={confirmInputHandler} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
       
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    button:{
        width:Dimensions.get('window').width/4,
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily:"OpenSans-Bold"
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth:'95%',
        alignItems: "center",
        padding: 10,
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    summaryContainer:{
        marginTop:20,
        width:"80%",
        minWidth:170,
        alignItems:"center",
        padding:10
    }
});
export default StartGameScreen;