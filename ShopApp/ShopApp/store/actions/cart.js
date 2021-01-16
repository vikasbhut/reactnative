export const ADD_CART='ADD_CART'
export const REMOVE_CART='REMOVE_CART'

export const addToCart=(product)=>{
    return{
        type:ADD_CART,
        product:product
    }
}

export const removeFromCart=(id)=>{
    return{
        type:REMOVE_CART,
        id:id
    }
}