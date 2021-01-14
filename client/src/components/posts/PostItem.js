import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import {connect} from 'react-redux'
import userImage from '../../img/user.png'; 
import auth from '../../reducers/auth';
import {addLike,removeLike, deletePost} from '../../actions/post'



const PostItem = ({auth,
    postData:{_id,date,avatar,comments,likes,name,text,user},
    addLike,removeLike,deletePost,
    showActions
    }) =>{
    console.log(_id, user, auth.user._id);
    const postId = _id;
    if(avatar==null || avatar == undefined){
        avatar=userImage
    }
    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </a>
          </div>
          <div>
            <p className="my-1">
             {text}
            </p>
             <p className="post-date">
                Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>
            {showActions && <Fragment>
              <button onClick={e=>addLike(postId)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
              <span>{likes.length}</span>
            </button>
            <button onClick={e=>removeLike(postId)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${postId}`} className="btn btn-primary">
              Discussion <span className='comment-count'>{comments.length}</span>
            </Link>
            {!auth.loading && user === auth.user._id && (
                <button onClick={e=>deletePost(postId)} type='button' className="btn btn-danger">
                    <i className='fas fa-times' />
                </button>
            )}   
            </Fragment>}
            
           
          </div>
        </div>
        </Fragment>
    )
}

PostItem.propTypes = {
    auth:PropTypes.object.isRequired,
    postData:PropTypes.object.isRequired,
    addLike:PropTypes.func.isRequired,
    removeLike:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired
}
PostItem.defaultProps = {
  showActions:true
}
const mapStateToProps = state =>({
    auth:state.auth
})
export default connect(mapStateToProps,{addLike,removeLike, deletePost})(PostItem);