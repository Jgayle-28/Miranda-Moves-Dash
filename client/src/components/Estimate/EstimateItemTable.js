import React, { useState } from 'react';
import Delete from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from '../components/CustomInput/CustomInput.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing(1)
  }
}));
const generateTotalWeight = items => {
  let totalWeight = 0;
  items.forEach(item => {
    // parseInt because item.calcWeight is passed in as string
    totalWeight = totalWeight + parseInt(item.calcWeight);
  });
  return totalWeight;
};
const generateTotalVolume = items => {
  let totalVolume = 0;
  items.forEach(item => {
    // parseInt because item.calcVolume is passed in as string
    totalVolume = totalVolume + parseInt(item.calcVolume);
  });
  return totalVolume;
};
const generateTotalItems = items => {
  let totalItems = 0;
  items.forEach(item => {
    // parseInt because item.calcVolume is passed in as string
    totalItems = totalItems + parseInt(item.itemAmt);
  });
  return totalItems;
};
const onDeleteClick = e => {
  console.log('on delete click e:', e);
  this.props.deleteItem(e);
};

const EstimateItemTable = ({ roomName, items, deleteItem, updateItem }) => {
  const [itemAmtUpdate, setItemAmtUpdate] = useState(null);
  // console.log('items in data table', items);
  const classes = useStyles();

  const onChange = (e, roomName, itemName) => {
    setItemAmtUpdate(e.target.value);
    // console.log('updated amount', itemAmtUpdate);
    updateItem(roomName, itemName, e.target.value);
  };

  return (
    <>
      {/* Total Chips */}
      <div className={classes.root}>
        <Chip
          size="large"
          avatar={<Avatar>LBS</Avatar>}
          label={`Total Weight: ${generateTotalWeight(items)}`}
          clickable
          className={classes.chip}
          color="primary"
        />
        <Chip
          size="large"
          avatar={<Avatar>CFT</Avatar>}
          label={`Total Volume: ${generateTotalVolume(items)}`}
          clickable
          className={classes.chip}
          color="primary"
        />
        <Chip
          size="large"
          avatar={<Avatar>TIC</Avatar>}
          label={`Total Item Count: ${generateTotalItems(items)}`}
          clickable
          className={classes.chip}
          color="primary"
        />
      </div>
      {/* Header */}
      <div class="dashboard-table-header">
        <p className="header-item">Item Description</p>
        <p className="header-item">Qty</p>
        <p className="header-item">Volume(CFT)</p>
        <p className="header-item">Weight(LBS)</p>
        <p className="header-item">Calculated Volume(CFT)</p>
        <p className="header-item">Calculated Weight(LBS)</p>
        <p className="header-item">Action</p>
      </div>
      {/* Room Items */}
      {items &&
        items.map((item, i) => (
          <div key={i} class="dashboard-table">
            <p className="table-item">{item.name}</p>
            <p className="table-item">
              <CustomInput
                style={{ margin: 0, padding: 0 }}
                navy
                id="item_amt"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: e => onChange(e, roomName, item.name),
                  type: 'text',
                  name: 'itemAmt',
                  value: itemAmtUpdate === null ? item.itemAmt : itemAmtUpdate
                }}
              />
            </p>
            {/* <p className="table-item">{item.itemAmt}</p> */}
            <p className="table-item">{item.volume}</p>
            <p className="table-item">{item.weight}</p>
            <p className="table-item">{item.calcVolume}</p>
            <p className="table-item">{item.calcWeight}</p>
            <p
              className="table-item"
              style={{ color: 'red', cursor: 'pointer' }}
            >
              <Delete onClick={() => deleteItem(roomName, item.name)} />
            </p>
          </div>
        ))}
    </>
  );
};

export default EstimateItemTable;
