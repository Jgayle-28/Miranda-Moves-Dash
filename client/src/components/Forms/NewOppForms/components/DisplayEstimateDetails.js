import React from 'react';

const DisplayEstimateDetail = ({ type, estimate_details }) => {
  if (type === 'Residential Move') {
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
  } else {
    return (
      <>
        <h3
          style={{
            margin: '1rem 0',
            color: '#37474F',
            borderBottom: '1px solid #37474F'
          }}
        >
          Item(s) Detail
        </h3>

        {estimate_details.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </>
    );
  }
};
export default DisplayEstimateDetail;
