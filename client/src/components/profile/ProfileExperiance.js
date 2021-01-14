import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperiance = ({experience:{
    company,
    title,
    location,current,
    to,
    from,
    description
}})=>{
    return (
        <Fragment>
        <div>
            <h3 className="text-dark">{company}</h3>
            <p><Moment format='DD/MM/YYYY'>{from}</Moment> - {!to?'Now':<Moment format='DD/MM/YYYY'>{to}</Moment>}</p>
            <p><strong>Position: </strong>{title} at {location}</p>
            <p>
            <strong>Description: </strong>{description}
            </p>
        </div>
        </Fragment>
    );
}

ProfileExperiance.propTypes = {
    experience:PropTypes.object.isRequired
}

export default ProfileExperiance;
