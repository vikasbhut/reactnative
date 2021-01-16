import React from 'react'
import { FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux'
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem'

const OderScreen = props => {

    const orders = useSelector(state => state.order.orders.sort((a,b)=>b.date-a.date));
    return <FlatList
        keyExtractor={item => item.id}
        data={orders}
        renderItem={itemData =><OrderItem
                        amount={itemData.item.totalAmount}
                        date={itemData.item.readableDate}
                        items={itemData.item.items}
        />}
    />

};

OderScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Your Orders",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="MENU" iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
            </HeaderButtons>
        )
    }
}

export default OderScreen;