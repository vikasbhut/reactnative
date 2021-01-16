import Order from '../../models/order'
export const ADD_ORDER="ADD_ORDER"
export const SET_ORDER="SET_ORDER"

export const fetchOrder=()=>{
    return async (dispatch,getState)=>{
       try{
      
        const userId=getState().auth.userId;
        console.log(userId);
        const response=await fetch(`https://shoppingcartreactnative.firebaseio.com/orders/${userId}.json`);
        if(!response.ok)
         {
            const errData = await response.json();
            console.log(errData.error.message);
            throw new Error(errData.error.message);
            
         }
         const resData=await response.json();
         const loadedOrders=[];
         for(let key in resData)
         {
             loadedOrders.push(new Order(key,resData[key].items,resData[key].totalAmount,new Date(resData[key].date)));
         }
         dispatch({type:SET_ORDER,orders:loadedOrders});
       }
       catch(err)
       {
           throw err;
       }
    }
}

export const addOrder=(items,totalAmount)=>{
    return async (dispatch,getState)=>{
        const date=new Date();
        const token=getState().auth.token;
        const userId=getState().auth.userId;
        console.log(userId);
        const response=await fetch(`https://shoppingcartreactnative.firebaseio.com/orders/${userId}.json?auth=${token}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              items,
              totalAmount,
              date:date.toISOString(),
            })
        });

        if(!response.ok)
        {
            throw new Error('Something went wrong');
        }

      const resData=await response.json();
        
        
        dispatch({
            type:ADD_ORDER,
            orderData:{
                id:resData.name,
                items:items,
                totalAmount:totalAmount,
                date:date
            }
        });
    }
}