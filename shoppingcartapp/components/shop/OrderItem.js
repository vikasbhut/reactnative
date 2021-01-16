import React,{useState} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CartItem from './CartItem'
import Colors from '../../constants/colors'
import Card from '../UI/Card'


const OrderItem = props => {
    const[showDetail,setShowDetail]=useState(false);
    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title={showDetail?"Hide Details":"Show Details"} color={Colors.primary} onPress={()=>{
                setShowDetail(prevState=>!prevState);
            }} />
        {showDetail&&<View style={styles.detailItems}>
            {
                props.items.map((item,index)=><CartItem 
                                        key={index}
                                        quantity={item.quantity}
                                        title={item.producttitle}
                                        price={item.productPrice}
                                        showDeleteBtn={false}/>)
            }    
        </View>}
        </Card>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20,
        padding: 10,
        alignItems:"center"
    },
    summary:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width:"100%",
        marginBottom:16
    },
    totalAmount:{
        fontFamily:"OpenSans-Bold",
        fontSize:16,
    },
    date:{
        fontSize:16,
        fontFamily:"OpenSans-Regular",
        color:"#888"
    },
    detailItems:{
        width:"100%",
        margin:8
    }
});
export default OrderItem;