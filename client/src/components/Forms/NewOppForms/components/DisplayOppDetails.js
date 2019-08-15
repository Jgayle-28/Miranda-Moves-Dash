import React from 'react';

const DisplayOppDetail = ({ opportunity_details }) => {
  return (
    <>
      <h3
        style={{
          margin: '1rem 0',
          color: '#37474F',
          borderBottom: '1px solid #37474F'
        }}
      >
        Opportunity Details
      </h3>

      {opportunity_details.first_name && (
        <p>
          <b>First Name: </b> <small> {opportunity_details.first_name}</small>
        </p>
      )}
      <br />

      {opportunity_details.last_name && (
        <p>
          <b>Last Name: </b> <small> {opportunity_details.last_name}</small>
        </p>
      )}
      <br />

      {opportunity_details.email && (
        <p>
          <b>Email: </b> <small> {opportunity_details.email}</small>
        </p>
      )}
      <br />

      {opportunity_details.phone && (
        <p>
          <b>Phone Number: </b> <small> {opportunity_details.phone}</small>
        </p>
      )}
      <br />

      {opportunity_details.phone_type && (
        <p>
          <b>Phone Type: </b> <small> {opportunity_details.phone_type}</small>
        </p>
      )}
      <br />

      {opportunity_details.alt_phone && (
        <p>
          <b>Alternate Phone Number: </b>{' '}
          <small> {opportunity_details.alt_phone}</small>
        </p>
      )}
      <br />

      {opportunity_details.refered_by && (
        <p>
          <b>Refered By: </b> <small> {opportunity_details.refered_by}</small>
        </p>
      )}
    </>
  );
};

export default DisplayOppDetail;
