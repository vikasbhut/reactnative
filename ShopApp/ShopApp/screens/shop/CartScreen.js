import React, { useState } from "react"
import { FlatList, StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/colors'
import Card from '../../components/UI/Card'
import CartItem from '../../components/shop/CartItem'
import { removeFromCart } from '../../store/actions/cart'
import { addOrder } from '../../store/actions/orders'

const CartScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedItems = [];
        for (let key in state.cart.items) {
            transformedItems.push({ id: key, ...state.cart.items[key] });
        }
        return transformedItems.sort((a, b) => a.quantity - b.quantity);
    });

    const sendOrderHandler = async () => {
        setIsLoading(true)
        await dispatch(addOrder(cartItems, Math.round(totalAmount * 100) / 100))
        setIsLoading(false);
    }
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total:<Text style={styles.amount}>${Math.round(totalAmount * 100) / 100}</Text></Text>
                {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> : <Button title="Order Now" color={Colors.accent} onPress={() => sendOrderHandler()} disabled={cartItems.length===0}/>}
            </Card>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={cartItems}
                renderItem={itemData => <CartItem
                    deleteble
                    quantity={itemData.item.quantity}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onRemove={() => dispatch(removeFromCart(itemData.item.id))}
                />}
            />
        </View>
    );
}

CartScreen.navigationOptions = {
    title: "Cart"
}
const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
    },
    summaryText: {
        fontFamily: "OpenSans-Bold",
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});
export default CartScreen;