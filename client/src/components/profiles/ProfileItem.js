import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import user from '../../img/user.png'; 

const ProfileItem = ({profileData:{
  user:{_id,name,avatar},
  company,
  bio,
  status,
  website,
  skills,
  location
}})=>{
   

    return (
        <Fragment>
         <div className="profile bg-light">
          <img
            className="round-img"
            src={avatar?avatar:user}
            alt=""
          />
          <div>
            <h2>{name}</h2>
            <p>{status} {company && <span>at {company}</span>}</p>
            <p>{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
          </div>

          <ul>
            
            {skills.slice(0,4).map((skill,index)=>(
              <li key={index} className="text-primary">
                <i className="fas fa-check"></i> {skill}
              </li>
            ))}
          </ul>
        </div>
        </Fragment>);
    
};

ProfileItem.propTypes = {
    profileData:PropTypes.object.isRequired, 
}

export default ProfileItem;