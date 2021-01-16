import React from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import Colors from '../../constants/colors'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'
import Card from '../../components/UI/Card'

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => {
    const transformedCartItems = []
    for (let key in state.cart.items) {
      transformedCartItems.push({ productId: key, ...state.cart.items[key] })
    }
    return transformedCartItems.sort(
      (prod1, prod2) => prod1.quantity - prod2.quantity
    )
  })

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total :{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount * 100) / 100}
          </Text>
        </Text>
        <Button
          title='ORDER NOW'
          onPress={() =>
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
          }
          color={Colors.accent}
          disabled={cartItems.length === 0}
        />
      </Card>
      <FlatList
        keyExtractor={(item, index) => item.productId}
        data={cartItems}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.producttitle}
            price={itemData.item.productPrice}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}
            showDeleteBtn={true}
          />
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
})
export default CartScreen
