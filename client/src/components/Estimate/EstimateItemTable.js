import React from 'react';
import Delete from '@material-ui/icons/Delete';

const EstimateItemTable = ({ items }) => {
  console.log('items in data table', items);
  return (
    <>
      {/* Header */}
      <div class="dashboard-table-header">
        <p className="header-item">Item Description</p>
        <p className="header-item">Qty</p>
        <p className="header-item">Volume(CFT)</p>
        <p className="header-item">Weight(LBS)</p>
        <p className="header-item">Action</p>
      </div>
      {/* Room Items */}
      {items &&
        items.map((item, i) => (
          <div key={i} class="dashboard-table">
            <p className="table-item">{item.name}</p>
            <p className="table-item">{item.itemAmt}</p>
            <p className="table-item">{item.volume}</p>
            <p className="table-item">{item.weight}</p>
            <p className="table-item" style={{ color: 'red' }}>
              <Delete />
            </p>
          </div>
        ))}
    </>
  );
};

export default EstimateItemTable;
