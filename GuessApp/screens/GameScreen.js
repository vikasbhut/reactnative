import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, Dimensions, FlatList } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefalutStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'
import Icon from 'react-native-vector-icons/Ionicons';
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min) + min);
    if (rndNum == exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return rndNum;
    }

}

// const renderListItem = (value, key) => {
//     return <View key={key} style={styles.listItem}>
//         <BodyText>#{key}</BodyText>
//         <BodyText>{value}</BodyText>
//     </View>
// }

const renderListItem = (listLength, itemData) => {
    return <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
}
const GameScreen = props => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrenGuess] = useState(initialGuess);
    const [pastGuess, setPassGusses] = useState([initialGuess.toString()]);
    const[availableDeviceWidth,setAvailableDeviceWidth]=useState(Dimensions.get('window').width);
    const[availableDeviceHeight,setAvailableDeviceHeight]=useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);


    const { userChoice, onGameOver } = props;
    
    useEffect(()=>{
        const updateLayout=()=>{
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change',updateLayout);
        return()=>{
            Dimensions.removeEventListener('change',updateLayout);
        }
    });
    useEffect(() => {
            if (currentGuess === userChoice) {
            onGameOver(pastGuess.length);
        }
    }, [currentGuess, userChoice, onGameOver]);
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...!', [{ text: 'Sorry', style: "cancel" }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrenGuess(nextNumber);
        setPassGusses(pastGuess => [nextNumber.toString(), ...pastGuess]);
    };


    let listContainerStyle = styles.listContainer;
    if (availableDeviceWidth< 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (availableDeviceHeight< 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefalutStyles.bodyText}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={() => nextGuessHandler('lower')}>
                        <Icon name="md-remove" size={30} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={() => nextGuessHandler('greater')}>
                        <Icon name="md-add" size={30} color="white" />
                    </MainButton>
                </View>
                <View style={listContainerStyle}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                {
                    pastGuess.map((guess, index) => renderListItem(guess,pastGuess.length-index))
                }
            </ScrollView> */}
                    <FlatList contentContainerStyle={styles.list} keyExtractor={(item, index) => String(pastGuess.length - index)} data={pastGuess} renderItem={renderListItem.bind(this, pastGuess.length)} />
                </View>
            </View>
        );
    }
    else{
        return (
            <View style={styles.screen}>
                <Text style={DefalutStyles.bodyText}>Opponent's Guess</Text>
                <NumberContainer>{currentGuess}</NumberContainer>
                <Card style={styles.buttonContainer}>
                    <MainButton onPress={() => nextGuessHandler('lower')}>
                        <Icon name="md-remove" size={30} color="white" />
                    </MainButton>
                    <MainButton onPress={() => nextGuessHandler('greater')}>
                        <Icon name="md-add" size={30} color="white" />
                    </MainButton>
                </Card>
                <View style={listContainerStyle}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {
                        pastGuess.map((guess, index) => renderListItem(guess,pastGuess.length-index))
                    }
                </ScrollView> */}
                    <FlatList contentContainerStyle={styles.list} keyExtractor={(item, index) => String(pastGuess.length - index)} data={pastGuess} renderItem={renderListItem.bind(this, pastGuess.length)} />
                </View>
            </View>
        );
    }
   
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    controls:{
            flexDirection:"row",
            justifyContent:"space-around",
            alignItems:"baseline",
            width:"80%",
            minWidth:300,
            maxWidth:"90%"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Dimensions.get('window').height > 600 ? 30 : 5,
        width: 300,
        padding: 10,
        maxWidth: "80%"
    },
    listContainer: {
        width: '60%',
        flex: 1,
    },
    listContainerBig: {
        flex: 1,
        width: "80%"
    },
    listItem: {
        borderColor: "#ccc",
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        borderWidth: 1,
        width: "80%",
        justifyContent: "space-around"
    },
    list: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "flex-end"
    }
});
export default GameScreen;