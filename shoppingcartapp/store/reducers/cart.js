import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import {ADD_ORDER} from '../actions/orders'
import {DELETE_PRODUCT} from '../actions/products'
import CartItem from '../../models/cart'
const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const title = addedProduct.title;

            let updatedCartItem;
            if (state.items[addedProduct.id]) {
                updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    title,
                    state.items[addedProduct.id].sum + prodPrice
                );
            }
            else {
                updatedCartItem = new CartItem(1, prodPrice, title, prodPrice);
            }
            return { items: { ...state.items, [addedProduct.id]: updatedCartItem }, totalAmount: state.totalAmount + prodPrice }

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productId];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQty > 1) {
                const updatedCartItem = new CartItem(selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.producttitle,
                    selectedCartItem.sum - selectedCartItem.productPrice);

                updatedCartItems = { ...state.items, [action.productId]: updatedCartItem };
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.productId];
            }
            return { ...state, items: updatedCartItems,totalAmount:state.totalAmount-selectedCartItem.productPrice}
        case ADD_ORDER:
                return initialState;
        case DELETE_PRODUCT:
                if(!state.items[action.pid])
                {
                    return state;
                }
                const itemTotal = state.items[action.pid].sum;
                const updatedItems={...state.items};
                delete updatedItems[action.pid];
                return {...state,items:updatedItems,totalAmount:state.totalAmount-itemTotal};

        default:
            return state;
    }

}