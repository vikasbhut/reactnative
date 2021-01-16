import React,{useState,useEffect} from 'react'
import { StyleSheet, Image, Text, View, Button,Dimensions,TouchableOpacity } from 'react-native'
import Colors from '../../constants/colors'
import Card from '../UI/Card'



const ProductItem = props => {

    const[width,setWidth]=useState(360);

    useEffect(()=>{
        const updateLayout=()=>{
            setWidth(360);
        }
        Dimensions.addEventListener('change',updateLayout);
        return ()=>{
            Dimensions.removeEventListener('change',updateLayout);
        }
    });
    
    return (
       <TouchableOpacity activeOpacity={0.5}  onPress={props.onSelect} useForeground>
            <Card style={{...styles.product,width:width}}>
            <Image source={{ uri: props.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
               {props.children}
            </View>
        </Card>
       </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    product: {
        borderRadius: 10,
        backgroundColor: "white",
        height: 300,
        margin: 20,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "60%"
    },
    title: {
        fontFamily: "OpenSans-Bold",
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontFamily: "OpenSans-Regular",
        fontSize: 14,
        color: "#888"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height:"25%",
       
    },
    details:{
        alignItems:"center",
        height:"15%",
        padding:10
    }
});

export default ProductItem;