import React ,{useState, useEffect,useCallback} from 'react'
import {View,StyleSheet,Text,Switch} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/colors'
import DefaultText from '../components/DefaultText'
import {useDispatch} from 'react-redux'
import {setFilters} from '../store/actions/mealsActions'



const FilterSwitch=props=>{
    return (
        <View style={styles.filterContainer}>
        <DefaultText style={{fontSize:20}}>{props.label}</DefaultText>
        <Switch value={props.value} 
                onValueChange={props.onChange} 
                trackColor={{true:Colors.primaryColor}}
                thumbColor={Colors.primaryColor}/>
    </View>
    );
}


const FilterScreen=props=>{

    const {navigation}=props;
    const[isGultenFree,setIsGultenFree]=useState(false);
    const[isLactoseFree,setIsLactoseFree]=useState(false);
    const[isVegan,setIsVegan]=useState(false);
    const[isVegetarian,setIsVegetarian]=useState(false);

    const dispatch=useDispatch();

    
    const saveFilter=useCallback(
        () => {
            const applyFilter={
                gultenFree:isGultenFree,
                lactoseFree:isLactoseFree,
                vegan:isVegan,
                isVegetarian:isVegetarian
            }
            dispatch(setFilters(applyFilter));
        },
        [isGultenFree,isLactoseFree,isVegetarian,isVegan,dispatch],
    );


    useEffect(()=>{
        navigation.setParams({save:saveFilter});
    },[saveFilter])
    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch 
                    label="Gluten-Free" 
                    value={isGultenFree} 
                    onChange={newValue=>setIsGultenFree(newValue)}
            />
            <FilterSwitch 
                    label="Lactose-Free" 
                    value={isLactoseFree} 
                    onChange={newValue=>setIsLactoseFree(newValue)}
            />
            <FilterSwitch 
                    label="Vegan" 
                    value={isVegan} 
                    onChange={newValue=>setIsVegan(newValue)}
            />
            <FilterSwitch 
                    label="Vegetarian" 
                    value={isVegetarian} 
                    onChange={newValue=>setIsVegetarian(newValue)}
            />
        </View>);
};

FilterScreen.navigationOptions=({navigation})=>{
    return {
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={()=>{
                navigation.toggleDrawer();
            }}/>
        </HeaderButtons>),
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Save" iconName='ios-save' onPress={navigation.getParam('save')}/>
        </HeaderButtons>
        )
    }
}
const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:"center"
    },
    filterContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"80%",
        marginVertical:10,
    },
    title:{
        fontFamily:"OpenSans-Bold",
        fontSize:22,
        margin:20,
        textAlign:"center"
    }
});
export default  FilterScreen;