import React from 'react';

const DisplayEstimateDetail = ({ estimate_details }) => {
  return (
    <>
      <h3
        style={{
          margin: '1rem 0',
          color: '#37474F',
          borderBottom: '1px solid #37474F'
        }}
      >
        Estimate Details
      </h3>

      {estimate_details.estimate_date && (
        <p>
          <b>Estimate Date: </b>{' '}
          <small> {estimate_details.estimate_date}</small>
        </p>
      )}
      <br />

      {estimate_details.estimate_time && (
        <p>
          <b>Estimate Time: </b>{' '}
          <small> {estimate_details.estimate_time}</small>
        </p>
      )}
      <br />
    </>
  );
};
export default DisplayEstimateDetail;
