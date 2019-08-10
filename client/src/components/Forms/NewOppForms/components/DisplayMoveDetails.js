import React from 'react';

const DisplayMoveDetail = ({ move_details }) => {
  return (
    <>
      <h3
        style={{
          margin: '1rem 0',
          color: '#37474F',
          borderBottom: '1px solid #37474F'
        }}
      >
        Move Details
      </h3>

      {move_details.pu_address && (
        <p>
          <b>Pickup Address: </b> <small> {move_details.pu_address}</small>
        </p>
      )}
      <br />

      {move_details.do_address && (
        <p>
          <b>Dropoff Address: </b> <small> {move_details.pu_address}</small>
        </p>
      )}
      <br />

      {move_details.move_date && (
        <p>
          <b>Move Date: </b> <small> {move_details.move_date}</small>
        </p>
      )}
      <br />
      {move_details.move_time && (
        <p>
          <b>Move Time: </b> <small> {move_details.move_time}</small>
        </p>
      )}
      <br />

      {move_details.contact_comments && (
        <p>
          <b>Comments: </b> <small> {move_details.contact_comments}</small>
        </p>
      )}
      <br />
    </>
  );
};

export default DisplayMoveDetail;
