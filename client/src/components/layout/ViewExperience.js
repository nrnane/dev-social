import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {deleteExpOrEducation} from '../../actions/profile'
import {connect} from 'react-redux'

const ViewExperience = ({experience,deleteExpOrEducation}) =>{

    const experiancesList = experience.map(exp=>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td className="hide-sm">
                <Moment format="DD/MM/YYYY">{exp.from}</Moment> - 
                {exp.to==null?(' Now '):<Moment format="DD/MM/YYYY">{exp.to}</Moment>}
                
            </td>
            <td><button onClick={()=>{deleteExpOrEducation('experience',exp._id)}} className="btn btn-danger">Delete</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experiance Credentials</h2>
            <table>
                <thead>
                    <th>Company</th>
                    <th>Title</th>
                    <th className="hide-sm">Years</th>
                    <th className="hide-sm"></th>
                </thead>
                <tbody>
                    {experiancesList}
                </tbody>
            </table>
        </Fragment>
    )
}

ViewExperience.protoTypes = {
    experience:PropTypes.array.isRequired,
    deleteExpOrEducation:PropTypes.func.isRequired
}

export default connect(null,{deleteExpOrEducation})(ViewExperience);