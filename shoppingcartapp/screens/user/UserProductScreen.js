import React from 'react'
import { FlatList ,Button,View,Alert} from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/colors'
import * as productActions from '../../store/actions/products'

const UserProductScreen = props => {

    const userProducts = useSelector(state => state.product.userProducts);
    const dispatch=useDispatch();
    const editProductHandler=(id)=>{
        props.navigation.navigate('EditProductScreen',{
            productId:id
        })
    }

    const deleteHandler=(id)=>{
        Alert.alert("Are You Sure?","Do you really want to delete this item?",
        [{text:"No",style:"default"},
            {text:"yes",style:"destructive",onPress:()=>{
                dispatch(productActions.deletProduct(id))
            }}]);
    }
    return <FlatList
        keyExtractor={item => item.id}
        data={userProducts}
        renderItem={itemData => <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() =>editProductHandler(itemData.item.id)}
        >
            <View style={{ width: "30%" }}><Button title="EDIT" onPress={()=>editProductHandler(itemData.item.id)} color={Colors.primary} /></View>
            <View style={{ width: "30%" }}><Button title="DELETE" onPress={()=>deleteHandler(itemData.item.id)} color={Colors.primary} /></View>


        </ProductItem>} />
}

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