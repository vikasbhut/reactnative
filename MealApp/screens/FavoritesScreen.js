import React from 'react'
import MealList from '../components/MealList'
import {useSelector} from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import {View,StyleSheet} from 'react-native'
import DefaultText from '../components/DefaultText'

const FavoritesScreen=props=>{

    const favMeals=useSelector(state=>state.meals.favoritesMeals);
  

    if(favMeals.length===0)
    {
        return (
            <View style={styles.content}>
                <DefaultText style={{fontSize:20,textAlign:"center"}}>No Favorites meals found.Start adding some!</DefaultText>
            </View>
        );
    }else{
        return(<MealList listData={favMeals} navigation={props.navigation}/>);
    }
   
};

FavoritesScreen.navigationOptions=({navigation})=>{
    return {
        title:"Your Favorites",
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={()=>{
                navigation.toggleDrawer();
            }}/>
        </HeaderButtons>)
    }
}

const styles=StyleSheet.create({
    content:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
export default  FavoritesScreen;