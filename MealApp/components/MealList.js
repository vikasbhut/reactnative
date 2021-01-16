import React from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import MealItem from '../components/MealItem'
import {useSelector} from 'react-redux'


const MealList=props=>{

    const favroiteMeals=useSelector(state=>state.meals.favoritesMeals);
    const filterdMeal=useSelector(state=>state.meals.filteredMeals);
    const  renderMealItem=(itemData)=>{
        const isFavorite=favroiteMeals.some(meal=>meal.id===itemData.item.id);
        const isFilterd=filterdMeal.some(meal=>meal.id===itemData.item.id);
        if(isFilterd)
        {
            return (
                <MealItem title={itemData.item.title} 
                          duration={itemData.item.duration}
                          complexity={itemData.item.complexity} 
                          affordability={itemData.item.affordability}
                          imageUrl={itemData.item.imageUrl}
                          onSelectMeal={()=>{
                              props.navigation.navigate('MealDetail',
                              {
                                  mealId:itemData.item.id,
                                  mealTitle:itemData.item.title,
                                  isFav:isFavorite
                            });
                          }}/>
            );
        }
        else{
            return null;
        }
    }
    return (
        <View style={styles.list}>
        <FlatList 
                  keyExtractor={(item)=>item.id}
                  data={props.listData}
                  renderItem={renderMealItem}
                  style={{width:'100%'}}
                  contentContainerStyle={{alignItems:"center"}}
        />
   </View>
    )
}

const styles=StyleSheet.create({
    list:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
});

export default MealList;