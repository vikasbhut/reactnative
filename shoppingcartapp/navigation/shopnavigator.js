import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from '../screens/shop/CartScreen'
import OrderesScreen from '../screens/shop/OrderesScreen'
import UserProductScreen from '../screens/user/UserProductScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import Colors from '../constants/colors'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'


const defaultNavigationConfig = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerTitleStyle: {
        fontFamily: "OpenSans-Regular"
    }

}
const ProductsNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    ProductDetailScreen: ProductDetailScreen,
    CartScreen: CartScreen
}, {
    defaultNavigationOptions: defaultNavigationConfig
});


const orderNavigator = createStackNavigator({
    OrderesScreen: OrderesScreen
}, { defaultNavigationOptions: defaultNavigationConfig });

const AdminNavigator = createStackNavigator({
    UserProductScreen: UserProductScreen,
    EditProductScreen:EditProductScreen
}, {
    navigationOptions:{
        drawerIcon:(drawerConfig)=><Icon name="md-create" size={23} color={drawerConfig.tintColor}/> 
    },
    defaultNavigationOptions: defaultNavigationConfig });

const drawerNavigator = createDrawerNavigator({

    Products:{
        screen:ProductsNavigator,
        navigationOptions:{
            drawerIcon:(drawerConfig)=><Icon name="md-cart" size={23} color={drawerConfig.tintColor}/>
        }
    },
    Orders:{
        screen:orderNavigator,
        navigationOptions:{
            drawerIcon:(drawerConfig)=><Icon name="md-list" size={23} color={drawerConfig.tintColor}/>
        }
    },
    Admin:AdminNavigator

}, {
    contentOptions: {
        activeTintColor:Colors.primary
    }
});

export default createAppContainer(drawerNavigator);