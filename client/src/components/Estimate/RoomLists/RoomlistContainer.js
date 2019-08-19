import React, { Component } from 'react';

class RoomlistContainer extends Component {
  // addItem = e => {
  //   console.log(e);
  //   // console.log(e.currentTarget);
  //   // console.log(e.target);
  //   console.log(e.target.getAttribute('data-volume'));
  //   console.log(e.target.getAttribute('data-weight'));
  //   console.log(e.target.getAttribute('data-name'));
  // };

  // TODO create function for onCLick that creates object to pass in to this.props.addItem
  onItemClick = e => {
    let room = this.props.room;
    let volume = e.target.getAttribute('data-volume');
    let weight = e.target.getAttribute('data-weight');
    let name = e.target.getAttribute('data-name');
    let itemAmt = 1;
    let itemObj = {
      roomName: room,
      item: {
        name,
        itemAmt,
        volume,
        weight
      }
    };
    // passed in from maing inventory component
    this.props.addItem(itemObj);
  };
  render() {
    return (
      <>
        <ul>
          <li
            data-volume="30"
            data-weight="300"
            data-name="Amoire"
            onClick={e => this.onItemClick(e)}
          >
            Armoire
          </li>
          <li
            data-volume="15"
            data-weight="105"
            data-name="Air Conditioner"
            onClick={e => this.onItemClick(e)}
          >
            Air Conditioner
          </li>
          <li
            data-volume="60"
            data-weight="70"
            data-name="Arcade Game"
            onClick={e => this.onItemClick(e)}
          >
            Arcade Game
          </li>
        </ul>
      </>
    );
  }
}
export default RoomlistContainer;
