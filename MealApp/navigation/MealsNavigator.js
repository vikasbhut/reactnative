import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FilterScreen from '../screens/FilterScreen'
import Colors from '../constants/colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native'
import React from 'react'


const defaultNavigationConfig = {
    headerStyle: {
        backgroundColor: Colors.primaryColor,
    },
    headerTintColor: "white",
    headerTitleStyle: {
        fontFamily: "OpenSans-Regular",
        fontSize: 18
    },
}
const stackNavigator = createStackNavigator({
    Category: {
        screen: CategoriesScreen,
        navigationOptions: {
            title: "Meal Categories"
        }
    },
    CategoryMealsScreen: CategoryMealsScreen,
    MealDetailScreen: MealDetailScreen
}, { defaultNavigationOptions: defaultNavigationConfig });

const FavNavigator = createStackNavigator({
    Favroite: FavoritesScreen,
    MealDetailScreen: MealDetailScreen
}, { defaultNavigationOptions: defaultNavigationConfig })

const FavTabNavigator = createMaterialBottomTabNavigator({
    Meals: {
        screen: stackNavigator,
        navigationOptions: {
            tabBarLabel: <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Meals</Text>,
            tabBarIcon: tabInfo => {
                return <Icon name="ios-restaurant" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Favroite: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Favorites</Text>,
            tabBarIcon: tabInfo => {
                return <Icon name="ios-star" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    }
}, {
    activeColor: "white",
    shifting: true
});

const FilterStackNav = createStackNavigator({
    Filter: {
        screen: FilterScreen
    }
}, { defaultNavigationOptions: defaultNavigationConfig });

const drawerNavigator = createDrawerNavigator({
    Meals: {
        screen: FavTabNavigator
    },
    Filter: {
        screen: FilterStackNav
    }
}, {

    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }

})



export default createAppContainer(drawerNavigator);