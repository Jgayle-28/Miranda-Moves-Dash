import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CustomSelect from "../../../components/components/Selects/CustomSelect.jsx";
import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import moment from "moment";
import "./geo.css";
import Geosuggest from "react-geosuggest";
import ContactContext from "../../../context/contact/ContactContext";

const pay_types = [
  { label: "COD", value: "COD" },
  { label: "TBB", value: "TBB" },
  { label: "Trade", value: "Trade" },
  { label: "Other", value: "Other" }
];

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class MoveDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      move_date: null,
      move_time: null,
      pu_address: "",
      address2: "",
      do_address: "",
      contact_comments: "",
      payment_type: "",
      bill_to: ""
    };
  }
  // Context
  static contextType = ContactContext;

  componentDidMount() {
    const contacts = this.context;
    if (contacts.current !== null) {
      this.setState({
        move_date: contacts.current.move_date,
        move_time: contacts.current.move_time,
        pu_address: contacts.current.pu_address,
        address2: contacts.current.address2,
        do_address: contacts.current.do_address,
        contact_comments: contacts.current.contact_comments,
        payment_type: contacts.current.payment_type,
        bill_to: contacts.current.bill_to
      });
    }
  }
  sendState() {
    return this.state;
  }
  isValidated() {
    return true;
  }
  handleDateChange = date => {
    this.setState({ move_date: date });
  };
  handleTimeChange = time => {
    this.setState({ move_time: time });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onPuSuggestSelect = suggest => {
    let address = suggest.gmaps.formatted_address.slice(0, -5);
    this.setState({ pu_address: address });
  };
  onDoSuggestSelect = suggest => {
    let address = suggest.gmaps.formatted_address.slice(0, -5);
    this.setState({ do_address: address });
  };

  render() {
    const {
      move_date,
      move_time,
      pu_address,
      address2,
      do_address,
      contact_comments,
      payment_type,
      bill_to
    } = this.state;
    const { allStates } = this.props;
    if (Object.keys(allStates).length > 0) {
      const { opportunity_details } = this.props.allStates;
      const google = window.google;
      return (
        <>
          {/* Row 1 */}
          <GridContainer alignContent="center">
            <GridItem xs={12} sm={6}>
              <Geosuggest
                placeholder="Choose Pickup Address"
                onSuggestSelect={this.onPuSuggestSelect}
                location={new google.maps.LatLng(33.409035, -111.9873811)}
                radius={20}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <Geosuggest
                placeholder="Choose Dropoff Address"
                onSuggestSelect={this.onDoSuggestSelect}
                location={new google.maps.LatLng(33.409035, -111.9873811)}
                radius={20}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <div style={{ marginTop: "-.7rem" }}>
                <CustomInput
                  navy
                  id="address2"
                  labelText={<span>Address Line 2</span>}
                  onChange={this.onChange}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    name: "address2",
                    value: address2,
                    onChange: this.onChange
                  }}
                />
              </div>
            </GridItem>
          </GridContainer>
          {/* Row 2 */}
          <GridContainer justify="center" alignContent="center">
            <GridItem xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  margin="normal"
                  clearable
                  label={
                    opportunity_details.opportunity_type === "Residential Move"
                      ? "Move Date"
                      : "Delivery Date"
                  }
                  value={move_date}
                  onChange={date =>
                    this.handleDateChange(moment(date).format("MM/DD/YYYY"))
                  }
                  minDate={new Date()}
                  format="MM/dd/yyyy"
                />
              </MuiPickersUtilsProvider>
            </GridItem>
            <GridItem xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  fullWidth
                  autoOk={true}
                  margin="normal"
                  label={
                    opportunity_details.opportunity_type === "Residential Move"
                      ? "Move Time"
                      : "Delivery Time"
                  }
                  mask="__:__ _M"
                  inputValue={move_time}
                  value={move_time}
                  onChange={time =>
                    this.handleTimeChange(moment(time).format("hh:mm A"))
                  }
                />
              </MuiPickersUtilsProvider>
            </GridItem>
          </GridContainer>
          {/* Row 3 */}
          <GridContainer justify="center" alignContent="center">
            <GridItem xs={12} sm={6}>
              <CustomSelect
                fullWidth
                onChange={this.onChange}
                menuItems={pay_types}
                selectedValue={payment_type}
                firstItem={"Select Opportunity Type"}
                name="payment_type"
                label={<span>Select Payment Type</span>}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <CustomInput
                navy
                labelText={<span>Bill To</span>}
                id="bill_to"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  name: "bill_to",
                  value: bill_to,
                  onChange: this.onChange
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12}>
              <CustomInput
                navy
                labelText={<span>Comments</span>}
                id="contact_comments"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  multiline: true,
                  rows: 1,
                  name: "contact_comments",
                  value: contact_comments,
                  onChange: this.onChange
                }}
              />
            </GridItem>
          </GridContainer>
        </>
      );
    } else {
      return null;
    }
  }
}

MoveDetailForm.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(MoveDetailForm);
