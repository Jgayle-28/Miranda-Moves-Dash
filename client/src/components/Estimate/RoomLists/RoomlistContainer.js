import React, { Component } from 'react';
import '../../../assets/jss/estimate.css';

// TODO create variables for each room type

class RoomlistContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
    // from inventory component to add item to inventory component state
    this.props.addItem(itemObj);
  };
  render() {
    return (
      <>
        <ul>
          <li
            className="estimate__item"
            data-weight="300"
            data-volume="30"
            data-name="Amoire"
            onClick={e => this.onItemClick(e)}
          >
            <span>Armoire</span>
            <span style={{ color: '#0d47a1' }}>300 / 30</span>
          </li>
          <li
            className="estimate__item"
            data-volume="15"
            data-weight="105"
            data-name="Air Conditioner"
            onClick={e => this.onItemClick(e)}
          >
            <span>Air Conditioner</span>
            <span style={{ color: '#0d47a1' }}>300 / 30</span>
          </li>
          <li
            className="estimate__item"
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
