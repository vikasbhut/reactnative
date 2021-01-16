import React,{useState} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Card from '../UI/Card'
import Colors from '../../constants/colors'
import CartItem from '../../components/shop/CartItem'

const OrderItem = props => {
    const[showDetail,setShowDetail]=useState(false);
    return (
        <Card style={styles.item}>
        <View style={styles.summary}>
            <Text style={styles.amount}>${props.totalAmount}</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button title={showDetail?"Hide Details":"Show Details"}  color={Colors.primary} onPress={()=>{
            setShowDetail(prevState=>!prevState);
        }}/>
        {showDetail&&props.items.map((item,index)=><CartItem key={index}
            quantity={item.quantity}
            title={item.title}
            price={item.price}
            style={{margin:6,width:"100%"}}
        />)}
    </Card>
    );
};

const styles = StyleSheet.create({
    date:{
        fontFamily:"OpenSans-Regular",
        fontSize:15
    },
    amount:{
        color:"#888",
        fontSize:18,
        fontFamily:"OpenSans-Regular"
    },
    item:{
        backgroundColor:"white",
        margin:20,
        padding:10,
        borderRadius:10,
        alignItems:"center"
    },
    summary:{
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        justifyContent:"space-between",
        margin:9
    }
});
export default OrderItem;