import React,{useEffect,useCallback} from 'react'
import { View, StyleSheet, Text, ScrollView, ImageBackground } from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import {toggleFavorites} from '../store/actions/mealsActions'



const ListItem=props=>{
    return <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
}


const MealDetailScreen = props => {

    const mealId = props.navigation.getParam('mealId');
    const availableMeal=useSelector(state=>state.meals.meals);
    const selectedMeal = availableMeal.find(meal => meal.id === mealId);
    const currentMealIsFavorite=useSelector(state=>state.meals.favoritesMeals.includes(selectedMeal));

    const dispatch=useDispatch();
    const toggleFavoriteHandler=useCallback(
        () => {
            dispatch(toggleFavorites(mealId));
        },
        [mealId],
    );
    // useEffect(() => {
    //     props.navigation.setParams({mealTitle:selectedMeal.title});
    // }, [mealId])


    useEffect(()=>{
        props.navigation.setParams({toggleFav:toggleFavoriteHandler});
    },[toggleFavoriteHandler]);


    useEffect(()=>{
        props.navigation.setParams({isFav:currentMealIsFavorite});
    },[currentMealIsFavorite]);
    return (
        <ScrollView>
            <ImageBackground source={{ uri: selectedMeal.imageUrl }} style={styles.image} >
                <View style={styles.details}>
                    <DefaultText style={{ color: "white", fontSize: 16 }}>{selectedMeal.duration}</DefaultText>
                    <DefaultText style={{ color: "white", fontSize: 16 }}>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                    <DefaultText style={{ color: "white", fontSize: 16 }}>{selectedMeal.affordability.toUpperCase()}</DefaultText>
                </View>
            </ImageBackground>
            <Text style={styles.title}>Ingredients</Text>
            {
                selectedMeal.ingredients.map(ingredient=><ListItem key={ingredient}>{ingredient}</ListItem>)
            }
            <Text style={styles.title}>Steps</Text>
            {
                selectedMeal.steps.map(step=><ListItem key={step}>{step}</ListItem>)
            }
        </ScrollView>
    );
};


MealDetailScreen.navigationOptions = ({ navigation }) => {
    const isFavorite=navigation.getParam('isFav');
    return {
      //  title: navigation.getParam('mealTitle'),from useEffect
            title:navigation.getParam('mealTitle') ,//From MealList parent component forward props
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Favorite' iconName={isFavorite?'ios-star':'ios-star-outline'} onPress={navigation.getParam('toggleFav')} />
        </HeaderButtons>)

    }
}
const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
        justifyContent: "flex-end",
    },
    details: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around",
        backgroundColor: "rgba(0,0,0,0.4)"
    },
    title: {
        fontSize: 22,
        textAlign: "center",
        fontFamily: "OpenSans-Bold"
    },
    listItem:{
        marginVertical:10,
        marginHorizontal:20,
        borderColor:"#ccc",
        borderWidth:1,
        padding:10,
    }
});
export default MealDetailScreen;