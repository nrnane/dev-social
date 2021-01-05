import axios from 'axios'
import { setAlert } from './alert';
//import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types'

const API_URI = 'http://localhost:5001';

//get current user profile
export const getCurrentProfile =()=>async dispatch => {
    try {
        const res = await axios.get(API_URI+'/api/profile/me');
        console.log(res)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

export const createProfile = (
    formData,
    history,
    edit=false
) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.post(API_URI+'/api/profile',formData, config);
        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert(edit?'Profile updated':'Profile created','success'));
        if(!edit){
            history.push('/dashboard');
        }

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}


export const Profile = (
    formData,
    history,
    edit=false
) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.post(API_URI+'/api/profile',formData, config);
        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert(edit?'Profile updated':'Profile created','success'));
        if(!edit){
            history.push('/dashboard');
        }

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

//AddExperiance
export const addExperiance = (
    formData,
    history
) => async dispatch => {
    try {
        
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.put(API_URI+'/api/profile/experience',formData,config);
        
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experiance Updated','success'));
       // if(!edit){
        history.push('/dashboard');
        //}

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}


//AddEducation
export const addEducation = (
    formData,
    history
) => async dispatch => {
    try {
        if(localStorage.token){
            setAuthToken(localStorage.token)
         }
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.put(API_URI+'/api/profile/education',formData, config);
        
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education Updated','success'));
       // if(!edit){
        history.push('/dashboard');
        //}

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

export const deleteExpOrEducation = (table,id)=>async dispatch =>{
    if(table !=='' || table!==null || table !==undefined){
        try {
        
            const res = await axios.delete(API_URI+`/api/profile/${table}/${id}`);
            
            dispatch({
                type:UPDATE_PROFILE,
                payload:res.data
            });
            dispatch(setAlert(`${table} deleted`,'success'));
        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            });
        }
    }
}



export const deleteAccount = ()=>async dispatch =>{
    if(window.confirm('Are you sure? this can not be undone !')){
        try {
        
            await axios.delete(API_URI+`/api/profile`);
            
            dispatch({ type:CLEAR_PROFILE});
            dispatch({ type:ACCOUNT_DELETED});
            dispatch(setAlert(`Your account permenently deleted`));
        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            });
        }
    }
}
