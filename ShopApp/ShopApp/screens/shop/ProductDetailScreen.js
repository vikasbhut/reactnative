import React from "react"
import { View, StyleSheet, Text, Image, ScrollView, Button } from "react-native";
import Colors from '../../constants/colors'
import {useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart'


const ProductDetailScreen = props => {

    const dispatch=useDispatch();
    const {title,imageUrl,price,description} = props.navigation.getParam('product');
  
    return (
        <ScrollView>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.button}>
                <Button color={Colors.primary} title="Add To Cart" onPress={()=>{
                    dispatch(addToCart(props.navigation.getParam('product')))
                }} />
            </View>
            <Text style={styles.price}>${price}</Text>
            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
}

ProductDetailScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('product').title
    }
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300
    },
    button: {
        alignItems: "center",
        marginVertical: 10
    },
    price: {
        fontFamily: "OpenSans-Regular",
        textAlign: "center",
        fontSize: 20,
        color: "#888"
    },
    description:{
        fontSize:18,
        fontFamily:"OpenSans-Regular",
        textAlign:"center",
        marginVertical:8
    }
});
export default ProductDetailScreen;