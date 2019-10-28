import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Snackbars from "../components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import Popover from "@material-ui/core/Popover";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import CustomSelect from "../components/Selects/CustomSelect.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import CloudUpload from "@material-ui/icons/CloudUpload";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Fab from "@material-ui/core/Fab";
// Created Components
import EstimateHeader from "./EstimateHeader";
import InventoryNavPills from "../components/NavPills/InventoryNavPills.jsx";
import DisplayEstimateTotals from "./DisplayEstimateTotals.js";
import ContactContext from "../../context/contact/ContactContext";
// Container to display Room Items
import EstimateRoomlist from "./RoomLists/RoomlistContainer";
// Room Items
import { familyRoom } from "./RoomLists/Items/FamilyRoom";
import { livingRoom } from "./RoomLists/Items/livingRoom";
import { diningRoom } from "./RoomLists/Items/diningRoom";
import { kitchen } from "./RoomLists/Items/kitchen";
import { masterBed } from "./RoomLists/Items/masterBed";
import { office } from "./RoomLists/Items/office";
import { bedRoom2 } from "./RoomLists/Items/bedRoom2";
import { bedRoom3 } from "./RoomLists/Items/bedRoom3";
import { bedRoom4 } from "./RoomLists/Items/bedRoom4";
import { bedRoom5 } from "./RoomLists/Items/bedRoom5.js";
import { garage } from "./RoomLists/Items/garage.js";
import { yardPatio } from "./RoomLists/Items/yardPatio.js";
import { laundryRoom } from "./RoomLists/Items/laundryRoom.js";
import { musicInstuments } from "./RoomLists/Items/musicInstuments.js";
import { sportsFitness } from "./RoomLists/Items/sportsFitness";
import { boxesPbo } from "./RoomLists/Items/boxesPbo";
import { boxesCp } from "./RoomLists/Items/boxesCp.js";
import { basement } from "./RoomLists/Items/basement.js";
import { bathroom } from "./RoomLists/Items/bathroom.js";
import { reception } from "./RoomLists/Items/reception.js";
import { conferenceRoom } from "./RoomLists/Items/conferenceRoom.js";
import { waitingRoom } from "./RoomLists/Items/waitingRoom.js";
import { breakRoom } from "./RoomLists/Items/breakRoom.js";
import { bathRooms } from "./RoomLists/Items/bathRooms.js";
import { entryWay } from "./RoomLists/Items/entryWay.js";

