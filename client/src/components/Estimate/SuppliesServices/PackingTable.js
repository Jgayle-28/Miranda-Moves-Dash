import React from "react";
import Delete from "@material-ui/icons/Delete";

const PackingListTable = ({ packingList, deleteItem }) => {
  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: "1rem" }}>
        <div className="dashboard-table-header-packing">
          <p className="header-item">Packing Item</p>
          <p className="header-item">Item Qty</p>
          <p className="header-item">Item Rate</p>
          <p className="header-item">Item Total</p>
          <p className="header-item">Action</p>
        </div>
        {/* Room Items */}
        {packingList &&
          packingList.map((item, i) => (
            <div key={i} className="dashboard-table-packing">
              <p className="table-item">{item.packingItem}</p>
              <p className="table-item">{item.packingItemQty}</p>
              <p className="table-item">{item.packingItemRate}</p>
              <p className="table-item">{item.packingItemAmt}</p>
              <p
                className="table-item"
                style={{ color: "red", cursor: "pointer" }}
              >
                <Delete onClick={() => deleteItem(item.packingItem)} />
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default PackingListTable;
