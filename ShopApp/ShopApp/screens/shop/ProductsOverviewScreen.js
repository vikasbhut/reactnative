import React,{useEffect,useState, useCallback} from "react"
import { Button, FlatList,View,ActivityIndicator,Text} from "react-native";
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/colors'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import {useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart'
import {fetchProduct} from '../../store/actions/products'
import { set } from "react-native-reanimated";

const ProductOverviewScreen = props => {

    const[isRefreshing,setRefresh]=useState(false);
    const[isLoading,setIsLoading]=useState(false);
    const[error,setError]=useState(null);
    const dispatch=useDispatch();
    const products = useSelector(state => state.product.availableProducts);
    const viewDetailsHandler=(product)=>{
        props.navigation.navigate('ProductDetailScreen',{product});
    }

    const fetchData=useCallback(
        async ()=>{
            setRefresh(true);
            try
            {
                await dispatch(fetchProduct());
            }
            catch(err)
            {
                setError(err.message);
            }
            setRefresh(false);
        },
        [dispatch,setIsLoading,setError],
    )
    useEffect(()=>{
        setIsLoading(true);
        fetchData().then(()=>setIsLoading(false)).catch(()=>setIsLoading(false));
    },[dispatch,fetchData]);

    useEffect(() => {
        const willFocuSubscription = props.navigation.addListener('willFocus', fetchData);
        return () => {
            willFocuSubscription.remove();
        }
    }, [fetchData]);
   if(isLoading)
   {
       return (
           <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
               <ActivityIndicator size="large" color={Colors.primary}/>
           </View>
       );
   }
   if(error)
   {
    return (
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
           <Text style={{fontFamily:"OpenSnas-Regular",fontSize:18,color:"red"}}>{error}</Text>
        </View>
    );
   }
   if(!isLoading&&products.length===0)
   {
    return (
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
           <Text style={{fontFamily:"OpenSnas-Regular",fontSize:18}}>No products found may be start adding some!!!</Text>
        </View>
    );
   }
   else{
    return (
        <FlatList
            onRefresh={fetchData}
            refreshing={isRefreshing}
            keyExtractor={item => item.id}
            data={products}
            style={{width:"100%"}}
            contentContainerStyle={{alignItems:"center"}}
            renderItem={itemData => 
                <ProductItem
                    title={itemData.item.title}
                    price={itemData.item.price}
                    imageUrl={itemData.item.imageUrl}
                    onSelect={()=>viewDetailsHandler(itemData.item)}
                 >
                <View style={{width:"40%"}}><Button title="View Details" color={Colors.primary} onPress={()=>{viewDetailsHandler(itemData.item)}}/></View>
                <View style={{width:"40%"}}><Button title="Add To Cart" color={Colors.primary} onPress={()=>dispatch(addToCart(itemData.item))}/></View>
                </ProductItem>
            
            
            
            }
        />
    );
   }
}

ProductOverviewScreen.navigationOptions=({navigation})=>{
    return {
        title:"All Products",
        headerRight:()=>(
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                     <Item title="CART" iconName='md-cart' onPress={() =>{navigation.navigate('CartScreen')}} />
                </HeaderButtons>
        ),
        headerLeft:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                 <Item title="menu" iconName='md-menu' onPress={() =>{navigation.toggleDrawer()}} />
            </HeaderButtons>
    )
    }
}
export default ProductOverviewScreen;