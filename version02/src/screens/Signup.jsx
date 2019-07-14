import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

class Signup extends Component {
  state = {
    success: false,
    email: '',
    password: '',
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  // Method to register a new user
  register = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    API
      .register({ email, password })
      .then((res) => {
        console.log(res.data);
        this.setState({ success: res.data });
      })
      .catch(err => console.log(err.response.data));
  }

  render() {
    const { success, email, password } = this.state;

    // If Signup was a success, take them to the Login page
    if (success) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <form>
            <h3>Sign Up!</h3>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="email"
              />
              <small id="emailHelp" className="form-text text-muted">Enter your email</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="btn btn-success" onClick={this.register}>Sign Up!</button>
          </form>

        </div>
      </div>
    );
  }
}

export default Signup;
