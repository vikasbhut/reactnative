import React from 'react'
import {useSelector} from 'react-redux'
import { CATEGORIES } from '../data/dummy-data'
import MealList from '../components/MealList'
import {View,StyleSheet} from 'react-native'
import DefaultText from '../components/DefaultText'

const CategoryMealsScreen=props=>{

  
    const catId=props.navigation.getParam('categoryId', 'NO-ID');

    const availableMeals=useSelector(state=>state.meals.filteredMeals);
   
    const displayedMeals=availableMeals.filter(meal=>meal.categoryId.includes(catId));

    if(displayedMeals.length===0)
    {
        return (
            <View style={styles.content}>
                <DefaultText style={{fontSize:20,textAlign:"center"}}>No meals found,maybe check your filters?</DefaultText>
            </View>
        );
    }
    else{
        return <MealList listData={displayedMeals} navigation={props.navigation}/>
    }
   
};

CategoryMealsScreen.navigationOptions=({navigation})=>{
    const catId=navigation.getParam('categoryId', 'NO-ID');
    const selectedCategory=CATEGORIES.find(cat=>cat.id===catId);
    return{
        title:selectedCategory.title   
    }
    
}

const styles=StyleSheet.create({
    content:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
});
export default CategoryMealsScreen;