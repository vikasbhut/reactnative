import React from 'react'
import {View,Text,StyleSheet,Platform} from 'react-native'
import Colors from '../constants/colors'


const Header=props=>{
    return(
        <View style={{...styles.headerBase,...Platform.select({ios:styles.headerIOS,android:styles.headerAndroid})}}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    headerBase:{
        width:"100%",
        height:60,
        justifyContent:"center",
        alignItems:"center",
        
    },
    headerIOS:{
        backgroundColor:"white",
        borderBottomColor:'#ccc',
    },
    headerAndroid:{
        backgroundColor:Colors.primary,
        borderBottomColor:'transparent',
    },
    headerTitle:{
        fontSize:20,
        color:"white",
        fontFamily:"OpenSans-Bold"
    }
});
export default Header;