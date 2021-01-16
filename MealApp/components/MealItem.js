import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity ,ImageBackground,Dimensions} from 'react-native'
import DefaultText from '../components/DefaultText'

const MealItem = props => {

   
    const[availableDeviceWidth,setAvailableDevicewidth]=useState(Dimensions.get('window').width);

    useEffect(()=>{
        const updateLayout=()=>{
            setAvailableDevicewidth(Dimensions.get('window').width);
        }
        Dimensions.addEventListener('change',updateLayout);
        return()=>{
            Dimensions.removeEventListener('change',updateLayout);
        }
    });

    let mealItemWidth=styles.mealItemWidthSmall;
    if(availableDeviceWidth>500)
    {
        mealItemWidth=styles.mealItemWidthBig;
    }
    
    
    return (
        <View style={{...styles.mealItem,...mealItemWidth}}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <ImageBackground source={{uri:props.imageUrl}} fadeDuration={1000} style={styles.bgImage}>
                        <View style={styles.titleConatiner}><Text style={styles.title}>{props.title}</Text></View>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                        <DefaultText>{props.duration}</DefaultText>
                        <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        backgroundColor: '#f7f7f7',
        margin: 25,
        borderRadius:10,
        overflow:"hidden",
        borderWidth:1,
        borderColor:"grey"
    },
    mealItemWidthSmall:{
        width:"90%"
    },
    mealItemWidthBig:{
        width:"60%",
    },
    titleConatiner:{
        backgroundColor:"rgba(0,0,0,0.5)",
        paddingHorizontal:12,
        paddingVertical:5,
    },  
    title:{
      fontSize:20,
      fontFamily:"OpenSans-Bold",
      color:"white",
      textAlign:"center"
    },
    bgImage:{
        width:'100%',
        height:'100%',
        justifyContent:"flex-end"
    },
    mealRow: {
        flexDirection: "row",
    },
    mealHeader: {
        height: '85%',
    },
    mealDetail: {
        paddingHorizontal:20,
        justifyContent: "space-between",
        alignItems:"center",
        height:"15%"
    }

});
export default MealItem;