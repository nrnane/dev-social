import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteAccount, getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import ViewExperience from '../layout/ViewExperience'
import ViewEducation from '../layout/ViewEducation'

 const Dashboard = ({getCurrentProfile,auth:{user},
    profile:{profile,loading},deleteAccount
    }) => {

     useEffect(()=>{
        getCurrentProfile();
     },[loading, getCurrentProfile]);
     
     console.log(profile)

     const Form = <Fragment>
    <DashboardActions />
      <table class="table">
          <tbody>
         <tr>
             <td>Name</td>
             <td> {user && user.name}</td>
         </tr>
         <tr>
             <td>Company</td>
             <td>{profile && profile.company}</td>
         </tr>
         <tr>
             <td>Location</td>
            <td>{profile && profile.location}</td>
         </tr>
         <tr>
             <td>Status</td>
            <td>{profile && profile.status}</td>
         </tr>
         <tr>
             <td>Skills</td>
             <td>{profile && profile.skills}</td>
         </tr>
         <tr>
             <td>Bio</td>
             <td>{profile && profile.bio}</td>
         </tr>
         </tbody>
     </table>
     {profile && profile.experience?<ViewExperience experience={profile.experience} />:''}
     {profile && profile.education?<ViewEducation education={profile.education} />:''}
    
    <button onClick={()=>deleteAccount()} className="btn btn-danger">Delete my Account</button>
    
 </Fragment>;
 //<Spinner />
     const LandingConetnt = <Fragment>
    <h1  className='large text-primary'>Dashboard</h1>
     <p className='lead'>
         <i className='fas fa-user'></i> Welcome {user && user.name}
         <span>{profile && profile.bio!==null?'Has':''}</span>
     </p>
     <DashboardActions />
     <Link to='/create-profile' className='btn btn-primary'>Create Profile</Link>
     </Fragment>
     return loading && profile ===null?(
         <Spinner />
     ):(
        profile===null?LandingConetnt:Form
     );

    
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    auth:state.auth,
    profile:state.profile
});
export default connect(mapStateToProps,{getCurrentProfile, deleteAccount})(Dashboard);
