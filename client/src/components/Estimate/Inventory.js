import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Snackbars from "../components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import Button from "../components/CustomButtons/Button.jsx";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Fab from "@material-ui/core/Fab";
// Created Components
import EstimateHeader from "./EstimateHeader";
import EstimateNavPills from "../components/NavPills/EstimateNavPills.jsx";
import DisplayEstimateTotals from "./DisplayEstimateTotals.js";
import EstimateRoomlist from "./RoomLists/RoomlistContainer";
import ContactContext from "../../context/contact/ContactContext";
// Room Items
import { familyRoom } from "./RoomLists/Items/FamilyRoom";
import { livingRoom } from "./RoomLists/Items/livingRoom";
import { diningRoom } from "./RoomLists/Items/diningRoom";
import { kitchen } from "./RoomLists/Items/kitchen";
import { masterBed } from "./RoomLists/Items/masterBed";
import { office } from "./RoomLists/Items/office";

class Estimate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      alert: false,
      deleteAlert: false,
      itemAdded: "",
      itemDeleted: "",
      deleteRefresh: false,
      itemUpdate: false,
      inventoryAlert: false
    };
  }
  static propTypes = {
    prop: PropTypes
  };
  static contextType = ContactContext;

  componentDidMount() {
    const { user } = this.props;
    console.log("contacts inventory in inventory:", user);
    // if (typeof contacts.inventory !== 'undefined') {
    if (user.inventory.length !== 0) {
      this.setState({
        inventory: user.inventory
      });
    }
  }
  // }
  //TODO Create sendState() function in estimate nave pills to send allStates data between all  rooms
  // TODO passin room name as a props to the component that matches the state in parent(this component)
  // TODO when the room is updated call function that adds it to the sate of this component

  // TODO make itemAdded an array and them map through each item and display notification
  showNotification = () => {
    if (!this.alert) {
      this.setState({ alert: !this.state.alert });
      // use this to make the notification autoclose
      setTimeout(() => this.setState({ alert: !this.state.alert }), 1000);
    }
  };
  showDeleteNotification = () => {
    if (!this.deleteAlert) {
      this.setState({ deleteAlert: !this.state.deleteAlert });
      // use this to make the notification autoclose
      setTimeout(
        () => this.setState({ deleteAlert: !this.state.deleteAlert }),
        1000
      );
    }
  };
  showInventoryNotification = () => {
    if (!this.inventoryAlert) {
      this.setState({ inventoryAlert: !this.state.deleteAlert });
      // use this to make the notification autoclose
      setTimeout(
        () => this.setState({ inventoryAlert: !this.state.inventoryAlert }),
        1000
      );
    }
  };

  updateItem = (roomName, itemName, amount) => {
    console.log("amount:", amount);
    console.log("itemName:", itemName);
    console.log("roomname:", roomName);
    let inventory = [...this.state.inventory];
    // find current index room of passed in item then find the element
    var roomToUpdate = inventory.filter(function(element) {
      return element.roomName === roomName;
    });
    console.log("roomToUpdate updateItem:", roomToUpdate);
    // Get the room items
    let roomItems = roomToUpdate[0].items;
    console.log("roomItems:", roomItems);
    // checks to see if item is in room items
    let itemInRoom = roomItems.find(elem => elem.name === itemName);
    console.log("itemInRoom: ", itemInRoom);
    // Update  amount , calculated volume, calculated weight
    itemInRoom.itemAmt = amount;
    itemInRoom.calcVolume = itemInRoom.volume * amount;
    itemInRoom.calcWeight = itemInRoom.weight * amount;
    this.setState({ itemUpdate: !this.state.itemUpdate });
  };

  deleteItem = (roomName, itemName) => {
    let inventory = [...this.state.inventory];
    // find current index room of passed in item then find the element
    var roomToUpdate = inventory.filter(function(element) {
      return element.roomName === roomName;
    });
    console.log("roomToUpdate deleteItem:", roomToUpdate);
    // Get the room items
    let roomItems = roomToUpdate[0].items;
    console.log("roomItems:", roomItems);
    // get the index of item in the room items array
    var removeIndex = roomItems.map(item => item.name).indexOf(itemName);
    // Remove the item from room items array
    ~removeIndex && roomItems.splice(removeIndex, 1);
    // Used only to update state and refresh
    this.setState({
      itemDeleted: itemName,
      deleteRefresh: !this.state.deleteRefresh
    });
    this.showDeleteNotification();
  };

  addItem = item => {
    let newInventory = [...this.state.inventory];
    // check if room exists in inventory
    let roomInInventory = newInventory.some(
      elem => elem.roomName === item.roomName
    );
    console.log("roomInInventory:", roomInInventory);
    // if room is in inventory update room items
    if (roomInInventory) {
      // find current index room of passed in item then find the element
      var roomToUpdate = newInventory.filter(function(element) {
        return element.roomName === item.roomName;
      });
      console.log("roomToUpdate:", roomToUpdate);
      // Gets room items from current room
      let roomItems = roomToUpdate[0].items;
      console.log("roomItems:", roomItems);
      // checks to see if item is in room items
      let itemInRoom = roomItems.find(elem => elem.name === item.item.name);
      console.log("itemInRoom: ", itemInRoom);
      // If item in room items
      if (itemInRoom) {
        // add 1 to amount
        itemInRoom.itemAmt += 1;
        // update calculated volume
        itemInRoom.calcVolume =
          parseInt(itemInRoom.calcVolume) + parseInt(item.item.calcVolume);
        // update calculated weight
        itemInRoom.calcWeight =
          parseInt(itemInRoom.calcWeight) + parseInt(item.item.calcWeight);
        console.log("updated room items: ", newInventory);
      } else {
        // If item is not in room items then add item to room
        roomToUpdate[0].items.push(item.item);
        // this.setState({ inventory: roomToUpdate });
        console.log("Added item to room: ", roomToUpdate);
      }
    } else {
      // If room is not in inventory then add item to inventory
      let newItem = {
        roomName: item.roomName,
        items: [item.item]
      };
      newInventory.push(newItem);
      this.setState({
        inventory: newInventory
      });
      console.log("added new room to inventory: ", newInventory);
    }
    // Set Alert for added item
    this.setState({
      itemAdded: item.item.name
    });
    this.showNotification();
  };

  addInventory = () => {
    const { user } = this.props;
    const contacts = this.context;
    console.log("contacts:", contacts);
    const contact = {
      _id: user._id,
      inventory: this.state.inventory
    };
    contacts.updateContact(contact);
    this.showInventoryNotification();
  };

  render() {
    console.log("Esitmate props", this.props.user);
    const { user } = this.props;
    return (
      <>
        <Snackbars
          place="tr"
          color="info"
          icon={AddAlert}
          message={
            user.inventory.length === 0
              ? "Submission Succsessful"
              : "Update Successful"
          }
          open={this.state.inventoryAlert}
          closeNotification={() => this.setState({ inventoryAlert: false })}
          close
        />
        <Snackbars
          place="tr"
          color="success"
          icon={AddAlert}
          message={`${this.state.itemAdded} Added To Inventory`}
          open={this.state.alert}
          closeNotification={() => this.setState({ alert: false })}
          close
        />
        <Snackbars
          place="tr"
          color="danger"
          icon={AddAlert}
          message={`${this.state.itemDeleted} Deleted From Inventory`}
          open={this.state.deleteAlert}
          closeNotification={() => this.setState({ deleteAlert: false })}
          close
        />
        {/* <GridContainer justify="center">
          <EstimateHeader user={user} />
        </GridContainer> */}
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <EstimateNavPills
                color="grey"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 12, md: 4 },
                  contentGrid: { xs: 12, sm: 12, md: 8 }
                }}
                tabs={[
                  {
                    tabButton: "Family Room",
                    tabContent: (
                      <EstimateRoomlist
                        room="Family Room"
                        addItem={this.addItem}
                        items={familyRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Living Room",
                    tabContent: (
                      <EstimateRoomlist
                        room="Living Room"
                        addItem={this.addItem}
                        items={livingRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Dining Room",
                    tabContent: (
                      <EstimateRoomlist
                        room="Dining Room"
                        addItem={this.addItem}
                        items={diningRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Kitchen",
                    tabContent: (
                      <EstimateRoomlist
                        room="Dining Room"
                        addItem={this.addItem}
                        items={kitchen}
                      />
                    )
                  },
                  {
                    tabButton: "Master Bedroom",
                    tabContent: (
                      <EstimateRoomlist
                        room="Master Bedroom"
                        addItem={this.addItem}
                        items={masterBed}
                      />
                    )
                  },
                  {
                    tabButton: "Office Room",
                    tabContent: (
                      <EstimateRoomlist
                        room="Office Room"
                        addItem={this.addItem}
                        items={office}
                      />
                    )
                  },
                  {
                    tabButton: "Bedroom 2",
                    tabContent: (
                      <EstimateRoomlist
                        room="Bedroom 2"
                        addItem={this.addItem}
                        items={livingRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Bedroom 3",
                    tabContent: (
                      <EstimateRoomlist
                        room="Bedroom 3"
                        addItem={this.addItem}
                        items={livingRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Bedroom 4",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Bedroom 4"
                        addItem={this.addItem}
                        items={livingRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Bedroom 5",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Bedroom 5"
                        addItem={this.addItem}
                        items={livingRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Garage",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Garage"
                        addItem={this.addItem}
                        items={livingRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Yard / Patio",
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
                    tabButton: "Laundry Room",
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
                    tabButton: "Basement",
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
                    tabButton: "Bathroom",
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
                    tabButton: "Reception",
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
                    tabButton: "Conference Room",
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
                    tabButton: "Waiting Room",
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
                    tabButton: "Break Room",
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
          <GridItem xs={12} sm={12} md={12}>
            <Card style={{ marginTop: 0 }}>
              <DisplayEstimateTotals
                updateItem={this.updateItem}
                deleteItem={this.deleteItem}
                inventory={this.state.inventory}
              />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="success"
                size="sm"
                onClick={this.addInventory}
                disabled={this.state.inventory.length === 0}
              >
                <CloudUpload />
                {user.inventory.length === 0
                  ? "Save Estimate Inventory"
                  : "Update Inventory"}
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}
export default Estimate;
