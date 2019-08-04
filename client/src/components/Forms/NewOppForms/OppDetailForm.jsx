import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/icons
import Face from '@material-ui/icons/Face';
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver';
import Email from '@material-ui/icons/Email';
import Phone from '@material-ui/icons/Phone';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
// core components
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import CustomSelect from '../../../components/components/Selects/CustomSelect.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  inputAdornment: {
    position: 'relative'
  }
};
const opp_list = [
  { label: 'Residential Move', value: 'Residential Move' },
  { label: 'Designer', value: 'Designer' },
  { label: 'Store Front', value: 'Store Front' },
  { label: 'Store Front', value: 'Store Front' }
];
const phone_list = [
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Home', value: 'Home' },
  { label: 'Work', value: 'Work' }
];

class OppDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunity_type: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      phone_type: '',
      phone_ext: '',
      refered_by: '',
      first_nameState: '',
      last_nameState: '',
      phoneState: ''
    };
  }

  sendState() {
    console.log('step1 state ', this.state);
    return this.state;
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case 'email':
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'length':
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.first_nameState === 'success' &&
      this.state.last_nameState === 'success' &&
      this.state.phoneState === 'success'
    ) {
      return true;
    } else {
      if (this.state.first_nameState !== 'success') {
        this.setState({ first_nameState: 'error' });
      }
      if (this.state.last_nameState !== 'success') {
        this.setState({ last_nameState: 'error' });
      }
      if (this.state.phoneState !== 'success') {
        this.setState({ phoneState: 'error' });
      }
    }
    return false;
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const {
      opportunity_type,
      first_name,
      last_name,
      email,
      phone,
      phone_type,
      phone_ext,
      refered_by
    } = this.state;
    return (
      <GridContainer justify="center">
        {/* Row 1 */}
        <GridItem xs={12} sm={6}>
          <CustomSelect
            fullWidth
            onChange={this.onChange}
            menuItems={opp_list}
            selectedValue={opportunity_type}
            firstItem={'Select Opportunity Type'}
            name="opportunity_type"
            label={'Select Opportunity Type'}
          />
          <CustomInput
            navy
            success={this.state.first_nameState === 'success'}
            error={this.state.first_nameState === 'error'}
            labelText={
              <span>
                First Name <small>(required)</small>
              </span>
            }
            id="first_name"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'first_name', 'length', 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
              type: 'text',
              name: 'first_name',
              value: first_name
            }}
          />
          <CustomInput
            navy
            success={this.state.last_nameState === 'success'}
            error={this.state.last_nameState === 'error'}
            labelText={
              <span>
                Last Name <small>(required)</small>
              </span>
            }
            id="last_name"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'last_name', 'length', 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <RecordVoiceOver className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
              type: 'text',
              name: 'last_name',
              value: last_name
            }}
          />
          <CustomInput
            navy
            id="email"
            labelText={<span>Email</span>}
            onChange={this.onChange}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
              autoComplete: false,
              type: 'email',
              name: 'email',
              value: email,
              onChange: this.onChange
            }}
          />
        </GridItem>
        {/* Row 2 */}
        <GridItem xs={12} sm={6}>
          <CustomInput
            navy
            labelText="Refered By"
            id="refered_by"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              autoComplete: false,
              type: 'text',
              name: 'refered_by',
              value: refered_by,
              onChange: this.onChange
            }}
          />
          <CustomInput
            navy
            success={this.state.phoneState === 'success'}
            error={this.state.phoneState === 'error'}
            labelText={
              <span>
                Phone Number <small>(required)</small>
              </span>
            }
            id="phone"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'phone', 'length', 10),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Phone className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
              type: 'text',
              name: 'phone',
              value: phone
            }}
          />
          <CustomSelect
            fullWidth
            onChange={this.onChange}
            menuItems={phone_list}
            selectedValue={phone_type}
            firstItem={'Select Phone Type'}
            name="phone_type"
            label={'Select Phone Type'}
          />
          <CustomInput
            navy
            labelText={<span>Phone Ext</span>}
            id="phone_ext"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              autoComplete: false,
              type: 'text',
              name: 'phone_ext',
              value: phone_ext,
              onChange: this.onChange
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

OppDetailForm.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(OppDetailForm);
