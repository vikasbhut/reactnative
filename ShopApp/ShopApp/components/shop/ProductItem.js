import React from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native'
import Card from '../UI/Card'
const ProductItem = props => {
    return (
        <TouchableOpacity onPress={props.onSelect} useForeground>
            <Card style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.imageUrl }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price}</Text>
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
        overflow: "hidden",
        margin:20,
    },
    imageContainer: {
        width: "100%",
        height: "60%"
    },
    image:{
        width:"100%",
        height:"100%"
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