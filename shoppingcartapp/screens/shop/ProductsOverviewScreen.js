import React from 'react'
import { FlatList, Button, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/colors'

const ProductOverviewScreen = props => {

    const products = useSelector(state => state.product.availableProducts);
    const dispatch = useDispatch();


    return <FlatList
        keyExtractor={(item, index) => item.id}
        data={products}
        contentContainerStyle={{ alignItems: "center" }}
        style={{ width: "100%" }}
        renderItem={itemData => <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => props.navigation.navigate('ProductDetailScreen', {
                productId: itemData.item.id,
                title: itemData.item.title
            })}
        >
            <View style={{ width: "35%" }}><Button title="View Details" onPress={() => props.navigation.navigate('ProductDetailScreen', {
                productId: itemData.item.id,
                title: itemData.item.title
            })} color={Colors.primary} /></View>
            <View style={{ width: "35%" }}><Button title="To Cart" onPress={() => { dispatch(cartActions.addToCart(itemData.item)) }} color={Colors.primary} /></View>

        </ProductItem>
        }
    />
};

ProductOverviewScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "All Products",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="CART" iconName='md-cart' onPress={() => navigation.navigate('CartScreen')} />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="MENU" iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
            </HeaderButtons>
        )
    }
};

export default ProductOverviewScreen;