import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button, Modal } from 'react-native'
const GoalInput = props => {
    const [enterGoal, setEnterdGoal] = useState('');
    const goalInputHandler = enterdText => {
        setEnterdGoal(enterdText);
    }
    const addGoalHandler = () => {
        props.addGoalHandler(enterGoal),
            setEnterdGoal('')
    }
    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput placeholder="Enter Goal" value={enterGoal} style={styles.textInput} onChangeText={goalInputHandler} />
                <View style={styles.buttonContainer}>
                <View style={{width:"40%"}}>
                <Button title="CANCLE" color="red" onPress={props.onCancle}/>
                </View>
               <View style={{width:"40%"}}>
               <Button title="ADD" onPress={addGoalHandler} />
               </View>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({

    inputContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer:{
        flexDirection:"row",
        width:"60%",
        justifyContent:"space-between"
    },
    textInput: {
        borderColor: "black",
        width: "80%",
        padding: 5,
        marginBottom: 10,
        borderWidth: 1
    },

});
export default GoalInput

