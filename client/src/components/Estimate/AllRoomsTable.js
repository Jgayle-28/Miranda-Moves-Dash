import React, { useState, useEffect } from "react";
import Delete from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from "../components/CustomInput/CustomInput.jsx";

const useStyles = {
  root: {
    display: "flex",
    // justifyContent: 'center',
    flexWrap: "wrap"
  },
  chip: {
    margin: "1rem"
  }
};

const generateTotalWeight = inventory => {
  let totalWeight = 0;
  inventory.forEach((room, i) =>
    room.items.forEach(item => {
      // parseInt because item.calcWeight is passed in as string
      totalWeight = totalWeight + parseInt(item.calcWeight);
    })
  );
  return totalWeight;
};

const generateTotalVolume = inventory => {
  let totalVolume = 0;
  inventory.forEach((room, i) =>
    room.items.forEach(item => {
      // parseInt because item.calcVolume is passed in as string
      totalVolume = totalVolume + parseInt(item.calcVolume);
    })
  );
  return totalVolume;
};

const generateTotalItems = inventory => {
  let totalItems = 0;
  inventory.forEach((room, i) =>
    room.items.forEach(item => {
      // parseInt because item.itemAmt is passed in as string
      totalItems = totalItems + parseInt(item.itemAmt);
    })
  );
  return totalItems;
};

const onDeleteClick = e => {
  console.log("on delete click e:", e);
  this.props.deleteItem(e);
};

let initialState = {};
// helper function to generate dynamic state
const getInitialState = inventory => {
  inventory.map(room => {
    room.items.map((item, i) => {
      let name = `${item.name}${i}`;
      initialState[name] = item.itemAmt;
    });
  });
  // console.log("initialState:", initialState);
  return initialState;
};
class AllRoomsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    // Generates dynamic state
    if (this.props.inventory) {
      getInitialState(this.props.inventory);
    }
  }
  componentDidUpdate(prevProps) {
    // Generates dynamic state
    // console.log("inventory changed");
    getInitialState(this.props.inventory);
  }
  // getInitialState = () => {
  //   const { inventory } = this.props;
  //   const initialState = {};

  //   inventory.map(room => {
  //     room.items.map((item, i) => {
  //       let name = `${item.name}${i}`;
  //       initialState[name] = null;
  //     });
  //   });
  //   console.log("initialState:", initialState);
  //   return initialState;
  // };

  onChange = (e, roomName, itemName) => {
    // console.log("e.target.name:", [e.target.name], e.target.value);
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });

    // setItemAmtUpdate(e.target.value);
    // console.log('updated amount', itemAmtUpdate);
    this.props.updateItem(roomName, itemName, e.currentTarget.value);
  };
  render() {
    const { inventory, deleteItem, updateItem, classes } = this.props;
    // console.log("STATE", this.state);
    return (
      <>
        {/* Total Chips */}
        <div className={classes.root}>
          {/* {this.getInitialState()} */}
          <Chip
            size="large"
            label={`Total Weight (lbs): ${generateTotalWeight(inventory)}`}
            clickable
            className={classes.chip}
            color="primary"
          />
          <Chip
            size="large"
            label={`Total Volume (cft): ${generateTotalVolume(inventory)}`}
            clickable
            className={classes.chip}
            color="primary"
          />
          <Chip
            size="large"
            label={`Total Item Count: ${generateTotalItems(inventory)}`}
            clickable
            className={classes.chip}
            color="primary"
          />
        </div>
        {/* Header */}
        <div className="dashboard-table-header">
          <p className="header-item">Item Description</p>
          <p className="header-item">Qty</p>
          <p className="header-item">Volume(CFT)</p>
          <p className="header-item">Weight(LBS)</p>
          <p className="header-item">Calculated Volume(CFT)</p>
          <p className="header-item">Calculated Weight(LBS)</p>
          <p className="header-item">Action</p>
        </div>
        {/* Room Items */}
        {inventory &&
          inventory.map((room, i) => (
            <>
              {room.items.map((item, i) => (
                <div key={i} className="dashboard-table">
                  <p className="table-item">
                    {item.name}
                    <small style={{ color: "#0d47a1", fontSize: "11px" }}>
                      {" "}
                      ({room.roomName})
                    </small>
                  </p>
                  <p className="table-item">
                    <CustomInput
                      // name={`${item.name}${i}`}
                      navy
                      id="item_amt"
                      formControlProps={{
                        fullWidth: true,
                        style: {
                          padding: 0,
                          margin: 0
                        }
                      }}
                      //                 let name = `${item.name}${i}`;
                      // initialState[name] = item.itemAmt
                      inputProps={{
                        onChange: e =>
                          this.onChange(e, room.roomName, item.name),
                        type: "number",
                        name: [item.name + i],
                        value: this.state[item.name + i]
                        // value: `this.state.${item.name}${i}`

                        // value:
                        //   `this.state.${item.name}${i}` === null
                        //     ? item.itemAmt
                        //     : `this.state.${item.name}${i}`
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
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    <Delete
                      room={room.roomName}
                      onClick={() => deleteItem(room.roomName, item.name)}
                    />
                  </p>
                </div>
              ))}
              {/* </div> */}
            </>
          ))}
      </>
    );
  }
}

export default withStyles(useStyles)(AllRoomsTable);
