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
import ContactContext from '../../../context/contact/ContactContext';

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
  { label: 'Product Distribution', value: 'Product Distribution' }
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
  static contextType = ContactContext;

  componentDidMount() {
    const contacts = this.context;
    if (contacts.current !== null) {
      this.setState({
        _id: contacts.current._id,
        opportunity_type: contacts.current.opportunity_type,
        first_name: contacts.current.first_name,
        last_name: contacts.current.last_name,
        email: contacts.current.email,
        phone: contacts.current.phone,
        phone_type: contacts.current.phone_type,
        phone_ext: contacts.current.phone_ext,
        refered_by: contacts.current.refered_by
      });
    }
    // if (this.state.opportunity_type !== '') {
    //   this.props.setOppType(this.state.opportunity_type);
    // }
  }

  sendState() {
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
    // Changes format of phone number before setting state
    if (event.target.name === 'phone') {
      event.target.value = event.target.value
        .replace(/[^\d]+/g, '')
        .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
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
            label={
              <span>
                Select Opportunity Type <small>(required)</small>
              </span>
            }
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
              fullWidth: true,
              required: true
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
              required: true,
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
              fullWidth: true,
              required: true
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
              required: true,
              type: 'text',
              name: 'last_name',
              value: last_name
            }}
          />
          <CustomInput
            navy
            id="email"
            labelText={
              <span>
                Email <small>(required)</small>
              </span>
            }
            onChange={this.onChange}
            formControlProps={{
              fullWidth: true,
              required: true
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
              required: true,
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
              fullWidth: true,
              required: true
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
              required: true,
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
