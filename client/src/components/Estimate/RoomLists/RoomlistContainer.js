import React, { Component } from "react";
import "../../../assets/jss/estimate.css";

// TODO create room Item for each room type

class RoomlistContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // TODO create function for onCLick that creates object to pass in to this.props.addItem
  onItemClick = e => {
    let room = this.props.room;
    let volume = e.target.getAttribute("data-volume");
    let weight = e.target.getAttribute("data-weight");
    let name = e.target.getAttribute("data-name");
    let itemAmt = 1;
    let itemObj = {
      roomName: room,
      item: {
        name,
        itemAmt,
        volume,
        weight,
        calcVolume: volume,
        calcWeight: weight
      }
    };
    // from inventory component to add item to inventory component state
    this.props.addItem(itemObj);
  };
  render() {
    console.log("Items", this.props.items);
    return (
      <>
        <ul>
          {this.props.items.map((item, i) => (
            <li
              className="estimate__item"
              data-weight={item.itemWeight}
              data-volume={item.itemVolume}
              data-name={item.itemName}
              onClick={e => this.onItemClick(e)}
            >
              <span
                data-weight={item.itemWeight}
                data-volume={item.itemVolume}
                data-name={item.itemName}
              >
                {item.itemName}
              </span>
              <span style={{ color: "#0d47a1" }}>
                {item.itemWeight} / {item.itemVolume}
              </span>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
export default RoomlistContainer;
