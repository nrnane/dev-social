import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    }
    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help from
              other developers
            </p>
            <div className="buttons">
              <li><Link to="/register" className="btn btn-primary">Sign Up</Link></li>
                <li><Link to="/login" className="btn btn-light">Login</Link></li>
            </div>
          </div>
        </div>
      </section>
    )
}

const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing);