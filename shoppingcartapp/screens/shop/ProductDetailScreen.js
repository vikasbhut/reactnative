import React from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView } from "react-native";
import { useSelector,useDispatch} from "react-redux";
import Colors from '../../constants/colors';
import * as cartActions  from '../../store/actions/cart'

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.product.availableProducts.find(prod => prod.id === productId));
    const dispatch=useDispatch();

    return (
        <ScrollView>
            <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
            <View style={styles.actions}>
                <Button title="ADD TO CART" onPress={() => { 
                    dispatch(cartActions.addToCart(selectedProduct));
                }} color={Colors.primary} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('title')
    }
}
const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300
    },
    actions:{
        alignItems:"center",
        marginVertical:10
    },
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "OpenSans-Regular"
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "OpenSans-Regular",
        marginHorizontal:20
    }
});
export default ProductDetailScreen;