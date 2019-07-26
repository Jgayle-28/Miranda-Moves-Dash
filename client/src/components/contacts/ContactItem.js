import React, { useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);

  const {
    id,
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
    contactContext.deleteContact(id);
    // Clears contact being held in current state
    contactContext.clearCurrent(contact);
  };
  return (
    <>
      <div className="card bg-light">
        <h3 className="text-primary text-left">
          {firstname.charAt(0).toUpperCase() + firstname.slice(1)}{' '}
          {lastname.charAt(0).toUpperCase() + lastname.slice(1)}
          <span style={{ float: 'right' }} className="badge btn btn-success">
            Create Estimate
          </span>
        </h3>
        <ul className="list">
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
          {movedate && (
            <li>
              <i className="fas fa-truck-moving" /> {movedate}
            </li>
          )}
          {contactcomments && (
            <li>
              <i className="fas fa-comment" /> {contactcomments}
            </li>
          )}
        </ul>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => contactContext.setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </div>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
