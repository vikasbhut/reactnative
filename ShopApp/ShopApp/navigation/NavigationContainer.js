import React,{useEffect,useRef} from 'react'
import Shopnavigator from './shopnavigator'
import {useSelector} from 'react-redux'
import {NavigationActions} from 'react-navigation'
const NavigationContainer=props=>{
    
    const isAuth=useSelector(state=>!!state.auth.token);
  
    const navRef=useRef();
    useEffect(()=>{
        if(!isAuth)
        {
            navRef.current.dispatch(NavigationActions.navigate({routeName:"Auth"}));
        }
    },[isAuth])
    return <Shopnavigator ref={navRef}/>;
}
export default NavigationContainer;