import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {deleteExpOrEducation} from '../../actions/profile'
import {connect} from 'react-redux'



const ViewEducation = ({education, deleteExpOrEducation}) =>{

    const educationsList = education.map(exp=>(
        <tr key={exp._id}>
            <td>{exp.school}</td>
            <td className="hide-sm">{exp.degree}</td>
            <td className="hide-sm">
                <Moment format="DD/MM/YYYY">{exp.from}</Moment> - 
                {exp.to==null?(' Now '):<Moment format="DD/MM/YYYY">{exp.to}</Moment>}
                
            </td>
            <td><button onClick={()=>{deleteExpOrEducation('education',exp._id)}} className="btn btn-danger">Delete</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Education Details</h2>
            <table>
                <thead>
                    <th>School</th>
                    <th>Degree</th>
                    <th className="hide-sm">Years</th>
                    <th className="hide-sm"></th>
                </thead>
                <tbody>
                    {educationsList}
                </tbody>
            </table>
        </Fragment>
    )
}

ViewEducation.protoTypes = {
    education:PropTypes.array.isRequired,
    deleteExpOrEducation:PropTypes.func.isRequired
}

export default connect(null,{deleteExpOrEducation})(ViewEducation);