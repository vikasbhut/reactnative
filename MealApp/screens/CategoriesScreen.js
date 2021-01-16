import React from 'react'
import { FlatList } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

const CategoriesScreen = props => {


    const renderGridItems = (itemData) => {
        return <CategoryGridTile title={itemData.item.title}
            color={itemData.item.color}
            onSelect={() => props.navigation.navigate('CategoryMeals', {
                categoryId: itemData.item.id,
            })} />
    }

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            numColumns={2}
            data={CATEGORIES}
            renderItem={renderGridItems} />
    );
};


CategoriesScreen.navigationOptions =({navigation})=> {
  
    return{
        title: "Meal Categories",
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={()=>{
                navigation.toggleDrawer();
            }}/>
        </HeaderButtons>)
    }

};

export default CategoriesScreen;