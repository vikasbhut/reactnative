import React,{useState} from 'react';
import { View, StyleSheet, Image, Dimensions, Text,ScrollView} from 'react-native'
import BodyText from '../components/BodyText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'


const GameOverScreen = props => {

  
    return (
      
             <ScrollView>
             <View style={styles.screen}>
            <BodyText>The Game is Over!</BodyText>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={1000}
                    style={styles.image}
                    source={require('../assets/original.png')}
                    // source={{uri: 'https://image.freepik.com/free-vector/boy-win-contest-earn-trophy-medal_7814-608.jpg'}}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>Your phone nedded <Text style={styles.highlight}>{props.rounds}</Text> 
                      rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
           </View>
           <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
        </ScrollView>
       
       );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    imageContainer: {
        borderRadius:Dimensions.get('window').width*0.7/2,
        borderWidth: 3,
        borderColor: "black",
        width: Dimensions.get('window').width*0.7,
        height:Dimensions.get('window').width*0.7,
        marginVertical: Dimensions.get('window').height*0.020,
        overflow: "hidden"
    },
    highlight:{
        color:Colors.primary,
        fontFamily:"OpenSans-Bold",
    },
    resultContainer:{
        marginHorizontal:30,
        marginVertical:Dimensions.get('window').height*0.025
    },
    resultText:{
       textAlign:"center",
       fontSize:Dimensions.get('window').height<400?16:20
    }
});
export default GameOverScreen;