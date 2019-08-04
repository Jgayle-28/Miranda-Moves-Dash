import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
// core components
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
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
      move_date: new Date(),
      pu_address: '',
      do_address: '',
      contact_comments: ''
    };
  }
  sendState() {
    console.log('step2 state ', this.state);
    return this.state;
  }
  isValidated() {
    return true;
  }
  handleDateChange = date => {
    this.setState({ move_date: date });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const { move_date, pu_address, do_address, contact_comments } = this.state;
    return (
      <>
        <GridContainer justify="center">
          {/* Row 1 */}
          <GridItem xs={12} sm={6}>
            <CustomInput
              navy
              id="pu_address"
              labelText={<span>Pickup Address</span>}
              onChange={this.onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                autoComplete: false,
                type: 'text',
                name: 'pu_address',
                value: pu_address,
                onChange: this.onChange
              }}
            />
            <CustomInput
              navy
              id="do_address"
              labelText={<span>Drop Off Address</span>}
              onChange={this.onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                autoComplete: false,
                type: 'text',
                name: 'do_address',
                value: do_address,
                onChange: this.onChange
              }}
            />
          </GridItem>
          {/* Row 2 */}
          <GridItem xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="mui-pickers-date"
                label="Move Date"
                value={move_date}
                onChange={date => this.handleDateChange(date)}
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
            <CustomInput
              navy
              labelText={<span>Opportunity Comments</span>}
              id="contact_comments"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'text',
                multiline: true,
                rows: 1,
                name: 'contact_comments',
                value: contact_comments,
                onChange: this.onChange
              }}
            />
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
