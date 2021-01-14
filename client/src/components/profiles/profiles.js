import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner'
import {getAllProfiles} from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({profile:{profiles,loading},getAllProfiles,allstate})=>{

    useEffect(()=>{
        getAllProfiles();
        console.log(profiles);
    },[loading]);
   

    
    return (
        <Fragment>
         
          {loading?<Spinner/>:<Fragment>
            <h1 class="large text-primary">Developers</h1>
            <p class="lead">
                <i class="fab fa-connectdevelop"></i> Browse and connect with developers
            </p>  
            <div class="profiles">
                {profiles.length>0?(
                    profiles.map((profile)=>(
                        <ProfileItem key={profile._id}  profileData={profile} />
                        ))
                    ):'<h4>No Profiles</h4>'}
            </div>
            </Fragment>}
        </Fragment>);
    
};

Profiles.propTypes = {
    getAllProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    allstate:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile:state.profile,
    allstate:state
})

export default connect(mapStateToProps,{getAllProfiles})(Profiles);