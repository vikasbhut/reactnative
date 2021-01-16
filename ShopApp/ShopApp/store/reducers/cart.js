import Cart from '../../models/cart'
import {ADD_CART,REMOVE_CART} from '../actions/cart'
import { ADD_ORDER } from '../actions/orders'

const initialState={
    items:{},
    totalAmount:0
}

export default (state=initialState,action)=>{
    switch(action.type){
        
        case REMOVE_CART:
                const cartItem=state.items[action.id];
                const quantity=cartItem.quantity;
                let updatedCartItems;
                if(quantity>1)
                {
                    const updatedCartItem=new Cart(
                        quantity-1,
                        cartItem.title,
                        cartItem.price,
                        cartItem.sum-cartItem.price
                    );
                    updatedCartItems={...state.items,[action.id]:updatedCartItem};
                }else{
                    updatedCartItems={...state.items};
                    delete updatedCartItems[action.id];
                }
                return{
                    ...state,
                    items:updatedCartItems,
                    totalAmount:state.totalAmount-cartItem.price
                }

        case ADD_CART:
                const product=action.product;
                const id=product.id;
                const title=product.title;
                const price=product.price;
                let updatedCartItem;
                if(state.items[id])
                {
                    updatedCartItem=new Cart(
                        state.items[id].quantity+1,
                        title,
                        price,
                        state.items[id].sum+price
                    );
                }
                else{
                    updatedCartItem=new Cart(1,title,price,price);
                }
                return {
                    ...state,
                    items:{...state.items,[id]:updatedCartItem},
                    totalAmount:Math.round((state.totalAmount+price)*100)/100
                }
        case ADD_ORDER:
            return initialState;
        default:
            return state;
    }
}