const packingItemList = [
  { label: "Entryway", value: "Entryway" },
  { label: "Family Room", value: "Family Room" },
  { label: "Living Room", value: "Living Room" },
  { label: "Dining Room", value: "Dining Room" },
  { label: "Kitchen", value: "Kitchen" },
  { label: "Master Bedroom", value: "Master Bedroom" },
  { label: "Bedroom 2", value: "Bedroom 2" },
  { label: "Bedroom 3", value: "Bedroom 3" },
  { label: "Bedroom 4", value: "Bedroom 4" },
  { label: "Bedroom 5", value: "Bedroom 5" },
  { label: "Office", value: "Office" },
  { label: "Bathroom", value: "Bathroom" },
  { label: "Laundry Room", value: "Laundry Room" },
  { label: "Garage", value: "Garage" },
  { label: "Yard / Patio", value: "Yard / Patio" },
  { label: "Musical Instruments", value: "Musical Instruments" },
  { label: "Sports and Fitness", value: "Sports and Fitness" },
  { label: "Boxes - Packed By Owner", value: "Boxes - Packed By Owner" },
  { label: "Boxes - Packed By Company", value: "Boxes - Packed By Company" },
  { label: "Basement", value: "Basement" },
  { label: "Reception", value: "Reception" },
  { label: "Conference Room", value: "Conference Room" },
  { label: "Waiting Room", value: "Waiting Room" },
  { label: "Break Room", value: "Break Room" },
  { label: "Bath Room(s)", value: "Bath Room(s)" }
];

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
      inventoryAlert: false,
      // Add Item
      addItemFormOpen: false,
      addItemName: "",
      addItemWeight: "",
      addItemVolume: "",
      addItemRoomName: "",
      addItemAmt: ""
    };
  }
  static propTypes = {
    prop: PropTypes
  };
  static contextType = ContactContext;

  componentDidMount() {
    const { user } = this.props;
    const contacts = this.context;
    // console.log("USER in inventory:", user);
    if (user.inventory.length !== 0) {
      this.setState({
        inventory: user.inventory
      });
    }
    // Called to get the ivnentory for other components
    this.props.updateInventory(this.state.inventory);

    // contacts.getContact(user._id);
    // if (contacts.focusContact !== null) {
    //   if (contacts.focusContact.inventory !== this.state.inventory) {
    //     this.setState({ inventory: contacts.focusContact.inventory });
    //   }
    // }
  }
  componentDidUpdate(prevState) {
    // Calculates volume based on weight
    // if (
    //   this.state.addItemWeight.length !== 0 &&
    //   this.state.addItemWeight !== prevState.addItemWeight
    // ) {
    //   this.calculateAddItemVolume();
    //   // this.setState({ addItemVolume: this.state.addItemWeight / 7 });
    // }
    // if (this.state.addItemWeight !== prevState.addItemWeight) {
    //   this.setState({ addItemVolume: this.state.addItemWeight / 7 });
    // }
    // TODO if addItemVolume not empty but weight is volume*7
    // if (
    //   this.state.addItemVolume.length !== 0 &&
    //   this.state.addItemWeight.length === 0
    // ) {
    //   this.setState({ addItemWeight: this.state.addItemVolume * 7 });
    // }
    // TODO add conditional rendering here
    // this.props.updateInventory(this.state.inventory);
    // Called to get the ivnentory for other components - necessary here to update other components on render
  }
  calculateAddItemVolume = () => {
    let newWeight = this.state.addItemWeight / 7;
    this.setState({ addItemVolume: newWeight });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
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
    // console.log("amount:", amount);
    // console.log("itemName:", itemName);
    // console.log("roomname:", roomName);
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
    this.setState({ itemUpdate: !this.state.itemUpdate, inventory: inventory });
    this.props.updateInventory(inventory);
  };

  deleteItem = (roomName, itemName) => {
    const { user } = this.props;
    const contacts = this.context;

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
      inventory: inventory,
      deleteRefresh: !this.state.deleteRefresh
    });
    // const contact = {
    //   _id: user._id,
    //   inventory: this.state.inventory
    // };
    // contacts.updateContact(contact);
    // contacts.getContact(user._id);
    this.props.updateInventory(inventory);
    this.showDeleteNotification();
  };

  addItem = item => {
    // const { user } = this.props;
    // const contacts = this.context;
    console.log("item from add item:", item);
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
    // Called to update the focusContact for other components
    // this.props.updateUser(this.props.user._id);
    // Called to update the ivnentory for other components
    this.props.updateInventory(newInventory);
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
    // Called to update the focusContact for other components
    this.props.updateUser(user._id);
    // contacts.getContact(user._id);
    this.showInventoryNotification();
  };

  toggleItemForm = () => {
    this.setState({
      addItemFormOpen: !this.state.addItemFormOpen,
      addItemVolume: "",
      addItemWeight: "",
      addItemAmt: "",
      addItemName: "",
      addItemRoomName: ""
    });
  };

  addNewItem = () => {
    let item;
    // Calculates calcVolume and calcWeight if amount added > 1
    if (this.state.addItemAmt > 1) {
      item = {
        item: {
          calcVolume: this.state.addItemVolume * this.state.addItemAmt,
          calcWeight: this.state.addItemWeight * this.state.addItemAmt,
          itemAmt: this.state.addItemAmt,
          name: this.state.addItemName,
          volume: this.state.addItemVolume,
          weight: this.state.addItemWeight
        },
        roomName: this.state.addItemRoomName
      };
    } else {
      item = {
        item: {
          calcVolume: this.state.addItemVolume,
          calcWeight: this.state.addItemWeight,
          itemAmt: this.state.addItemAmt,
          name: this.state.addItemName,
          volume: this.state.addItemVolume,
          weight: this.state.addItemWeight
        },
        roomName: this.state.addItemRoomName
      };
    }

    console.log("item from new item:", item);
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
      itemAdded: item.item.name,
      addItemVolume: "",
      addItemWeight: "",
      addItemAmt: "",
      addItemName: "",
      addItemRoomName: ""
    });
    // Called to update the focusContact for other components
    // this.props.updateUser(this.props.user._id);
    // Called to update the ivnentory for other components
    this.props.updateInventory(newInventory);
    this.showNotification();
  };

  render() {
    // console.log("Esitmate props", this.props.user);
    // console.log("Inventory", this.state.inventory);
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
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <InventoryNavPills
                color="grey"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 12, md: 4 },
                  contentGrid: { xs: 12, sm: 12, md: 8 }
                }}
                tabs={[
                  {
                    tabButton: "Entryway",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Entryway"
                        addItem={this.addItem}
                        items={entryWay}
                      />
                    )
                  },
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
                        room="Kitchen"
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
                    tabButton: "Bedroom 2",
                    tabContent: (
                      <EstimateRoomlist
                        room="Bedroom 2"
                        addItem={this.addItem}
                        items={bedRoom2}
                      />
                    )
                  },
                  {
                    tabButton: "Bedroom 3",
                    tabContent: (
                      <EstimateRoomlist
                        room="Bedroom 3"
                        addItem={this.addItem}
                        items={bedRoom3}
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
                        items={bedRoom4}
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
                        items={bedRoom5}
                      />
                    )
                  },
                  {
                    tabButton: "Office",
                    tabContent: (
                      <EstimateRoomlist
                        room="Office"
                        addItem={this.addItem}
                        items={office}
                      />
                    )
                  },
                  {
                    tabButton: "Bathroom",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Bathroom"
                        addItem={this.addItem}
                        items={bathroom}
                      />
                    )
                  },
                  {
                    tabButton: "Laundry Room",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Laundry Room"
                        addItem={this.addItem}
                        items={laundryRoom}
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
                        items={garage}
                      />
                    )
                  },
                  {
                    tabButton: "Yard / Patio",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Yard / Patio"
                        addItem={this.addItem}
                        items={yardPatio}
                      />
                    )
                  },

                  {
                    tabButton: "Musical Instruments",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Musical Instruments"
                        addItem={this.addItem}
                        items={musicInstuments}
                      />
                    )
                  },
                  {
                    tabButton: "Sports and Fitness",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Sports and Fitness"
                        addItem={this.addItem}
                        items={sportsFitness}
                      />
                    )
                  },
                  {
                    tabButton: "Boxes (Packed By Owner)",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Boxes - Packed By Owner"
                        addItem={this.addItem}
                        items={boxesPbo}
                      />
                    )
                  },
                  {
                    tabButton: "Boxes (Packed By Company)",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Boxes - Packed By Company"
                        addItem={this.addItem}
                        items={boxesCp}
                      />
                    )
                  },
                  {
                    tabButton: "Basement",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Basement"
                        addItem={this.addItem}
                        items={basement}
                      />
                    )
                  },
                  {
                    tabButton: "Reception",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Reception"
                        addItem={this.addItem}
                        items={reception}
                      />
                    )
                  },
                  {
                    tabButton: "Conference Room",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Conference Room"
                        addItem={this.addItem}
                        items={conferenceRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Waiting Room",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Waiting Room"
                        addItem={this.addItem}
                        items={waitingRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Break Room",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Break Room"
                        addItem={this.addItem}
                        items={breakRoom}
                      />
                    )
                  },
                  {
                    tabButton: "Bath Room(s)",
                    // tabIcon: Home,
                    tabContent: (
                      <EstimateRoomlist
                        room="Bath Room(s)"
                        addItem={this.addItem}
                        items={bathRooms}
                      />
                    )
                  }
                ]}
              />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem"
              }}
            >
              <div style={{ display: "flex" }}>
                <Button
                  style={{ marginRight: "1rem" }}
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

                <PopupState variant="popover" popupId="add-item-popover">
                  {popupState => (
                    <div>
                      <ClickAwayListener onClick={this.toggleItemForm}>
                        <Button
                          id="addItemForm"
                          style={{ marginLeft: "1rem" }}
                          color="navy"
                          size="sm"
                          onClick={this.toggleItemForm}
                          {...bindTrigger(popupState)}
                          // disabled={this.state.inventory.length === 0}
                        >
                          <LibraryAdd />
                          Add New Item
                        </Button>
                      </ClickAwayListener>
                      <Popover
                        PaperProps={{
                          style: {
                            borderRadius: "5px",
                            padding: "1rem"
                          }
                        }}
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center"
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "center"
                        }}
                      >
                        {/**** ADD ITEM FORM ****/}
                        <div
                          style={{
                            width: "1000px",
                            display: "flex",
                            justifyContent: "space-around"
                          }}
                        >
                          <div style={{ width: "150px" }}>
                            <CustomInput
                              navy
                              labelText={<span>Item Name</span>}
                              id="addItemName"
                              formControlProps={{
                                fullWidth: false
                              }}
                              inputProps={{
                                onChange: this.onChange,
                                type: "text",
                                name: "addItemName",
                                value: this.state.addItemName
                              }}
                            />
                          </div>
                          <div style={{ width: "150px" }}>
                            <CustomInput
                              navy
                              labelText={<span>Item Weight</span>}
                              id="addItemWeight"
                              formControlProps={{
                                fullWidth: false
                              }}
                              inputProps={{
                                onChange: this.onChange,
                                type: "text",
                                name: "addItemWeight",
                                value:
                                  this.state.addItemVolume.length === 0
                                    ? this.state.addItemWeight
                                    : (this.state.addItemVolume * 7).toFixed(2)
                              }}
                            />
                          </div>
                          <div style={{ width: "150px" }}>
                            <CustomInput
                              navy
                              labelText={<span>Item Volume</span>}
                              id="addItemVolume"
                              formControlProps={{
                                fullWidth: false
                              }}
                              inputProps={{
                                onChange: this.onChange,
                                type: "text",
                                name: "addItemVolume",
                                value:
                                  this.state.addItemWeight.length === 0
                                    ? this.state.addItemVolume
                                    : (this.state.addItemWeight / 7).toFixed(2)
                              }}
                            />
                          </div>
                          <div style={{ width: "150px" }}>
                            <CustomInput
                              navy
                              labelText={<span>Item Amount</span>}
                              id="addItemAmt"
                              formControlProps={{
                                fullWidth: false
                              }}
                              inputProps={{
                                onChange: this.onChange,
                                type: "text",
                                name: "addItemAmt",
                                value: this.state.addItemAmt
                              }}
                            />
                          </div>
                          <div style={{ width: "150px" }}>
                            <CustomSelect
                              // fullWidth
                              onChange={this.onChange}
                              menuItems={packingItemList}
                              selectedValue={this.state.addItemRoomName}
                              firstItem={"Select Room Name"}
                              name="addItemRoomName"
                              label={<span>Select Room Name</span>}
                            />
                          </div>
                          <div style={{ width: "150px", marginTop: "1.5rem" }}>
                            <Button
                              id="addItemForm"
                              style={{ marginLeft: "2rem" }}
                              // color="navy"
                              size="sm"
                              onClick={this.addNewItem}
                              disabled={
                                this.state.addItemName.length === 0 ||
                                this.state.addItemAmt.length === 0 ||
                                this.state.addItemRoomName.length === 0
                              }
                            >
                              Add Item
                            </Button>
                          </div>
                        </div>
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </div>
            </div>
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
        </GridContainer>
      </>
    );
  }
}
export default Estimate;
