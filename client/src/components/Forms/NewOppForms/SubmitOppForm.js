import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../../context/contact/ContactContext';
import AuthContext from '../../../context/auth/AuthContext';
import Button from '../../components/CustomButtons/Button.jsx';
import moment from 'moment';

const SubmitForm = props => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { toggleModal } = authContext;

  useEffect(() => {
    if (contactContext.current !== null) {
      setContact(contactContext.current);
    } else {
      setContact({
        opportunity_type: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        phone_type: '',
        phone_ext: '',
        refered_by: '',
        move_date: '',
        move_time: '',
        contact_comments: '',
        estimate_time: '',
        estimate_date: '',
        target_movedate: '',
        pu_address: '',
        do_address: ''
      });
    }
  }, [contactContext, contactContext.current]);
  const [contact, setContact] = useState({
    opportunity_type: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    phone_type: '',
    phone_ext: '',
    refered_by: '',
    move_date: '',
    move_time: '',
    contact_comments: '',
    estimate_time: '',
    estimate_date: '',
    target_movedate: '',
    pu_address: '',
    do_address: ''
  });

  // const onChange = e =>
  //   setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const {
      opportunity_details,
      move_details,
      estimate_details
    } = props.allStates;

    const contact = {
      opportunity_type: opportunity_details.opportunity_type,
      first_name: opportunity_details.first_name,
      last_name: opportunity_details.last_name,
      email: opportunity_details.email,
      phone: opportunity_details.phone,
      phone_type: opportunity_details.phone_type,
      phone_ext: opportunity_details.phone_ext,
      refered_by: opportunity_details.refered_by,
      move_date: move_details.move_date,
      move_time: move_details.move_time,
      contact_comments: move_details.contact_comments,
      pu_address: move_details.pu_address,
      do_address: move_details.do_address,
      estimate_time: estimate_details.estimate_time,
      estimate_date: estimate_details.estimate_date
    };

    if (contactContext.current === null) {
      contactContext.addContact(contact);
      toggleModal(false);
      console.log(contact);
    } else {
      contactContext.updateContact(contact);
      toggleModal(false);
    }
  };

  // const clearAll = () => {
  //   contactContext.clearCurrent();
  // };

  return (
    <>
      <Button color="navy" onClick={onSubmit}>
        Add New Contact
      </Button>
    </>
  );
};
SubmitForm.propTypes = {
  allStates: PropTypes.object.isRequired
};
export default SubmitForm;
