import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  useEffect(() => {
    if (contactContext.current !== null) {
      setContact(contactContext.current);
    } else {
      setContact({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        phoneext: '',
        phonetype: '',
        referedby: '',
        movedate: '',
        contactcomments: ''
      });
    }
  }, [contactContext, contactContext.current]);

  const [contact, setContact] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    phoneext: '',
    phonetype: '',
    referedby: '',
    movedate: '',
    contactcomments: ''
  });

  const {
    firstname,
    lastname,
    email,
    phone,
    phonetype,
    phoneext,
    referedby,
    movedate,
    contactcomments
  } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (contactContext.current === null) {
      contactContext.addContact(contact);
    } else {
      contactContext.updateContact(contact);
    }

    setContact({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      phoneext: '',
      phonetype: '',
      referedby: '',
      movedate: '',
      contactcomments: ''
    });
  };

  const clearAll = () => {
    contactContext.clearCurrent();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2 className="text-primary">
          <i
            className={
              contactContext.current ? 'fas fa-user-edit' : 'fas fa-user-plus'
            }
          />{' '}
          {contactContext.current ? ' Edit Contact' : ' Add New Contact'}
        </h2>
        <input
          type="text"
          placeholder="First name"
          name="firstname"
          value={firstname}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Last name"
          name="lastname"
          value={lastname}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="text"
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone number"
          name="phone"
          value={phone}
          onChange={onChange}
        />
        <select
          name="phonetype"
          value={phonetype}
          onChange={onChange}
          className="select-css"
        >
          <option value="0">Select Phone Type</option>
          <option value="Mobile">Mobile</option>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
        </select>
        {/* <input
          type="text"
          placeholder="Phone type"
          name="phonetype"
          value={phonetype}
          onChange={onChange}
        /> */}
        <input
          type="text"
          placeholder="Phone extension"
          name="phoneext"
          value={phoneext}
          onChange={onChange}
        />
        <input
          style={{ marginBottom: '.5rem' }}
          type="text"
          placeholder="Refered by"
          name="referedby"
          value={referedby}
          onChange={onChange}
        />
        <label className="date-label" htmlFor="movedate">
          Move Date
        </label>
        <input
          style={{ marginTop: '.5rem' }}
          className="date-picker"
          type="date"
          placeholder="Move date"
          name="movedate"
          value={movedate}
          onChange={onChange}
        />
        <textarea
          placeholder="Customer comments"
          name="contactcomments"
          value={contactcomments}
          onChange={onChange}
        />
        <div>
          <input
            type="submit"
            value={
              contactContext.current ? ' Update Contact' : ' Add New Contact'
            }
            className="btn btn-primary btn-block"
          />
        </div>
        {contactContext.current && (
          <div>
            <button className="bnt btn-light btn-block" onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default ContactForm;
