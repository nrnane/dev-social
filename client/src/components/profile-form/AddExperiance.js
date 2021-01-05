import React,{Fragment, useState} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {addExperiance} from '../../actions/profile'

const AddExperiance = ({addExperiance,history}) =>{

    const [formData,setFormData] = useState({
        title:'',
        company:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    })

    const [toDateDisable,toggleToDateDisabled] = useState(false);

    const {title,company,location,from,to,current,description} = formData;

    const formUpdate = e=>{setFormData({...formData,[e.target.name]:e.target.value})}

    return(
            <Fragment>
                <h1 className="large text-primary">
                Add An Experience
                </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any developer/programming
                    positions that you have had in the past
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={e=>{
                    e.preventDefault();
                    console.log(formData);
                    addExperiance(formData,history);
                }}>
                    <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e=>formUpdate(e)} required />
                    </div>
                    <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={e=>formUpdate(e)}  required />
                    </div>
                    <div className="form-group">
                    <input type="text" placeholder="Location" value={location} onChange={e=>formUpdate(e)}  name="location" />
                    </div>
                    <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e=>formUpdate(e)}  />
                    </div>
                    <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} onChange={e=>{
                        setFormData({
                            ...formData,
                            current:!current
                        })
                        toggleToDateDisabled(!toDateDisable)
                    }}  /> Current Job</p>
                    </div>
                    <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e=>formUpdate(e)} 
                    disabled={toDateDisable?'disabled':''}  />
                    </div>
                    <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description} onChange={e=>formUpdate(e)} 
                    ></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
                </Fragment>
    )
}

AddExperiance.propTypes = {
    addExperiance:PropTypes.func.isRequired
}
const mapStateToProps = state =>({
    profile:state.profile
}) 
export default connect(mapStateToProps,{addExperiance})(withRouter(AddExperiance));