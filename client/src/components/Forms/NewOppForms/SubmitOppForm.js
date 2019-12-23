import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../../context/contact/ContactContext";
import AuthContext from "../../../context/auth/AuthContext";
import Button from "../../components/CustomButtons/Button.jsx";

const SubmitForm = props => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { toggleModal } = authContext;

  useEffect(() => {
    if (contactContext.current !== null) {
      setContact(contactContext.current);
      console.log(ContactContext.current);
    } else {
      setContact({
        opportunity_type: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        phone_type: "",
        phone_ext: "",
        refered_by: "",
        move_date: "",
        move_time: "",
        contact_comments: "",
        estimate_time: "",
        estimate_date: "",
        target_movedate: "",
        pu_address: "",
        address2: "",
        do_address: "",
        do_address2: "",
        items: [],
        alt_phone: "",
        payment_type: "",
        bill_to: ""
      });
    }
  }, [contactContext, contactContext.current]);
  const [contact, setContact] = useState({
    opportunity_type: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    phone_type: "",
    phone_ext: "",
    refered_by: "",
    move_date: "",
    move_time: "",
    contact_comments: "",
    estimate_time: "",
    estimate_date: "",
    target_movedate: "",
    pu_address: "",
    address2: "",
    do_address: "",
    do_address2: "",
    items: [],
    alt_phone: "",
    payment_type: "",
    bill_to: ""
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

    if (contactContext.current === null) {
      const contact = {
        opportunity_type: opportunity_details.opportunity_type,
        first_name: opportunity_details.first_name,
        last_name: opportunity_details.last_name,
        email: opportunity_details.email,
        phone: opportunity_details.phone,
        phone_type: opportunity_details.phone_type,
        alt_phone: opportunity_details.alt_phone,
        refered_by: opportunity_details.refered_by,
        move_date: move_details.move_date,
        move_time: move_details.move_time,
        contact_comments: move_details.contact_comments,
        pu_address: move_details.pu_address,
        address2: move_details.address2,
        do_address: move_details.do_address,
        do_address2: move_details.do_address2,
        payment_type: move_details.payment_type,
        bill_to: move_details.bill_to,
        estimate_time: estimate_details.estimate_time,
        estimate_date: estimate_details.estimate_date,
        items: estimate_details.items
      };

      contactContext.addContact(contact);
      toggleModal(false);
      // console.log(contact);
    } else {
      const contact = {
        _id: opportunity_details._id,
        opportunity_type: opportunity_details.opportunity_type,
        first_name: opportunity_details.first_name,
        last_name: opportunity_details.last_name,
        email: opportunity_details.email,
        phone: opportunity_details.phone,
        phone_type: opportunity_details.phone_type,
        alt_phone: opportunity_details.alt_phone,
        refered_by: opportunity_details.refered_by,
        move_date: move_details.move_date,
        move_time: move_details.move_time,
        contact_comments: move_details.contact_comments,
        pu_address: move_details.pu_address,
        address2: move_details.address2,
        do_address: move_details.do_address,
        do_address2: move_details.do_address2,
        payment_type: move_details.payment_type,
        bill_to: move_details.bill_to,
        estimate_time: estimate_details.estimate_time,
        estimate_date: estimate_details.estimate_date,
        items: estimate_details.items
      };
      console.log(" update contact:", contact);
      contactContext.updateContact(contact);
      contactContext.clearCurrent();
      toggleModal(false);
    }
  };
  // console.log('update info', props.allStates);
  return (
    <>
      <Button color="navy" onClick={onSubmit}>
        {contactContext.current ? "Update Opportunity" : "Add New Opportunity"}
      </Button>
    </>
  );
};
SubmitForm.propTypes = {
  allStates: PropTypes.object.isRequired
};
export default SubmitForm;
