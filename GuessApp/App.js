/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import { View, StyleSheet} from 'react-native'
import Header from './components/Header'
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'


const App = () => {

  const[userNumber,setUserNumber]=useState('');
  const[guessRound,setGuessRound]=useState('');

  const startGameHandler=(selectedNumber)=>{
    setUserNumber(selectedNumber);
    setGuessRound(0);
  }

  const gameOverHandler=noOfRounds=>{
    setGuessRound(noOfRounds);
  }

  const configureNewGameHandler=()=>{
    setGuessRound(0);
    setUserNumber(null);
  }

  let content=<StartGameScreen onStartGame={startGameHandler}/>;
  if(userNumber&&guessRound<=0)
  {
    content=<GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }
  else if(guessRound>0)
  {
    content=<GameOverScreen rounds={guessRound} userNumber={userNumber} onRestart={configureNewGameHandler}/>
  }
  return(
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>);
  }
   
const styles=StyleSheet.create({
    screen:{
      flex:1,
    }
});
export default App;
