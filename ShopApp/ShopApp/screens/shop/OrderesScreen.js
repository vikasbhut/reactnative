import React,{useEffect,useState} from "react"
import { FlatList,ActivityIndicator,View,Alert} from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { useSelector,useDispatch } from 'react-redux'
import OrderItem from '../../components/shop/OrderItem'
import {fetchOrder} from '../../store/actions/orders'
import Colors from '../../constants/colors'

const OrdersScreen = props => {

    const[error,setError]=useState(null);
    const[isLoading,setIsLoading]=useState(false);
    const dispatch=useDispatch();
    const fetchData=async ()=>{
        setIsLoading(true);
        try{
            await dispatch(fetchOrder());
        }
        catch(err)
        {
            setError(err.message);
        }
        setIsLoading(false);
    }
    useEffect(()=>{
        if(error)
        {
            Alert.alert('An error occurred!!',error,[{text:"Okay"}])
        }
    },[error])

    useEffect(()=>{
      fetchData();
    },[dispatch]);
    const orders = useSelector(state => state.order.orders.sort((a, b) => b.date - a.date));
    if(isLoading)
    {
        return (
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        );
    }
    else{
        return (
            <FlatList
                data={orders}
                renderItem={itemData => <OrderItem
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                    totalAmount={itemData.item.totalAmount}
                />}
            />
        );
    }
}

OrdersScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Your Orders",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName='md-menu' onPress={() => { navigation.toggleDrawer() }} />
            </HeaderButtons>
        )
    }
}
export default OrdersScreen;