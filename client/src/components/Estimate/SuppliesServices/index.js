import React, { Component } from "react";
import ContactContext from "../../../context/contact/ContactContext";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CustomSelect from "../../../components/components/Selects/CustomSelect.jsx";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import CloudUpload from "@material-ui/icons/CloudUpload";
import AddAlert from "@material-ui/icons/AddAlert";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import Snackbars from "../../components/Snackbar/Snackbar.jsx";
import PackingTable from "./PackingTable";
import AdditionalServiceTable from "./addServicesTable";
import StorageListTable from "./storageTable";
import moment from "moment";

const packingItemList = [
  { label: "Carton 1.5 Cu Ft", value: "Carton 1.5 Cu Ft" },
  { label: "Carton 3.0 Cu Ft", value: "Carton 3.0 Cu Ft" },
  { label: "Carton 4.5 Cu Ft", value: "Carton 4.5 Cu Ft" },
  { label: "Packing Paper", value: "Packing Paper" },
  { label: "Roll of Tape", value: "Roll of Tape" },
  { label: "Bubble Wrap", value: "Bubble Wrap" },
  { label: "Wardrobe", value: "Wardrobe" }
];

class Supplies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      // Totals
      totalWeight: 0,
      totalVolume: 0,
      totalItemCount: 0,
      allTotal: 0,
      // Move Costs
      totalMoveCost: 0,
      totalMen: "",
      totalTrucks: "",
      ratePerHour: "",
      driveTime: "",
      stairHrs: "",
      longCarryHrs: "",
      adjustmentTime: "",
      moveHrs: 0,
      totalHrs: 0,
      // Packing
      pack_date: null,
      pack_time: null,
      packingItem: "",
      packingItemQty: "",
      packingItemRate: "",
      packingItemAmt: "",
      packingItemTotal: "",
      packingTotal: 0,
      packingItems: [],
      // Additional Services
      addServiceName: "",
      addServiceAmt: "",
      addServiceTotal: "",
      additionalServices: [],
      // Fees
      tripFee: "",
      receivingFee: "",
      storageFee: "",
      totalFees: 0,
      // Storage Costs
      itemName: "",
      itemQty: "",
      itemRate: "", //0.25
      daysInStorage: "",
      itemAmt: "",
      storageTotal: 0,
      storageItems: [],
      // Toggle Controls
      moveFormOpen: false,
      packingFormOpen: false,
      additionalFormOpen: false,
      storageFormOpen: false,
      // Alert
      saveAlert: false
    };
  }
  static contextType = ContactContext;

  componentDidMount() {
    const { user } = this.props;
    // const contacts = this.context;

    if (this.props.inventory !== this.setState.inventory) {
      this.setState({ inventory: this.props.inventory });
      // Generate Totals
      this.generateTotalItems(this.props.inventory);
      this.generateTotalVolume(this.props.inventory);
      this.generateTotalWeight(this.props.inventory);
      this.generateTotalMoveCost();
    }
    // Move Charges - Loading service info if any
    if (user !== null) {
      if (user.moveServices !== null) {
        if (
          user.moveServices.moveCost.totalMen &&
          user.moveServices.moveCost.totalMen.length !== 0
        ) {
          this.setState({ totalMen: user.moveServices.moveCost.totalMen });
        }
        if (
          user.moveServices.moveCost.totalTrucks &&
          user.moveServices.moveCost.totalTrucks.length !== 0
        ) {
          this.setState({
            totalTrucks: user.moveServices.moveCost.totalTrucks
          });
        }
        if (
          user.moveServices.moveCost.ratePerHour &&
          user.moveServices.moveCost.ratePerHour.length !== 0
        ) {
          this.setState({
            ratePerHour: user.moveServices.moveCost.ratePerHour
          });
        }
        if (
          user.moveServices.moveCost.driveTime &&
          user.moveServices.moveCost.driveTime.length !== 0
        ) {
          this.setState({ driveTime: user.moveServices.moveCost.driveTime });
        }
        if (
          user.moveServices.moveCost.stairHours &&
          user.moveServices.moveCost.stairHours.length !== 0
        ) {
          this.setState({ stairHrs: user.moveServices.moveCost.stairHours });
        }
        if (
          user.moveServices.moveCost.longCarryHours &&
          user.moveServices.moveCost.longCarryHours.length !== 0
        ) {
          this.setState({
            longCarryHrs: user.moveServices.moveCost.longCarryHours
          });
        }
        if (
          user.moveServices.moveCost.adjustmentTime &&
          user.moveServices.moveCost.adjustmentTime.length !== 0
        ) {
          this.setState({
            adjustmentTime: user.moveServices.moveCost.adjustmentTime
          });
        }
        // Packing services
        if (user.moveServices.packing.packingItems.length !== 0) {
          this.setState(
            { packingItems: user.moveServices.packing.packingItems },
            () => this.calculateTotalPackingFees()
          );
        }
        // Additional Services & Fees
        if (user.moveServices.additionalServices.addservices.length !== 0) {
          this.setState(
            {
              additionalServices:
                user.moveServices.additionalServices.addservices
            },
            () => this.calculateAddServiceTotal()
          );
        }
        if (
          user.moveServices.fees.receivingFee &&
          user.moveServices.fees.receivingFee.length !== 0
        ) {
          this.setState({
            receivingFee: user.moveServices.fees.receivingFee
          });
        }
        if (
          user.moveServices.moveCost.tripFee &&
          user.moveServices.moveCost.tripFee.length !== 0
        ) {
          this.setState({
            tripFee: user.moveServices.moveCost.tripFee
          });
        }
        // Storage
        if (user.moveServices.storage.storageItems.length !== 0) {
          this.setState(
            { storageItems: user.moveServices.storage.storageItems },
            () => this.calculateStorageFees()
          );
        }
      }
    }
    // contacts.getContact(user._id);
    // if (contacts.focusContact !== null) {
    //   this.setState({ inventory: contacts.focusContact.inventory });
    // this.generateTotalMoveCost();
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props;
    // ***** FOR LOADING INVENTORY INFO (IF ANY) *****
    if (this.props.inventory !== prevProps.inventory) {
      // console.log("UPDATED INVENTORY IN SUPPLIES");
      this.setState({ inventory: this.props.inventory });
      // Generate New Totals
      this.generateTotalItems(this.props.inventory);
      this.generateTotalVolume(this.props.inventory);
      this.generateTotalWeight(this.props.inventory);
      // TODO Maybe need to check if men and rateperhour is there to avoid error
      // this.calculateMoveHrs();
      this.calculateTotalhrs();
      this.calculateMoveCost();
      this.calculateTotalMoveCost();
      this.generateTotalMoveCost();
    }
    // Updating move as inventory updates
    if (this.state.totalWeight !== prevState.totalWeight) {
      if (
        this.state.totalMen.length !== 0 &&
        this.state.ratePerHour.length !== 0
      ) {
        this.calculateMoveHrs();
        // Saves to update user for finalize
        // this.submitServices();
      }
    }

    // ***** FOR LOADING MOVE SERVICE INFO (IF ANY) *****

    // ***** FOR LOGIC *****
    // Calculate TOTAL move cost (this.state.allTotal)
    if (
      this.state.totalMoveCost !== prevState.totalMoveCost ||
      this.state.packingTotal !== prevState.packingTotal ||
      this.state.totalFees !== prevState.totalFees ||
      this.state.storageTotal !== prevState.storageTotal
    ) {
      this.calculateTotalMoveCost();
    }
    if (this.state.ratePerHour !== prevState.ratePerHour) {
      this.calculateMoveCost();
    }
    if (
      this.state.totalMen !== prevState.totalMen ||
      this.state.totalTrucks !== prevState.totalTrucks
    ) {
      // Calculate moving Hours
      this.calculateMoveHrs();
    }
    // Calculate total move hours (movehurs,drivetime, longcarry, starihrs)
    if (
      this.state.moveHrs !== prevState.moveHrs ||
      this.state.driveTime !== prevState.driveTime ||
      this.state.stairHrs !== prevState.stairHrs ||
      this.state.longCarryHrs !== prevState.longCarryHrs ||
      this.state.adjustmentTime !== prevState.adjustmentTime
    ) {
      this.calculateTotalhrs();
    }
    // Calulate packing item total amt
    if (
      this.state.packingItemQty !== prevState.packingItemQty ||
      this.state.packingItemRate !== prevState.packingItemRate
    ) {
      this.calculatePackingItemTotal();
    }
    // Calculate trip fees
    if (
      this.state.tripFee !== prevState.tripFee ||
      this.state.receivingFee !== prevState.receivingFee ||
      this.state.additionalServices !== prevState.additionalServices
    ) {
      this.calculateFees();
    }
    // Storage Fees
    if (
      this.state.itemQty !== prevState.itemQty ||
      this.state.itemRate !== prevState.itemRate ||
      this.state.daysInStorage !== prevState.daysInStorage
    ) {
      this.calculateStorageItemTotal();
    }

    // const { user } = this.props;
    // const contacts = this.context;
    // if (this.state.inventory !== contacts.focusContact.inventory) {
    //   this.setState({ inventory: contacts.focusContact.inventory });
    //   // this.generateTotalMoveCost();
    // }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDateChange = date => {
    this.setState({ pack_date: date });
  };

  handleTimeChange = time => {
    this.setState({ pack_time: time });
  };
  // Total Functions
  // For complete move cost
  calculateTotalMoveCost = () => {
    const { totalMoveCost, packingTotal, totalFees, storageTotal } = this.state;
    // console.log("storageTotal:", storageTotal);
    // console.log("totalFees:", totalFees);
    // console.log("packingTotal:", packingTotal);
    // console.log("totalMoveCost:", totalMoveCost);
    let total = 0;
    total =
      parseFloat(totalMoveCost) +
      parseFloat(packingTotal) +
      parseFloat(totalFees) +
      parseFloat(storageTotal);
    this.setState({ allTotal: parseFloat(total).toFixed(2) });
  };
  // Only move section
  generateTotalMoveCost = () => {
    const { totalHrs, ratePerHour } = this.state;
    let totalCost = totalHrs * ratePerHour;
    // console.log("totalCost:", totalCost);
    this.setState({ totalMoveCost: totalCost });
  };

  calculateMoveHrs = () => {
    let hours =
      parseFloat(this.state.totalWeight) /
      parseFloat(this.state.totalMen * 500);
    hours = (Math.round(hours * 4) / 4).toFixed(2);
    if (isNaN(hours)) {
      hours = "";
    }
    if (this.state.totalMen === "") {
      hours = 0;
    }
    this.setState({ moveHrs: hours });
  };

  calculateTotalhrs = () => {
    const {
      moveHrs,
      driveTime,
      stairHrs,
      longCarryHrs,
      adjustmentTime
    } = this.state;
    let totalHrs = 0;
    // move
    if (moveHrs.length !== 0) {
      totalHrs = parseFloat(moveHrs);
    }
    // move , drive time
    if (moveHrs.length !== 0 && driveTime.length !== 0) {
      totalHrs = parseFloat(moveHrs) + parseFloat(driveTime);
    }
    // move , stair hours
    if (moveHrs.length !== 0 && stairHrs.length !== 0) {
      totalHrs = parseFloat(moveHrs) + parseFloat(stairHrs);
    }
    // move , long carry hours
    if (moveHrs.length !== 0 && longCarryHrs.length !== 0) {
      totalHrs = parseFloat(moveHrs) + parseFloat(longCarryHrs);
    }
    // move , adjustment time
    if (moveHrs.length !== 0 && adjustmentTime.length !== 0) {
      totalHrs = parseFloat(moveHrs) + parseFloat(adjustmentTime);
    }
    // move , drive time, stairs
    if (
      moveHrs.length !== 0 &&
      driveTime.length !== 0 &&
      stairHrs.length !== 0
    ) {
      totalHrs =
        parseFloat(moveHrs) + parseFloat(driveTime) + parseFloat(stairHrs);
    }
    // move , drive time, longcarry
    if (
      moveHrs.length !== 0 &&
      driveTime.length !== 0 &&
      longCarryHrs.length !== 0
    ) {
      totalHrs =
        parseFloat(moveHrs) + parseFloat(driveTime) + parseFloat(longCarryHrs);
    }
    // move , drive time, adjustment time
    if (
      moveHrs.length !== 0 &&
      driveTime.length !== 0 &&
      adjustmentTime.length !== 0
    ) {
      totalHrs =
        parseFloat(moveHrs) +
        parseFloat(driveTime) +
        parseFloat(adjustmentTime);
    }
    // move, stairs, longcarry hours
    if (
      moveHrs.length !== 0 &&
      stairHrs.length !== 0 &&
      longCarryHrs.length !== 0
    ) {
      totalHrs =
        parseFloat(moveHrs) + parseFloat(stairHrs) + parseFloat(longCarryHrs);
    }
    // move, stairs, adjustment time
    if (
      moveHrs.length !== 0 &&
      stairHrs.length !== 0 &&
      adjustmentTime.length !== 0
    ) {
      totalHrs =
        parseFloat(moveHrs) + parseFloat(stairHrs) + parseFloat(adjustmentTime);
    }
    // move, stairs, longcarry, adjustment time
    if (
      moveHrs.length !== 0 &&
      stairHrs.length !== 0 &&
      longCarryHrs.length !== 0 &&
      adjustmentTime.length !== 0
    ) {
      totalHrs =
        parseFloat(moveHrs) +
        parseFloat(stairHrs) +
        parseFloat(longCarryHrs) +
        parseFloat(adjustmentTime);
    }
    // move, longcarry, adjustment time
    if (
      moveHrs.length !== 0 &&
      longCarryHrs.length !== 0 &&
      adjustmentTime.length !== 0
    ) {
      totalHrs =
        parseFloat(moveHrs) +
        parseFloat(longCarryHrs) +
        parseFloat(adjustmentTime);
    }
    // all hours
    if (
      moveHrs.length !== 0 &&
      driveTime.length !== 0 &&
      stairHrs.length !== 0 &&
      longCarryHrs.length !== 0 &&
      adjustmentTime.length !== 0
    ) {
      totalHrs =
        parseFloat(moveHrs) +
        parseFloat(driveTime) +
        parseFloat(stairHrs) +
        parseFloat(longCarryHrs) +
        parseFloat(adjustmentTime);
    }
    // reset total hours to 0
    if (
      moveHrs.length === 0 &&
      driveTime.length === 0 &&
      stairHrs.length === 0 &&
      longCarryHrs.length === 0
    ) {
      totalHrs = 0;
    }
    this.setState({ totalHrs: totalHrs }, () => this.calculateMoveCost());
  };

  calculateMoveCost = () => {
    const { totalHrs, ratePerHour } = this.state;
    let total = 0;
    total = parseFloat(totalHrs) * parseFloat(ratePerHour);
    if (ratePerHour.length === 0) {
      this.setState({ totalMoveCost: 0 });
    } else {
      this.setState({ totalMoveCost: parseFloat(total).toFixed(2) });
    }
  };

  calculatePackingItemTotal = () => {
    let total = 0;
    total =
      parseFloat(this.state.packingItemQty) *
      parseFloat(this.state.packingItemRate);
    // check if total is a number to stop NaN display
    if (isNaN(total)) {
      total = "";
    }
    this.setState({ packingItemAmt: total });
  };

  calculateTotalPackingFees = () => {
    let total = 0;
    if (this.state.packingItems.length === 0) {
      // if no items set total to 0
      this.setState({ packingTotal: total });
    } else {
      // if items calculate total
      this.state.packingItems.forEach(item => {
        total = total + parseFloat(item.packingItemAmt);
      });
      this.setState({ packingTotal: parseFloat(total).toFixed(2) });
    }
  };

  calculateStorageItemTotal = () => {
    // quantity * rate * days
    let total = 0;
    total =
      parseFloat(this.state.itemQty) *
      parseFloat(this.state.itemRate) *
      parseFloat(this.state.daysInStorage);
    // check if total is a number to stop NaN display
    if (isNaN(total)) {
      total = "";
    }
    this.setState({
      itemAmt: total
      // itemAmt: parseFloat(total).toFixed(2)
    });
  };

  calculateStorageFees = () => {
    let total = 0;
    if (this.state.storageItems.length === 0) {
      // if no items set total to 0
      this.setState({ storageTotal: total });
    } else {
      // if items calculate total
      this.state.storageItems.forEach(item => {
        total = total + parseFloat(item.itemAmt);
      });
      this.setState({ storageTotal: parseFloat(total).toFixed(2) });
    }
  };

  calculateAddServiceTotal = () => {
    let total = 0;

    if (this.state.additionalServices.length === 0) {
      // if no items set total to 0
      this.setState({ storageTotal: total });
    } else {
      // if items calculate total
      this.state.additionalServices.forEach(item => {
        total = total + parseFloat(item.serviceAmt);
      });
      console.log(" add service total:", total);
      this.setState({ addServiceTotal: parseFloat(total).toFixed(2) });
    }
  };

  calculateFees = () => {
    // Just Recieving Fee
    if (this.state.receivingFee.length !== 0) {
      this.setState({
        totalFees: this.state.receivingFee
      });
    }

    // Just Trip Fee
    if (this.state.tripFee.length !== 0) {
      this.setState({ totalFees: this.state.tripFee });
    }

    // Trip Fee & Receiving Fee
    if (
      this.state.tripFee.length !== 0 &&
      this.state.receivingFee.length !== 0
    ) {
      let total =
        parseFloat(this.state.tripFee) + parseFloat(this.state.receivingFee);
      this.setState({ totalFees: total.toFixed(2) });
    }

    // Additional Setvices
    if (this.state.additionalServices.length !== 0) {
      let total = 0;
      this.state.additionalServices.forEach(service => {
        total = total + parseFloat(service.serviceAmt);
      });
      this.setState({ totalFees: total.toFixed(2) });
    }

    // Addtional Services and Trip Fee
    if (
      this.state.tripFee.length !== 0 &&
      this.state.additionalServices.length !== 0
    ) {
      let total = 0;
      // Add up additional services
      this.state.additionalServices.forEach(service => {
        total = total + parseFloat(service.serviceAmt);
      });
      // console.log("total after addtional:", total);
      // add fees
      total = total + parseFloat(this.state.tripFee);
      this.setState({ totalFees: total.toFixed(2) });
    }

    // Addtional Services and Receiving Fee
    if (
      this.state.receivingFee.length !== 0 &&
      this.state.additionalServices.length !== 0
    ) {
      let total = 0;
      // Add up additional services
      this.state.additionalServices.forEach(service => {
        total = total + parseFloat(service.serviceAmt);
      });
      // console.log("total after addtional:", total);
      // add fees
      total = total + parseFloat(this.state.receivingFee);
      this.setState({ totalFees: total.toFixed(2) });
    }

    // Trip Fee & Receiving Fee & Additional services
    if (
      this.state.tripFee.length !== 0 &&
      this.state.receivingFee.length !== 0 &&
      this.state.additionalServices.length !== 0
    ) {
      let total = 0;
      // Add up additional services
      this.state.additionalServices.forEach(service => {
        total = total + parseFloat(service.serviceAmt);
      });
      // add fees
      total =
        total +
        parseFloat(this.state.tripFee) +
        parseFloat(this.state.receivingFee);
      this.setState({ totalFees: total.toFixed(2) });
    }

    // Reset total fees if none
    if (
      this.state.tripFee.length === 0 &&
      this.state.receivingFee.length === 0 &&
      this.state.additionalServices.length === 0
    ) {
      this.setState({ totalFees: 0 });
    }
  };

  generateTotalWeight = inventory => {
    let totalWeight = 0;
    inventory.forEach((room, i) =>
      room.items.forEach(item => {
        // parseInt because item.calcWeight is passed in as string
        totalWeight = totalWeight + parseInt(item.calcWeight);
      })
    );
    this.setState({ totalWeight: totalWeight });
  };

  generateTotalVolume = inventory => {
    let totalVolume = 0;
    inventory.forEach((room, i) =>
      room.items.forEach(item => {
        // parseInt because item.calcVolume is passed in as string
        totalVolume = totalVolume + parseInt(item.calcVolume);
      })
    );
    this.setState({ totalVolume: totalVolume });
  };

  generateTotalItems = inventory => {
    let totalItems = 0;
    inventory.forEach((room, i) =>
      room.items.forEach(item => {
        // parseInt because item.itemAmt is passed in as string
        totalItems = totalItems + parseInt(item.itemAmt);
      })
    );
    this.setState({ totalItems: totalItems });
  };
  // **** Create Functions ****
  createAddService = () => {
    let newArr = [...this.state.additionalServices];
    // console.log("newArr:", newArr);
    const serviceObj = {
      serviceName: this.state.addServiceName,
      serviceAmt: parseFloat(this.state.addServiceAmt).toFixed(2)
    };
    // console.log("serviceObj:", serviceObj);
    newArr.push(serviceObj);
    // console.log("newArr:", newArr);
    this.setState(
      {
        additionalServices: newArr,
        addServiceName: "",
        addServiceAmt: ""
      },
      () => {
        this.calculateAddServiceTotal();
      }
    );
  };

  createPackingService = () => {
    let newArr = [...this.state.packingItems];
    const packingItemObj = {
      packingItem: this.state.packingItem,
      packingItemQty: parseFloat(this.state.packingItemQty),
      packingItemRate: parseFloat(this.state.packingItemRate).toFixed(2),
      packingItemAmt: parseFloat(this.state.packingItemAmt).toFixed(2)
    };
    newArr.push(packingItemObj);
    console.log("newArr:", newArr);
    this.setState(
      {
        packingItems: newArr,
        packingItem: "",
        packingItemQty: "",
        packingItemRate: "",
        packingItemAmt: ""
      },
      () => {
        // Calculate totals for packing
        this.calculateTotalPackingFees();
      }
    );
  };

  createStorageItem = () => {
    let newArr = [...this.state.storageItems];
    const storageItemObj = {
      itemName: this.state.itemName,
      itemQty: this.state.itemQty,
      itemRate: this.state.itemRate,
      daysInStorage: this.state.daysInStorage,
      itemAmt: this.state.itemAmt
    };
    newArr.push(storageItemObj);
    // console.log("newArr:", newArr);
    this.setState(
      {
        storageItems: newArr,
        itemName: "",
        itemQty: "",
        itemRate: "",
        daysInStorage: "",
        itemAmt: ""
      },
      () => {
        // Calculate totals for storage
        this.calculateStorageFees();
      }
    );
  };
  // **** Delete Functions ****
  deletePackingItem = itemName => {
    let itemArr = [...this.state.packingItems];
    // get the index of item in the array
    var removeIndex = itemArr.map(item => item.packingItem).indexOf(itemName);
    // Remove from array
    ~removeIndex && itemArr.splice(removeIndex, 1);
    this.setState({ packingItems: itemArr }, () => {
      // Recalculate packing fees
      this.calculateTotalPackingFees();
    });
  };

  deleteServiceItem = itemName => {
    let itemArr = [...this.state.additionalServices];
    // get the index of item in the array
    var removeIndex = itemArr.map(item => item.serviceName).indexOf(itemName);
    // Remove from array
    ~removeIndex && itemArr.splice(removeIndex, 1);
    this.setState({ additionalServices: itemArr });
  };

  deleteStorageItem = item_name => {
    let itemArr = [...this.state.storageItems];
    // get the index of item in the array
    var removeIndex = itemArr.map(item => item.itemName).indexOf(item_name);
    // Remove from array
    ~removeIndex && itemArr.splice(removeIndex, 1);
    this.setState({ storageItems: itemArr }, () => {
      this.calculateStorageFees();
    });
  };

  showSaveNotification = () => {
    if (!this.saveAlert) {
      this.setState({ saveAlert: !this.state.saveAlert });
      // use this to make the notification autoclose
      setTimeout(
        () => this.setState({ saveAlert: !this.state.saveAlert }),
        1000
      );
    }
  };

  // **** Universal form toggle function ****
  handleFormToggle = name => {
    if (name === "moveFormOpen") {
      this.setState({ moveFormOpen: !this.state.moveFormOpen });
    }
    if (name === "packingFormOpen") {
      this.setState({ packingFormOpen: !this.state.packingFormOpen });
    }
    if (name === "additionalFormOpen") {
      this.setState({ additionalFormOpen: !this.state.additionalFormOpen });
    }
    if (name === "storageFormOpen") {
      this.setState({ storageFormOpen: !this.state.storageFormOpen });
    }
  };
  // **** Submit Services ****
  submitServices = () => {
    const { user } = this.props;
    const contacts = this.context;
    const serviceObj = {
      moveCost: {
        totalMen: this.state.totalMen,
        totalTrucks: this.state.totalTrucks,
        totalHours: this.state.totalHrs,
        moveHours: this.state.moveHrs,
        stairHours: this.state.stairHrs,
        longCarryHours: this.state.longCarryHrs,
        driveTime: this.state.driveTime,
        adjustmentTime: this.state.adjustmentTime,
        ratePerHour: this.state.ratePerHour,
        tripFee: this.state.tripFee,
        totalMoveCost: this.state.totalMoveCost
      },
      packing: {
        packingItems: this.state.packingItems,
        packingTotal: this.state.packingTotal
      },
      fees: {
        receivingFee: this.state.receivingFee,
        totalFees: this.state.totalFees
      },
      additionalServices: {
        addservices: this.state.additionalServices,
        addServicesTotal: this.state.addServiceTotal
      },
      storage: {
        storageItems: this.state.storageItems,
        storageTotal: this.state.storageTotal
      },
      totalWeight: this.state.totalWeight,
      totalVolume: this.state.totalVolume,
      totalItemCount: this.state.totalItems,
      allTotal: this.state.allTotal
    };

    let contact = {};
    if (this.state.pack_date !== null || this.state.pack_time !== null) {
      contact = {
        _id: user._id,
        moveServices: serviceObj,
        pack_date: this.state.pack_date,
        pack_time: this.state.pack_time
      };
    } else {
      contact = {
        _id: user._id,
        moveServices: serviceObj
      };
    }

    contacts.updateContact(contact);
    // Called to update the focusContact for other components
    this.props.updateUser(user._id);
    this.showSaveNotification();
    this.setState({ pack_date: null, pack_time: null });
  };
  // TODO Break out forms into seperate components
  render() {
    // console.log("PROPS", this.props);
    // console.log("USER", this.props.user);
    // console.log("inventory:", this.state.inventory);
    // console.log("PROPS INVENTORY", this.props.inventory);
    return (
      <>
        <Snackbars
          place="tr"
          color="info"
          icon={AddAlert}
          message="Save Successful"
          open={this.state.saveAlert}
          closeNotification={() => this.setState({ saveAlert: false })}
          close
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
            paddingRight: "9.5rem"
          }}
        >
          <div style={{ marginRight: ".5rem" }}>
            <Chip
              size="large"
              // avatar={<Avatar>LBS</Avatar>}
              label={`Total Weight (lbs): ${this.state.totalWeight}`}
              clickable
              color="primary"
            />
          </div>
          <div style={{ marginRight: ".5rem" }}>
            <Chip
              size="large"
              // avatar={<Avatar>CFT</Avatar>}
              label={`Total Volume (cft): ${this.state.totalVolume}`}
              clickable
              color="primary"
            />
          </div>
          <div style={{ marginRight: ".5rem" }}>
            <Chip
              size="large"
              // avatar={<Avatar>TIC</Avatar>}
              label={`Total Item Count: ${this.state.totalItems}`}
              clickable
              color="primary"
            />
          </div>

          <Chip
            size="large"
            // avatar={<Avatar>TMC</Avatar>}
            label={`Total Move Cost: ${this.state.allTotal}`}
            clickable
            // className={classes.chip}
            color="secondary"
          />
        </div>
        <GridContainer justify="center">
          {/***** MOVE CHARGES ******/}
          <GridItem xs={12} sm={12} md={10}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                paddingBottom: ".5rem"
              }}
            >
              <Button
                color="navy"
                size="sm"
                onClick={() => this.handleFormToggle("moveFormOpen")}
              >
                Move Charges
                <ArrowDropDown />
              </Button>
              <h4
                style={{ margin: "0 1rem 0 0", padding: 0, color: "#9E9E9E" }}
              >
                Total Charges: $ {this.state.totalMoveCost}
              </h4>
            </div>
            <Collapse
              in={this.state.moveFormOpen}
              style={{ marginBottom: "1.5rem" }}
            >
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  {/* ROW 1 */}
                  <CustomInput
                    navy
                    labelText={<span>Number Of Men</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "totalMen",
                      value: this.state.totalMen
                    }}
                  />
                </GridItem>
                {/* ROW 2 */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    navy
                    labelText={<span>Number Of Trucks</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "totalTrucks",
                      value: this.state.totalTrucks
                    }}
                  />
                </GridItem>
                {/* ROW 3 */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    navy
                    labelText={<span>Rate Per Hour</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "ratePerHour",
                      value: this.state.ratePerHour
                    }}
                  />
                </GridItem>
                {/* ROW 4 */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    navy
                    labelText={<span>Drive Time</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "driveTime",
                      value: this.state.driveTime
                    }}
                  />
                </GridItem>
                {/* ROW 5 */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    navy
                    labelText={<span>Stair Hours</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "stairHrs",
                      value: this.state.stairHrs
                    }}
                  />
                </GridItem>
                {/* ROW 6 */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    navy
                    labelText={<span>Long Carry Hours</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "longCarryHrs",
                      value: this.state.longCarryHrs
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    navy
                    labelText={<span>Adjustment Time</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "adjustmentTime",
                      value: this.state.adjustmentTime
                    }}
                  />
                </GridItem>
              </GridContainer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <h4
                  style={{
                    margin: "0 1rem 0 0",
                    padding: 0,
                    color: "#3F51B5"
                  }}
                >
                  Move Hours: {this.state.moveHrs}
                </h4>
                <h4
                  style={{
                    margin: "0 1rem 0 0",
                    padding: 0,
                    color: "#3F51B5"
                  }}
                >
                  Total Move Hours: {this.state.totalHrs}
                </h4>
              </div>
            </Collapse>
          </GridItem>
          {/***** PACKING ******/}
          <GridItem xs={12} sm={12} md={10}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                paddingBottom: ".5rem"
              }}
            >
              <Button
                color="navy"
                size="sm"
                onClick={() => this.handleFormToggle("packingFormOpen")}
              >
                Packing
                <ArrowDropDown />
              </Button>
              <h4
                style={{ margin: "0 1rem 0 0", padding: 0, color: "#9E9E9E" }}
              >
                Total Charges: $ {this.state.packingTotal}
              </h4>
            </div>
            <Collapse
              in={this.state.packingFormOpen}
              style={{ marginBottom: "1.5rem" }}
            >
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      clearable
                      label="Pack Date"
                      value={this.state.pack_date}
                      onChange={date =>
                        this.handleDateChange(moment(date).format("MM/DD/YYYY"))
                      }
                      minDate={new Date()}
                      format="MM/dd/yyyy"
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      autoOk={true}
                      margin="normal"
                      label="Pack Time"
                      mask="__:__ _M"
                      inputValue={this.state.pack_time}
                      value={this.state.pack_time}
                      onChange={time =>
                        this.handleTimeChange(moment(time).format("hh:mm A"))
                      }
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomSelect
                    fullWidth
                    onChange={this.onChange}
                    menuItems={packingItemList}
                    selectedValue={this.state.packingItem}
                    firstItem={"Select Packing material"}
                    name="packingItem"
                    label={<span>Select Packing Material</span>}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Item Quantity</span>}
                    id="packingItemQty"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "packingItemQty",
                      value: this.state.packingItemQty
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Item Rate</span>}
                    id="packingItemRate"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "packingItemRate",
                      value: this.state.packingItemRate
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Item Amount</span>}
                    id="packingItemAmt"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "packingItemAmt",
                      value: this.state.packingItemAmt
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button
                    style={{ margin: "2rem 0 0 0" }}
                    color="navy"
                    size="sm"
                    onClick={this.createPackingService}
                    disabled={
                      this.state.packingItem.length === 0 ||
                      this.state.packingItemQty.length === 0 ||
                      this.state.packingItemRate.length === 0
                    }
                  >
                    Add Packing Item
                  </Button>
                </GridItem>
                {/***** Packing Table *****/}
                {this.state.packingItems.length !== 0 ? (
                  <GridItem xs={12} sm={12} md={12}>
                    <PackingTable
                      packingList={this.state.packingItems}
                      deleteItem={this.deletePackingItem}
                    />
                  </GridItem>
                ) : null}
              </GridContainer>
            </Collapse>
          </GridItem>
          {/***** ADDITIONAL SERVICES & Fees ******/}
          <GridItem xs={12} sm={12} md={10}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                paddingBottom: ".5rem"
              }}
            >
              <Button
                color="navy"
                size="sm"
                onClick={() => this.handleFormToggle("additionalFormOpen")}
              >
                Additional Services & Fees
                <ArrowDropDown />
              </Button>
              <h4
                style={{ margin: "0 1rem 0 0", padding: 0, color: "#9E9E9E" }}
              >
                Total Charges: $ {this.state.totalFees}
              </h4>
            </div>
            <Collapse
              in={this.state.additionalFormOpen}
              style={{ marginBottom: "1.5rem" }}
            >
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4>Additional Fees</h4>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Trip Fee</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "tripFee",
                      value: this.state.tripFee
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Receiving Fee</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "receivingFee",
                      value: this.state.receivingFee
                    }}
                  />
                </GridItem>
              </GridContainer>
              {/* Additional Services form */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4>Additional Services</h4>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Service Name</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "addServiceName",
                      value: this.state.addServiceName
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Service Amount</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "addServiceAmt",
                      value: this.state.addServiceAmt
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button
                    style={{ margin: "2rem 0 0 0" }}
                    color="navy"
                    size="sm"
                    onClick={this.createAddService}
                    disabled={
                      this.state.addServiceName.length === 0 ||
                      this.state.addServiceAmt.length === 0
                    }
                  >
                    Add Service
                  </Button>
                </GridItem>
                {/***** Additional Service Table *****/}
                {this.state.additionalServices.length !== 0 ? (
                  <GridItem xs={12} sm={12} md={12}>
                    <AdditionalServiceTable
                      deleteItem={this.deleteServiceItem}
                      serviceList={this.state.additionalServices}
                    />
                  </GridItem>
                ) : null}
              </GridContainer>
              {/* Display Additional Services */}
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={2}>
                  {this.state.additionalServices &&
                    this.state.additionalServices.map((service, i) => (
                      <ul>
                        <li key={i}>
                          {i + 1}) {service.serviceName} - {service.serviceAmt}
                        </li>
                      </ul>
                    ))}
                </GridItem>
              </GridContainer> */}
            </Collapse>
          </GridItem>
          {/***** STORAGE RECURRING / FIRST MONT ******/}
          <GridItem xs={12} sm={12} md={10}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                paddingBottom: ".5rem"
              }}
            >
              <Button
                color="navy"
                size="sm"
                onClick={() => this.handleFormToggle("storageFormOpen")}
              >
                Storage Recurring - First Month
                <ArrowDropDown />
              </Button>
              <h4
                style={{ margin: "0 1rem 0 0", padding: 0, color: "#9E9E9E" }}
              >
                Total Charges: $ {this.state.storageTotal}
              </h4>
            </div>
            <Collapse
              in={this.state.storageFormOpen}
              style={{ marginBottom: "1.5rem" }}
            >
              <GridContainer>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Item Name</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "itemName",
                      value: this.state.itemName
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Item Quantity</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "itemQty",
                      value: this.state.itemQty
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Item Rate</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "itemRate",
                      value: this.state.itemRate
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Days In Storage</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "daysInStorage",
                      value: this.state.daysInStorage
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Item Amount</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "itemAmt",
                      value: this.state.itemAmt
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button
                    style={{ margin: "2rem 0 0 0" }}
                    color="navy"
                    size="sm"
                    onClick={this.createStorageItem}
                    disabled={
                      this.state.itemName.length === 0 ||
                      this.state.itemQty.length === 0 ||
                      this.state.itemRate.length === 0 ||
                      this.state.daysInStorage.length === 0
                    }
                  >
                    Add Storage Item
                  </Button>
                </GridItem>
                {/***** Storage Service Table *****/}
                {this.state.storageItems.length !== 0 ? (
                  <GridItem xs={12} sm={12} md={12}>
                    <StorageListTable
                      deleteItem={this.deleteStorageItem}
                      storageList={this.state.storageItems}
                    />
                  </GridItem>
                ) : null}
              </GridContainer>
            </Collapse>
          </GridItem>
        </GridContainer>
        {/***** SAVE BUTTON ******/}
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Button
            color="success"
            size="sm"
            onClick={this.submitServices}
            // disabled={this.state.inventory.length === 0}
          >
            <CloudUpload />
            {/* {this.props.user.moveServices.length === 0
              ? "Save Services"
              : "Update Services"} */}
            Save Services
          </Button>
        </div>
      </>
    );
  }
}
export default Supplies;
