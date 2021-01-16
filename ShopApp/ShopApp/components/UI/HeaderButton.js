import {HeaderButton} from "react-navigation-header-buttons";
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/colors';
import {Platform} from "react-native";
import React from 'react';

const CustomHeaderButton=props=>{
    return <HeaderButton {...props} IconComponent={Icon} iconSize={23} color={Platform.OS==='android'?'white':Colors.primary}/>
}

export default CustomHeaderButton;