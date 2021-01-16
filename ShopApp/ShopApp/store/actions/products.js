import Product from '../../models/product'
import PRODUCTS from '../../data/dummy-data'

export const DELETE_PRODUCT="DELETE_PRODUCT"
export const UPDATE_PRODUCT="UPDATE_PRODUCT"
export const CREATE_PRODUCT="CREATE_PRODUCT"
export const SET_PRODUCT="SET_PRODUCT"



export const fetchProduct=()=>{
    return async (dispatch,getState)=>{
        const userId=getState().auth.userId;
        try{
            const response=await fetch("https://shoppingcartreactnative.firebaseio.com/products.json");
            
            if(!response.ok)
            {
                throw new Error('Something Went Wrong');
            }
            const resData=await response.json();
            const loadedProducts=[];
            for(let key in resData)
            {
                loadedProducts.push(new Product(key,resData[key].ownerId,resData[key].title,resData[key].imageUrl,resData[key].description,resData[key].price));
            }
            dispatch({
                type:SET_PRODUCT,
                products:loadedProducts,
                userProducts:loadedProducts.filter(product=>product.ownerId===userId)
            });
        }
        catch(err)
        {
            throw err;
        }
     
     }    
}
export const deleteProduct=(id)=>{
    return async (dispatch,getState)=>{
        const token=getState().auth.token;
        const response=await fetch(`https://shoppingcartreactnative.firebaseio.com/products/${id}.json?auth=${token}`,{
            method:"DELETE",
         });

         if(!response.ok)
         {
             throw new Error('Something Went Wrong');
         }
        dispatch({
            type:DELETE_PRODUCT,
            id:id
        });
    }
}

export const createProduct=(title,imageUrl,description,price)=>{

    return async (dispatch,getState)=>{
        const token=getState().auth.token;
        const userId=getState().auth.userId;
        const response=await fetch(`https://shoppingcartreactnative.firebaseio.com/products.json?auth=${token}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                ownerId:userId
            })
        });

      

        const resData=await response.json();
       
        dispatch({
            type:CREATE_PRODUCT,
            productData:{
                id:resData.name,
                title,
                imageUrl,
                description,
                price
            }
        });
     
    }
     
}
export const updateProduct=(id,title,imageUrl,description)=>{

    return async (dispatch,getState)=>{

        const token=getState().auth.token;
        
        const response=await fetch(`https://shoppingcartreactnative.firebaseio.com/products/${id}.json?auth=${token}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title,
                imageUrl,
                description,
            })
        });

        if(!response.ok)
        {
            throw new Error('Something Went Wrong');
        }
        dispatch({
            type:UPDATE_PRODUCT,
            id:id,
            productData:{
                title,
                imageUrl,
                description,
            }
        });
    }

}