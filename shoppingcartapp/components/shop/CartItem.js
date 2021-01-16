import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.price}</Text>
                {props.showDeleteBtn && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Icon name="md-trash" size={23} color='red' />
                </TouchableOpacity>}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    deleteButton: {
        marginLeft: 20
    },
    cartItem: {
        padding: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 10,
        borderColor: "#888",
        borderWidth: 1,
        marginBottom: 8
    },
    itemData: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantity: {
        fontFamily: "OpenSans-Bold",
        color: "#888",
        fontSize: 16,
        marginRight: 8
    },
    mainText: {
        fontSize: 16,
        fontFamily: "OpenSans-Bold"
    },

});
export default CartItem;