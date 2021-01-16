import React from "react";
import {View,StyleSheet} from 'react-native'

const Card=props=>{
    return(
        <View style={{...props.style,...styles.card}}>
            {props.children}
        </View>
    );
};

const styles=StyleSheet.create({
    card:{
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:"white",
    }
});

export default Card;