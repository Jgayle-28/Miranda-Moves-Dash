import React from "react";
import Delete from "@material-ui/icons/Delete";

const StorageListTable = ({ storageList, deleteItem }) => {
  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: "1rem" }}>
        <div className="dashboard-table-header-storage">
          <p className="header-item">Item Name</p>
          <p className="header-item">Item Qty</p>
          <p className="header-item">Item Rate</p>
          <p className="header-item">Days In Storage</p>
          <p className="header-item">Item Total</p>
          <p className="header-item">Action</p>
        </div>
        {/* Room Items */}
        {storageList &&
          storageList.map((item, i) => (
            <div key={i} className="dashboard-table-storage">
              <p className="table-item">{item.itemName}</p>
              <p className="table-item">{item.itemQty}</p>
              <p className="table-item">{item.itemRate}</p>
              <p className="table-item">{item.daysInStorage}</p>
              <p className="table-item">{item.itemAmt}</p>
              <p
                className="table-item"
                style={{ color: "red", cursor: "pointer" }}
              >
                <Delete onClick={() => deleteItem(item.itemName)} />
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default StorageListTable;
