import AsyncStorage from '@react-native-community/async-storage'

export const  SIGN_UP="SIGN_UP"
export const LOGIN="LOGIN"
export const AUTHENTICATE="AUTHENTICATE"
export const LOGOUT="LOGOUT"

export const logout=()=>{
    AsyncStorage.removeItem('userData');
    clearLogoutTimer();
    return {type:LOGOUT}
}

let timer;

const clearLogoutTimer=()=>{
    if(timer)
    {
        clearTimeout(timer);
    }
}
const setLogOutTimer=(expirationTime)=>{
    return async dispatch=>{
       timer=setTimeout(()=>{
            dispatch(logout());
        },expirationTime/100)
    }
}
export const authenticate=(token,userId)=>{
    return{
        type:AUTHENTICATE,
        token:token,
        userId:userId
    }
}

const saveDataToStorage=(token,userId,expirationDate)=>{
    AsyncStorage.setItem("userData",JSON.stringify({
        token:token,
        userId:userId,
        expiryDate:expirationDate.toISOString()
    }));
}
export const login=(email,password)=>{
    return async dispatch=>{
        const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTrtSfk8Z3sdi4lAKis8gSx0vGALCg3EI",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password,
                returnSecureToken:true
            })
        });
        if(!response.ok)
        {
            const errData=await response.json();
            throw new Error(errData.error.message);
        }
        const resData=await response.json();
        dispatch({type:AUTHENTICATE,token:resData.idToken,userId:resData.localId});
        const expirationDate=new Date(new Date().getTime()+(Number(resData.expiresIn)*1000));
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
        dispatch(setLogOutTimer(Number(resData.expiresIn)*1000));
    }
}

export const signUp=(email,password)=>{
    return async dispatch=>{
        const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTrtSfk8Z3sdi4lAKis8gSx0vGALCg3EI",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password,
                returnSecureToken:true
            })
        });
        if(!response.ok)
        {
            const errData=await response.json();
            throw new Error(errData.error.message);
        }
        const resData=await response.json();
        dispatch({type:AUTHENTICATE,token:resData.idToken,userId:resData.localId})
    }
}