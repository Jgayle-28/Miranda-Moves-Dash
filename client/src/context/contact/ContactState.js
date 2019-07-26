import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initalState = {
    contacts: [
      {
        id: 1,
        firstname: 'Cisco',
        lastname: 'Miranda',
        email: 'cisco@mirandadeliver.com',
        phone: '331',
        phonetype: 'mobile',
        referedby: 'Julie',
        movedate: '2019 - 08 - 11T07: 00: 00.000 + 00: 00',
        contactcomments: 'this is a comment'
      },
      {
        id: 2,
        firstname: 'michell',
        lastname: 'giranda',
        email: 'sisco@mirandadeliver.com',
        phone: '331',
        phonetype: 'mobile',
        referedby: 'Julie',
        movedate: '2019 - 08 - 11T07: 00: 00.000 + 00: 00',
        contactcomments: 'this is a comment'
      },
      {
        id: 3,
        firstname: 'Sammy',
        lastname: 'piranda',
        email: 'lisco@mirandadeliver.com',
        phone: '331',
        phonetype: 'mobile',
        referedby: 'Julie',
        movedate: '2019 - 08 - 11T07: 00: 00.000 + 00: 00',
        contactcomments: 'this is a comment'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initalState);

  // Add Contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // filter contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
