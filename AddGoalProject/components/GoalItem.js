import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
const GoalItem=props=>{
    
    return(
       <TouchableOpacity activeOpacity={0.6} onPress={()=>props.onDelete(props.id)}>
            <View style={styles.listItem}><Text>{props.title}</Text></View>
       </TouchableOpacity>
    );
}
const styles=StyleSheet.create({
   
     listItem:{
       margin:6,
       backgroundColor:"#ccc",
       borderWidth:1,
       borderColor:"black",
       padding:8
     }
   });
export default GoalItem