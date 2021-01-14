import axios from 'axios';
import {setAlert} from './alert';
import {GET_POSTS,GET_POST,POST_ERROR, UPDATE_LIKES, DELETE_POST,ADD_POST} from './types';
const API_URI = 'http://localhost:5001';

//Get posts
export const getPosts = ()=> async dispatch =>{
    try {

        const res = await axios.get(API_URI+'/api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        });

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:JSON.stringify(err)}
        });
    }
}

//Get post
export const getPost = (id)=> async dispatch =>{
    try {

        const res = await axios.get(API_URI+`/api/posts/${id}`);
        dispatch({
            type:GET_POST,
            payload:res.data
        });

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:JSON.stringify(err)}
        });
    }
}

//add like
export const addLike = (id)=> async dispatch =>{
    try {

        const res = await axios.put(API_URI+`/api/posts/like/${id}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        });

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:JSON.stringify(err)}
        });
    }
}
//add like
export const removeLike = (id)=> async dispatch =>{
    try {

        const res = await axios.put(API_URI+`/api/posts/unlike/${id}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        });

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:JSON.stringify(err)}
        });
    }
}


//delete post
export const deletePost = (id)=> async dispatch =>{
    try {

        const res = await axios.delete(API_URI+`/api/posts/${id}`);
        dispatch({
            type:DELETE_POST,
            payload:id
        });

        dispatch(setAlert('Post removed','success'));

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:JSON.stringify(err)}
        });
    }
}

export const createPost = (formData)=>async dispatch=>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.post(API_URI+'/api/posts',formData, config);
        dispatch({
            type:ADD_POST,
            payload:res.data
        });
        dispatch(setAlert('Post created','success'))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:JSON.stringify(err)}
        });
    }
}