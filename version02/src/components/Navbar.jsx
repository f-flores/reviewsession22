import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ isLoggedIn, email }) => (
  <nav className="navbar navbar-expand-sm navbar-light bg-light">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <div className="navbar-nav">
        <li className="nav-item active">
          <NavLink className="nav-item nav-link" to="/">Home</NavLink>
        </li>
        {
          isLoggedIn
            ? (
              <Fragment>
                <li className="nav-item">
                  <span className="nav-link">
                    Welcome
                    {' '}
                    {email}
                  </span>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">Logout</NavLink>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
              </Fragment>
            )}
      </div>
    </div>
  </nav>
);

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

export default Navbar;
