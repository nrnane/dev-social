import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Spinner from '../layout/Spinner';
import {getPost} from '../../actions/post';
import PostItem from './PostItem';

const Post = ({getPost,post:{post,loading},match}) =>{
    useEffect(()=>{
        getPost(match.params.id);
        console.log(post,match);
    },[getPost,loading])
    return loading || post == null?<Spinner />:<Fragment>
         <Link to="/posts" class="btn">Back To Posts</Link>
        <PostItem postData={post} showActions={false} />
    </Fragment>
    
}

Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    //post:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    post:state.post
})
export default connect(mapStateToProps,{getPost})(Post);