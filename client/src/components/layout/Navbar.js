import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logoutUser, user } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logoutUser();
    clearContacts();
  };

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
      {/* <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>{' '}
      </li> */}
    </>
  );
  const guestLinks = (
    <>
      {/* <li>
            <Link to="/register">Register</Link>{' '}
          </li> */}
      {/* <li>
        <Link to="/login">Login</Link>{' '}
      </li> */}
    </>
  );

  return (
    <>
      <div className="navbar bg-primary">
        <h1>
          <i className={icon} /> {/* */}
          {title}
        </h1>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
    </>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};
Navbar.defaultProps = {
  title: 'Move keeper',
  icon: 'fas fa-address-card'
};

export default Navbar;
