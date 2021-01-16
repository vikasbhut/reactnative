import React,{useState} from 'react'
import { FlatList,View ,Button,Alert,ActivityIndicator} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import {useSelector,useDispatch} from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/colors'
import {deleteProduct} from '../../store/actions/products'

const UserProductScreen = props => {
    const userProducts=useSelector(state=>state.product.userProducts);
    const dispatch=useDispatch();
    const[isLoading,setIsLoading]=useState(false);

    const editHandler=(id)=>{
        props.navigation.navigate('EditProductScreen',{id});
    }

    const deleteHandler=(id)=>{
        Alert.alert("Are You Sure?","Do you really want to delete this item?",
        [{text:"No",style:"default"},
            {text:"yes",style:"destructive",onPress:async ()=>{
                setIsLoading(true);
                await dispatch(deleteProduct(id))
                setIsLoading(false);
            }}]);
    }
   if(isLoading)
   {
       return (
           <View style={{alignItems:"center",flex:1,justifyContent:"center"}}>
               <ActivityIndicator size="large" color={Colors.primary}/>
           </View>
       );
   }
   else{
    return (
        <FlatList
            style={{width:"100%"}}
            contentContainerStyle={{alignItems:"center"}}
            data={userProducts}
            renderItem={itemData => 
                <ProductItem
                    title={itemData.item.title}
                    price={itemData.item.price}
                    imageUrl={itemData.item.imageUrl}
                    onSelect={()=>editHandler(itemData.item.id)}
                 >
                <View style={{width:"40%"}}><Button title="EDIT" color={Colors.primary} onPress={()=>{editHandler(itemData.item.id)}}/></View>
                <View style={{width:"40%"}}><Button title="DELETE" color={Colors.primary} onPress={()=>{deleteHandler(itemData.item.id)}}/></View>
                </ProductItem>
            }
        />
    );
   }
};


UserProductScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Your Products",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="MENU" iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="ADD" iconName='md-create' onPress={() => navigation.navigate('EditProductScreen')} />
            </HeaderButtons>
        )
    }
}

export default UserProductScreen;