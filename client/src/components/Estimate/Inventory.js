import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridContainer from '../components/Grid/GridContainer.jsx';
import GridItem from '../components/Grid/GridItem.jsx';
// import Accordion from '../components/Accordion/Accordion.jsx';
import Card from '../components/Card/Card.jsx';
import CardHeader from '../components/Card/CardHeader.jsx';
import CardBody from '../components/Card/CardBody.jsx';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Fab from '@material-ui/core/Fab';
// Created Components
import EstimateHeader from './EstimateHeader';
import EstimateNavPills from '../components/NavPills/EstimateNavPills.jsx';
import DisplayEstimateTotals from './DisplayEstimateTotals.js';
import EstimateRoomlist from './RoomLists/RoomlistContainer';

class Estimate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [
        // {
        //   roomName: 'Family Room',
        //   items: [
        //     { name: 'chair', itemAmt: 4, volume: 30, weight: 50 },
        //     { name: 'table', itemAmt: 1, volume: 30, weight: 50 },
        //     { name: 'buffet', itemAmt: 1, volume: 30, weight: 50 }
        //   ]
        // },
        // {
        //   roomName: 'Dining Room',
        //   items: [
        //     { name: 'Couch', itemAmt: 4, volume: 30, weight: 50 },
        //     { name: 'Love seat', itemAmt: 1, volume: 30, weight: 50 },
        //     { name: 'Coffee table', itemAmt: 1, volume: 30, weight: 50 }
        //   ]
        // }
      ]
    };
  }
  static propTypes = {
    prop: PropTypes
  };
  //TODO Create sendState() function in estimate nave pills to send allStates data between all  rooms
  // TODO passin room name as a props to the component that matches the state in parent(this component)
  // TODO when the room is updated call function that adds it to the sate of this component

  // checks to see if item is in list
  // checkItem = (obj, list) => {
  //   return list.some(elem => elem.name === obj.name);
  // };

  addItem = item => {
    let newInventory = [...this.state.inventory];
    // check if room exists in inventory
    let roomInInventory = newInventory.some(
      elem => elem.roomName === item.roomName
    );
    console.log('roomInInventory:', roomInInventory);
    // if room is in inventory update room items
    if (roomInInventory) {
      // find current index room of passed in item then find the element
      var roomToUpdate = newInventory.filter(function(element) {
        return element.roomName === item.roomName;
      });
      console.log('roomToUpdate:', roomToUpdate);
      // Gets room items from current room
      let roomItems = roomToUpdate[0].items;
      console.log('roomItems:', roomItems);
      // checks to see if item is in room items
      let itemInRoom = roomItems.find(elem => elem.name === item.item.name);
      console.log('itemInRoom: ', itemInRoom);
      // If item in room items add 1 to item amount then add to inventory
      if (itemInRoom) {
        itemInRoom.itemAmt += 1;
        console.log('updated room items: ', newInventory);
      } else {
        // If item is not in room items then add item to room
        roomToUpdate[0].items.push(item.item);
        // this.setState({ inventory: roomToUpdate });
        console.log('Added item to room: ', roomToUpdate);
      }
    } else {
      // If room is not in inventory then add item to inventory
      let newItem = {
        roomName: item.roomName,
        items: [item.item]
      };
      newInventory.push(newItem);
      this.setState({ inventory: newInventory });
      console.log('added new room to inventory: ', newInventory);
    }

    // console.log(itemInRoom);
    // // If item in inventory list add 1 to item amount then add to inventory
    // if (itemInRoom) {
    //   itemInRoom.itemAmt += 1;
    //   console.log('updated inventory: ', newInventory);
    // } else {
    //   // If item is not in inventory then add item to inventory
    //   newInventory.push(item);
    //   this.setState({ inventory: newInventory });
    //   console.log('updated inventory: ', newInventory);
    // }
  };

  render() {
    console.log('Esitmate props', this.props.user);
    const { user } = this.props;
    return (
      <>
        {/* <Fab
          color="primary"
          aria-label="Add"
          // className={classes.fab}
          style={{
            backgroundColor: '#90A4AE',
            color: 'white',
            margin: '1rem',
            zIndex: 9,
            position: 'fixed',
            top: '6rem',
            left: '1.2rem'
          }}
          onClick={() => this.props.history.goBack()}
        >
          <KeyboardBackspace />
        </Fab> */}
        {/* <GridContainer justify="center">
          <EstimateHeader user={user} />
        </GridContainer> */}
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <EstimateNavPills
                color="grey"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 12, md: 4 },
                  contentGrid: { xs: 12, sm: 12, md: 8 }
                }}
                tabs={[
                  {
                    tabButton: 'Family Room',
                    tabContent: (
                      <EstimateRoomlist
                        room="Family Room"
                        addItem={this.addItem}
                      />
                    )
                  },
                  {
                    tabButton: 'Living Room',
                    tabContent: (
                      <EstimateRoomlist
                        room="Living Room"
                        addItem={this.addItem}
                      />
                    )
                  },
                  {
                    tabButton: 'Dining Room',
                    tabContent: (
                      <EstimateRoomlist
                        room="Dining Room"
                        addItem={this.addItem}
                      />
                    )
                  },
                  {
                    tabButton: 'Master Bedroom',
                    tabContent: (
                      <EstimateRoomlist
                        room="Master Bedroom"
                        addItem={this.addItem}
                      />
                    )
                  },
                  {
                    tabButton: 'Office Room',
                    tabContent: (
                      <EstimateRoomlist
                        room="Office Room"
                        addItem={this.addItem}
                      />
                    )
                  },
                  {
                    tabButton: 'Bedroom 2',
                    tabContent: (
                      <EstimateRoomlist
                        room="Bedroom 2"
                        addItem={this.addItem}
                      />
                    )
                  },
                  {
                    tabButton: 'Bedroom 3',
                    tabContent: (
                      <EstimateRoomlist
                        room="Bedroom 3"
                        addItem={this.addItem}
                      />
                    )
                  },
                  {
                    tabButton: 'Bedroom 4',
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Bedroom 4"
                        addItem={this.addItem}
                      />
                    )
                  },
                  {
                    tabButton: 'Bedroom 5',
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Bedroom 5"
                        addItem={this.addItem}
                      />
                    )
                  },
                  {
                    tabButton: 'Garage',
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist room="Garage" addItem={this.addItem} />
                    )
                  },
                  {
                    tabButton: 'Yard / Patio',
                    // tabIcon: Home,
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br />
                        <p>This is very nice.</p>
                      </span>
                    )
                  },
                  {
                    tabButton: 'Laundry Room',
                    // tabIcon: Home,
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br />
                        <p>This is very nice.</p>
                      </span>
                    )
                  },
                  {
                    tabButton: 'Basement',
                    // tabIcon: Home,
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br />
                        <p>This is very nice.</p>
                      </span>
                    )
                  },
                  {
                    tabButton: 'Bathroom',
                    // tabIcon: Home,
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br />
                        <p>This is very nice.</p>
                      </span>
                    )
                  },
                  {
                    tabButton: 'Reception',
                    // tabIcon: Home,
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br />
                        <p>This is very nice.</p>
                      </span>
                    )
                  },
                  {
                    tabButton: 'Conference Room',
                    // tabIcon: Home,
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br />
                        <p>This is very nice.</p>
                      </span>
                    )
                  },
                  {
                    tabButton: 'Waiting Room',
                    // tabIcon: Home,
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br />
                        <p>This is very nice.</p>
                      </span>
                    )
                  },
                  {
                    tabButton: 'Break Room',
                    // tabIcon: Home,
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br />
                        <p>This is very nice.</p>
                      </span>
                    )
                  }
                ]}
              />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <Card style={{ marginTop: 0 }}>
              <DisplayEstimateTotals inventory={this.state.inventory} />
            </Card>
          </GridItem>
        </GridContainer>
        {/* <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card plain>
              <DisplayEstimateTotals />
            </Card>
          </GridItem>
        </GridContainer> */}
      </>
    );
  }
}
export default Estimate;