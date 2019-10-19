import React from "react";
import Delete from "@material-ui/icons/Delete";

const AdditionalServiceTable = ({ serviceList, deleteItem }) => {
  console.log("serviceList:", serviceList);
  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: "1rem" }}>
        <div className="dashboard-table-header-additional">
          <p className="header-item">Service Name</p>
          <p className="header-item">Service Amount</p>
          <p className="header-item">Action</p>
        </div>
        {/* Room Items */}
        {serviceList &&
          serviceList.map((item, i) => (
            <div key={i} className="dashboard-table-additional">
              <p className="table-item">{item.serviceName}</p>
              <p className="table-item">{item.serviceAmt}</p>
              <p
                className="table-item"
                style={{ color: "red", cursor: "pointer" }}
              >
                <Delete onClick={() => deleteItem(item.serviceName)} />
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdditionalServiceTable;
