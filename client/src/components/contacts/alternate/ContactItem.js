import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContactContext from '../../../context/contact/ContactContext';
import AuthContext from '../../../context/auth/AuthContext';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { toggleModal } = authContext;

  const {
    _id,
    firstname,
    lastname,
    email,
    phone,
    phoneext,
    phonetype,
    referedby,
    movedate,
    contactcomments
  } = contact;

  const onDelete = () => {
    contactContext.deleteContact(_id);
    // Clears contact being held in current state
    contactContext.clearCurrent(contact);
  };
  const onEditClick = () => {
    contactContext.setCurrent(contact);
    toggleModal(true);
  };
  return (
    <>
      <div className="card bg-light">
        <h3 style={{ color: '#3F729B' }} className="text-left">
          {firstname.charAt(0).toUpperCase() + firstname.slice(1)}{' '}
          {lastname.charAt(0).toUpperCase() + lastname.slice(1)}
        </h3>
        <div className="grid-3">
          <div className="">
            <ul className="list" style={{ color: '#3E4551' }}>
              {email && (
                <li>
                  <i className="fas fa-envelope-open" /> {email}
                </li>
              )}
              {phone && (
                <li>
                  <i className="fas fa-phone" /> {phone} / Ext: {phoneext} /{' '}
                  {phonetype.charAt(0).toUpperCase() + phonetype.slice(1)}
                  {/* {phoneext && ` * ${phoneext}`}/ {phonetype} */}
                </li>
              )}
              {referedby && (
                <li>
                  <i className="fas fa-user-friends" /> Refered by: {referedby}
                </li>
              )}
            </ul>
          </div>
          <div className="">
            <ul className="list" style={{ color: '#3E4551' }}>
              {movedate && (
                <li>
                  <i className="fas fa-truck-moving" />{' '}
                  <Moment format="MM/DD/YYYY">{moment.utc(movedate)}</Moment>
                  {/* {movedate} */}
                </li>
              )}
              {contactcomments && (
                <li>
                  <i className="fas fa-comment" /> {contactcomments}
                </li>
              )}
            </ul>
          </div>
          <div className="all-right">
            <button
              style={{ width: '140px' }}
              className="badge btn btn-success"
            >
              <i
                className="fas fa-truck-loading"
                style={{ marginRight: '.3rem' }}
              />
              <Link to="/estimate" style={{ color: '#ffffff' }}>
                Create Estimate
              </Link>
            </button>
            {/* <button style={{ width: '140px' }} className="badge btn btn-info">
              <i
                className="fas fa-location-arrow"
                style={{ marginRight: '.3rem' }}
              />
              Add Destination
            </button> */}
            <button
              style={{ width: '140px' }}
              className="badge btn btn-dark btn-sm"
              onClick={onEditClick}
            >
              <i className="fas fa-pen" style={{ marginRight: '.3rem' }} /> Edit
              Contact
            </button>
            <button
              style={{ width: '140px' }}
              className="badge btn btn-danger btn-sm"
              onClick={onDelete}
            >
              <i
                className="fas fa-trash-alt"
                style={{ marginRight: '.3rem' }}
              />{' '}
              Delete Contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
