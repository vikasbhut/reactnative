import React from 'react'
import {Text,StyleSheet} from 'react-native'

const BodyText=props=><Text style={{...styles.text,...props.style}}>{props.children}</Text>;

const styles=StyleSheet.create({
    text:{
        fontFamily:"OpenSans-Regular",
        fontSize:20,
    }
});
export default BodyText;