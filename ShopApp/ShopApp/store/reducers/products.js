import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT ,SET_PRODUCT} from '../actions/products'
import Product from '../../models/product'
const initialState = {
    availableProducts: [],
    userProducts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
                return {
                    availableProducts:action.products,
                    userProducts:action.userProducts
                }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.id);
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.id);
            const updatedUserProds = [...state.userProducts];
            const updatedAvailableProds = [...state.availableProducts];
            const updatedUserProd = new Product(action.id,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            );
           const updatedAvailableProd = new Product(action.id,
                state.availableProducts[availableProductIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.availableProducts[availableProductIndex].price
            );
            updatedUserProds[productIndex]=updatedUserProd;
            updatedAvailableProds[availableProductIndex]=updatedAvailableProd;
            return{
                availableProducts:updatedAvailableProds,
                userProducts:updatedUserProds
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(action.productData.id, action.productData.ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price);
            return {
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }

        case DELETE_PRODUCT:
            return {
                availableProducts: state.availableProducts.filter(product => product.id !== action.id),
                userProducts: state.userProducts.filter(product => product.id !== action.id)
            }
        default:
            return state;
    }
};