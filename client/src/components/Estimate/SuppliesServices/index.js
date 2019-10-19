import React, { Component } from "react";
import ContactContext from "../../../context/contact/ContactContext";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CustomSelect from "../../../components/components/Selects/CustomSelect.jsx";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import PackingTable from "./PackingTable";
import AdditionalServiceTable from "./addServicesTable";
import StorageListTable from "./storageTable";

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
      // Move Costs
      totalMoveCost: 0,
      totalMen: 2,
      totalTrucks: 1,
      ratePerHour: 120,
      driveTime: 0,
      stairHrs: 0,
      longCarryHrs: 0,
      moveHrs: 0,
      totalHrs: 0,
      // Packing
      packingItem: "",
      packingItemQty: 0,
      packingItemRate: 0,
      packingItemAmt: 0,
      packingTotal: 0,
      packingItems: [],
      // Additional Services
      addServiceName: "",
      addServiceAmt: 0,
      addServiceTotal: 0,
      additionalServices: [],
      // Fees
      tripFee: 50,
      receivingFee: 37.5,
      storageFee: 0,
      totalFees: 0,
      // Storage Costs
      itemName: "",
      itemQty: 0,
      itemRate: 0.25,
      daysInStorage: 0,
      itemAmt: 0,
      storageTotal: 0,
      storageItems: [],
      // Toggle Controls
      moveFormOpen: false,
      packingFormOpen: false,
      additionalFormOpen: false,
      storageFormOpen: false
    };
  }
  static contextType = ContactContext;

  componentDidMount() {
    // const { user } = this.props;
    // const contacts = this.context;

    if (this.props.inventory !== this.setState.inventory) {
      this.setState({ inventory: this.props.inventory });
      // Generate Totals
      this.generateTotalItems(this.props.inventory);
      this.generateTotalVolume(this.props.inventory);
      this.generateTotalWeight(this.props.inventory);
      this.generateTotalhrs();
      this.generateTotalMoveCost();
    }

    // contacts.getContact(user._id);
    // if (contacts.focusContact !== null) {
    //   this.setState({ inventory: contacts.focusContact.inventory });
    // this.generateTotalMoveCost();
  }

  componentDidUpdate(prevProps) {
    if (this.props.inventory !== prevProps.inventory) {
      this.setState({ inventory: this.props.inventory });
      // Generate New Totals
      this.generateTotalItems(this.props.inventory);
      this.generateTotalVolume(this.props.inventory);
      this.generateTotalWeight(this.props.inventory);
      this.generateTotalhrs();
      this.generateTotalMoveCost();
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

  generateTotalhrs = () => {
    const { totalWeight, totalMen } = this.state;
    // 500lbs Per man "totalMen"
    let weightPerHr = 500 * totalMen;
    let totalHrs = totalWeight / weightPerHr;
    // console.log("totalHrs:", totalHrs);
    this.setState({ totalHrs: totalHrs });
  };

  generateTotalMoveCost = () => {
    const { totalHrs, ratePerHour } = this.state;
    let totalCost = totalHrs * ratePerHour;
    // console.log("totalCost:", totalCost);
    this.setState({ totalMoveCost: totalCost });
  };

  // TODO reset form after adding items to array - storage

  // TODO Total Move costs = move cost+ packing + fees + add services + storage fees

  // TODO calculateRate function based off of men

  // onPackingChange = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };

  // changePackingItem = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  //   // Only create this function if he wants static item amount
  //   // this.setItemAmt();
  // };

  createAddService = () => {
    let newArr = [...this.state.additionalServices];
    // console.log("newArr:", newArr);
    const serviceObj = {
      serviceName: this.state.addServiceName,
      serviceAmt: this.state.addServiceAmt
    };
    // console.log("serviceObj:", serviceObj);
    newArr.push(serviceObj);
    // console.log("newArr:", newArr);
    this.setState({
      additionalServices: newArr,
      addServiceName: "",
      addServiceAmt: 0
    });
  };

  createPackingService = () => {
    let newArr = [...this.state.packingItems];
    const packingItemObj = {
      packingItem: this.state.packingItem,
      packingItemQty: this.state.packingItemQty,
      packingItemRate: this.state.packingItemRate,
      packingItemAmt: this.state.packingItemAmt
    };
    newArr.push(packingItemObj);
    // console.log("newArr:", newArr);
    this.setState({
      packingItems: newArr,
      packingItem: "",
      packingItemQty: 0,
      packingItemRate: 0,
      packingItemAmt: 0
    });
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
    this.setState({
      storageItems: newArr,
      itemName: "",
      itemQty: 0,
      itemRate: 0.25,
      daysInStorage: 0,
      itemAmt: 0
    });
  };

  deletePackingItem = itemName => {
    let itemArr = [...this.state.packingItems];
    // get the index of item in the array
    var removeIndex = itemArr.map(item => item.packingItem).indexOf(itemName);
    // Remove from array
    ~removeIndex && itemArr.splice(removeIndex, 1);
    this.setState({ packingItems: itemArr });
  };

  deleteServiceItem = itemName => {
    let itemArr = [...this.state.additionalServices];
    // get the index of item in the array
    var removeIndex = itemArr
      .map(item => item.addServiceName)
      .indexOf(itemName);
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
    this.setState({ storageItems: itemArr });
  };

  // Universal form toggle function
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
  // TODO Break out forms into seperate components
  render() {
    // console.log("PROPS", this.props);
    // console.log("PROPS INVENTORY", this.props.inventory);
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "1rem"
          }}
        >
          <Chip
            size="large"
            avatar={<Avatar>LBS</Avatar>}
            label={`Total Weight: ${this.state.totalWeight}`}
            clickable
            color="primary"
          />
          <Chip
            size="large"
            avatar={<Avatar>CFT</Avatar>}
            label={`Total Volume: ${this.state.totalVolume}`}
            clickable
            color="primary"
          />
          <Chip
            size="large"
            avatar={<Avatar>TIC</Avatar>}
            label={`Total Item Count: ${this.state.totalItems}`}
            clickable
            color="primary"
          />
          <Chip
            size="large"
            avatar={<Avatar>TMC</Avatar>}
            label={`Total Move Cost: ${this.state.totalMoveCost}`}
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
              {/* <div style={{ display: "flex" }}>
                <h4
                  style={{ margin: "0 1rem 0 0", padding: 0, color: "#9E9E9E" }}
                >
                  Move Hours: {this.state.totalMoveCost}
                </h4>
                <h4
                  style={{ margin: "0 1rem 0 0", padding: 0, color: "#9E9E9E" }}
                >
                  Total Hours: {this.state.totalMoveCost}
                </h4> */}
              <h4
                style={{ margin: "0 1rem 0 0", padding: 0, color: "#9E9E9E" }}
              >
                Total Charges: $ {this.state.totalMoveCost}
              </h4>
              {/* </div> */}
            </div>
            <Collapse in={this.state.moveFormOpen}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={2}>
                  {/* ROW 1 */}
                  <CustomInput
                    navy
                    labelText={<span>Number Of Men</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
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
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Number Of Trucks</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
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
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Rate Per Hour</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
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
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Drive Time</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
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
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Stair Hours</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
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
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    navy
                    labelText={<span>Long Carry Hours</span>}
                    id="item"
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "longCarryHrs",
                      value: this.state.longCarryHrs
                    }}
                  />
                </GridItem>
              </GridContainer>
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
                Total Charges: $ {this.state.totalMoveCost}
              </h4>
            </div>
            <Collapse in={this.state.packingFormOpen}>
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
                Total Charges: $ {this.state.totalMoveCost}
              </h4>
            </div>
            <Collapse in={this.state.additionalFormOpen}>
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
                Total Charges: $ {this.state.totalMoveCost}
              </h4>
            </div>
            <Collapse in={this.state.storageFormOpen}>
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

          {/***** TRIP FEE ******/}
          {/* <GridItem xs={12} sm={12} md={10}>
            <div style={{ display: "flex" }}>
              <h4>Trip Fee</h4>
              <CustomInput
                navy
                // labelText={<span>Trip Fee</span>}
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
            </div>
            <Collapse in={this.state.storageFormOpen}>
              <h1>Storage charges form</h1>
            </Collapse>
          </GridItem> */}
          {/***** RECIEVING FEE ******/}
          {/* <GridItem xs={12} sm={12} md={10}>
            <div style={{ display: "flex" }}>
              <h4>Receiving Fee</h4>
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
            </div>
            <Collapse in={this.state.storageFormOpen}>
              <h1>Storage charges form</h1>
            </Collapse>
          </GridItem> */}
        </GridContainer>

        {/* <br />
        <br />
        <br />
        <br />
        <ul>
          {this.state.inventory.map(room => (
            <li>
              {room.items.map((item, i) => (
                <p>
                  {i}
                  {item.name}
                </p>
              ))}
            </li>
          ))}
        </ul> */}
      </>
    );
  }
}
export default Supplies;
