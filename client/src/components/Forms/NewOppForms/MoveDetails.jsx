import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
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
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import customSelectStyle from '../../../assets/jss/material-dashboard-pro-react/customSelectStyle.jsx';
import customCheckboxRadioSwitch from '../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx';
import moment from 'moment';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import PuAddressInput from './components/PuAddressInput';

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
      move_date: null,
      move_time: null,
      pu_address: '',
      do_address: '',
      contact_comments: ''
    };
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
  handleChange = pu_address => {
    this.setState({ pu_address });
  };

  handleSelect = pu_address => {
    geocodeByAddress(pu_address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    const {
      move_date,
      move_time,
      pu_address,
      do_address,
      contact_comments
    } = this.state;
    return (
      <>
        <GridContainer justify="center" alignContent="center">
          {/* Row 1 */}
          <GridItem xs={12} sm={6}>
            <PuAddressInput />
            {/* <CustomInput
              navy
              id="pu_address"
              labelText={<span>Pickup Address</span>}
              onChange={this.onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'text',
                name: 'pu_address',
                value: pu_address,
                onChange: this.onChange
              }}
            /> */}

            {/* <PlacesAutocomplete
              value={this.state.pu_address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input'
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete> */}

            <CustomInput
              navy
              id="do_address"
              labelText={<span>Drop Off Address</span>}
              onChange={this.onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
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
                clearable
                label="Move Date"
                value={move_date}
                // placeholder="10/10/2018"
                onChange={date =>
                  this.handleDateChange(moment(date).format('MM/DD/YYYY'))
                }
                minDate={new Date()}
                format="MM/dd/yyyy"
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                autoOk={true}
                margin="normal"
                label="Move Time"
                mask="__:__ _M"
                inputValue={move_time}
                value={move_time}
                onChange={time =>
                  this.handleTimeChange(moment(time).format('hh:mm A'))
                }
              />
            </MuiPickersUtilsProvider>
          </GridItem>
          <GridItem xs={12} sm={12}>
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
