import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logoutUser } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logoutUser();
    clearContacts();
  };

  const authLinks = (
    <>
      {/* <li style={{ marginRight: '.5rem' }}>
        <Link to="/altlayout">Alternate Layout</Link>
      </li> */}
      {/*
      <li>
        <Link to="/">
          <i className="fas fa-home" /> Home
        </Link>
      </li>
*/}
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm logout"> Logout</span>
        </a>
      </li>
      {/*
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
      <div className="navbar bg-blue-grey">
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
  title: 'Opportunity keeper',
  icon: 'fas fa-address-card'
};

export default Navbar;
