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
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import customSelectStyle from '../../../assets/jss/material-dashboard-pro-react/customSelectStyle.jsx';
import customCheckboxRadioSwitch from '../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx';
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
      estimate_date: new Date(),
      estimate_time: new Date()
    };
  }
  sendState() {
    console.log('step3 state ', this.state);
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
  render() {
    const { classes } = this.props;
    const { estimate_date, estimate_time } = this.state;
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
                onChange={date => this.handleDateChange(date)}
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
                label="Estimate Time"
                mask="__:__ _M"
                value={estimate_time}
                onChange={time => this.handleTimeChange(time)}
              />
            </MuiPickersUtilsProvider>
            {/* <CustomInput
              navy
              id="estimate_time"
              labelText={<span>Estimate Time</span>}
              onChange={this.onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                autoComplete: false,
                type: 'text',
                name: 'estimate_time',
                value: estimate_time,
                onChange: this.onChange
              }}
            /> */}
          </GridItem>
        </GridContainer>
      </>
    );
  }
}
MoveDetailForm.propTypes = {
  classes: PropTypes.object
};
export default withStyles(style)(MoveDetailForm);
