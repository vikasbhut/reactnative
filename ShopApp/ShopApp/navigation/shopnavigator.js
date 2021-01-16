import React from 'react'

import { createAppContainer,createSwitchNavigator} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator ,DrawerNavigatorItems} from 'react-navigation-drawer'

import {SafeAreaView,Button,View} from 'react-native'
import {useDispatch} from 'react-redux'
import {logout} from '../store/actions/Auth'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from '../screens/shop/OrderesScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import UserProductScreen from '../screens/user/UserProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'

import Icon from 'react-native-vector-icons/Ionicons'
import Colors from "../constants/colors";


const defaultNavigationConfig = {
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontFamily: 'OpenSans-Regular',
    },
}
const shopNavigator = createStackNavigator({
    ProductsOverviewScreen: ProductsOverviewScreen,
    ProductDetailScreen: ProductDetailScreen,
    CartScreen: CartScreen
}, { defaultNavigationOptions: defaultNavigationConfig });

const orderStackNav=createStackNavigator({
    Orders:OrderScreen
},{ defaultNavigationOptions: defaultNavigationConfig });


const AdminNav=createStackNavigator({
    UserProductScreen:UserProductScreen,
    EditProductScreen:EditProductScreen
},{defaultNavigationOptions: defaultNavigationConfig});

const drawerNavigator=createDrawerNavigator({
    Products:{
        screen:shopNavigator,
        navigationOptions:{
            drawerIcon:(drawerConfig)=><Icon name="md-cart" size={23} color={drawerConfig.tintColor}/>
        }
    },
    Orders:{
        screen:orderStackNav,
        navigationOptions:{
            drawerIcon:(drawerConfig)=><Icon name="md-list" size={23} color={drawerConfig.tintColor}/>
        }
    },
    Admin:{
        screen:AdminNav,
        navigationOptions:{
            drawerIcon:(drawerConfig)=><Icon name="md-create" size={23} color={drawerConfig.tintColor}/>
        }
    }
},{contentOptions:{activeTintColor:Colors.primary},
    contentComponent:props=>{
        const dispatch=useDispatch();
        return (
            <View style={{flex:1}}>
                <SafeAreaView forceInset={{top:"always",horizontal:"never"}}>
                    <DrawerNavigatorItems {...props}/>
                    <Button title="LOG OUT" color={Colors.primary} onPress={()=>{
                        dispatch(logout());
                        // props.navigation.navigate('Auth');
                    }}/>
                </SafeAreaView>
            </View>
        );
    }
});


const AuthNavigator=createStackNavigator({
    Auth:AuthScreen
},{defaultNavigationOptions: defaultNavigationConfig});

const MainNavigator=createSwitchNavigator({
    Startup:StartupScreen,
    Auth:AuthNavigator,
    Shop:drawerNavigator
});
export default createAppContainer(MainNavigator);