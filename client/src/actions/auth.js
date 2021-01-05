import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types'
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';

//load user
export const loadUser = ()=>async dispatch=>{
     if(localStorage.token){
        setAuthToken(localStorage.token)
     }
     try{
       const res = await axios.get('http://localhost:5001/api/auth');
       dispatch({
         type:USER_LOADED,
         payload:res.data
       })
     } catch(err){
       dispatch({
         type:AUTH_ERROR
       })
     }
}

//Register User
export const  register = ({name,email,password}) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name,email,password});

    try{
        const res = await axios.post('http://localhost:5001/api/users',body,config);
        if(res){
            console.log(res);
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            });
            //setAlert('Registerd','success');
        }
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }
}//end register


//Login User
export const  login = ({email,password}) => async dispatch =>{
  console.log(email,password)
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password});

    console.log(body,config);
    try{
        const res = await axios.post('http://localhost:5001/api/auth',body,config);
        if(res){
            console.log(res);
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            });
            //setAlert('Registerd','success');
            dispatch(loadUser())
        }
    }catch(err){
        console.log(err);
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
}//end register


//LOGOUT / clear profile

export const logout = ()=> dispatch=>{
  dispatch({
    type:LOGOUT
  })
}
