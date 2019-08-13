import React from 'react';
// @material-ui/core components
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
// core components
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import PropTypes from 'prop-types';
import Button from '../../components/CustomButtons/Button.jsx';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import customSelectStyle from '../../../assets/jss/material-dashboard-pro-react/customSelectStyle.jsx';
import customCheckboxRadioSwitch from '../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx';
import moment from 'moment';
import ContactContext from '../../../context/contact/ContactContext';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import uuid from 'uuid';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  choiche: {
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px'
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class MoveDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estimate_date: null,
      estimate_time: null,
      opportunity_type: '',
      item: '',
      item_qty: '',
      items: []
    };
  }
  static contextType = ContactContext;

  componentDidMount() {
    const contacts = this.context;
    if (contacts.current !== null) {
      this.setState({
        estimate_date: contacts.current.estimate_date,
        estimate_time: contacts.current.estimate_time
      });
    }
  }
  componentDidUpdate() {
    const { allStates } = this.props;
    // this sets state for conditional rendering of estimate or item details
    // If props opp type not equal to state opptype set to props opp type
    if (
      Object.keys(allStates).length > 1 &&
      allStates.opportunity_details.opportunity_type !==
        this.state.opportunity_type
    ) {
      this.setState({
        opportunity_type: allStates.opportunity_details.opportunity_type
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
    this.setState({ estimate_date: date });
  };
  handleTimeChange = time => {
    this.setState({ estimate_time: time });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  addItem = () => {
    let itemArr = [...this.state.items];
    let itemObj = {
      item_qty: this.state.item_qty,
      item: this.state.item
    };
    itemArr.push(itemObj);
    console.log(itemArr);
    this.setState({
      items: itemArr,
      item: '',
      item_qty: ''
    });
  };
  render() {
    const { estimate_date, estimate_time } = this.state;
    const { allStates } = this.props;
    // Check to make sure all forms have been filled out
    if (this.state.opportunity_type === 'Residential Move') {
      // if (

      // ) {
      return (
        <>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6}>
              {/* Row 1 */}

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="mui-pickers-date"
                  label="Estimate Date"
                  value={estimate_date}
                  onChange={date =>
                    this.handleDateChange(moment(date).format('MM/DD/YYYY'))
                  }
                  format="MM/dd/yyyy"
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </GridItem>
            {/* Row 2 */}
            <GridItem xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  autoOk={true}
                  margin="normal"
                  label="Estimate Time"
                  mask="__:__ _M"
                  inputValue={estimate_time}
                  value={estimate_time}
                  onChange={time =>
                    this.handleTimeChange(moment(time).format('hh:mm A'))
                  }
                />
              </MuiPickersUtilsProvider>
            </GridItem>
          </GridContainer>
        </>
      );
      // } else {
      //   return <h1>Item Form</h1>;
      // }
    } else {
      return (
        <>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6}>
              <CustomInput
                navy
                labelText={<span>Add Item To Be Delivered</span>}
                id="item"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: this.onChange,
                  type: 'text',
                  name: 'item',
                  value: this.state.item
                }}
              />
              <CustomInput
                navy
                labelText={<span>Add Item Quantity</span>}
                id="item_qty"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: this.onChange,
                  type: 'text',
                  name: 'item_qty',
                  value: this.state.item_qty
                }}
              />
              <Button color="navy" onClick={this.addItem}>
                Add Item
              </Button>
            </GridItem>
            <GridItem xs={12} sm={6}>
              <h3 style={{ textAlign: 'left', marginTop: '1rem' }}>
                Items to be picked up / delivered
              </h3>
              {this.state.items.map((item, i) => (
                <li key={i} id={i}>
                  {item.item_qty} - {item.item}
                </li>
              ))}
            </GridItem>
          </GridContainer>
        </>
      );
    }
  }
}
MoveDetailForm.propTypes = {
  classes: PropTypes.object
};
export default withStyles(style)(MoveDetailForm);
