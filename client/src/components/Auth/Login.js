import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [formData, setFormData] = useState({
        email:'',
        password:'',
    
    });

    const {email,password} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
       
            const newUser = {
                email,
                password
            }

            try {
                const config = {
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
                const body = JSON.stringify(newUser);

                var res = await axios.post('http://localhost:5000/api/auth',body,config);
                console.log(res.data);

            } catch (error) {
                //console.log(error);
                console.error(error.response.data);
            }
        
    }

    return (
        <Fragment>
            <div className="alert alert-danger">
        Invalid credentials
      </div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e=>onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e=>onChange(e)}
            required
            name="password"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
        </Fragment>
    )
}

export default Login;