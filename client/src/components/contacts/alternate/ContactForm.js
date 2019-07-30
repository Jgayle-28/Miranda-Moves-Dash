import React, { useState, useContext, useEffect } from 'react';
import CustomInput from '../../../components/components/CustomInput/CustomInput.jsx';
import CustomSelect from '../../../components/components/Selects/CustomSelect.jsx';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

import ContactContext from '../../../context/contact/ContactContext';
import AuthContext from '../../../context/auth/AuthContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { toggleModal } = authContext;

  useEffect(() => {
    if (contactContext.current !== null) {
      setContact(contactContext.current);
    } else {
      setContact({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        phoneext: '',
        phonetype: '',
        referedby: '',
        movedate: '',
        contactcomments: ''
      });
    }
  }, [contactContext, contactContext.current]);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [contact, setContact] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    phoneext: '',
    phonetype: '',
    referedby: '',
    movedate: '',
    contactcomments: ''
  });

  const {
    firstname,
    lastname,
    email,
    phone,
    phonetype,
    phoneext,
    referedby,
    movedate,
    contactcomments
  } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (contactContext.current === null) {
      if (contact.movedate === '') {
        contact.movedate = selectedDate;
      }

      contactContext.addContact(contact);
      toggleModal(false);
      console.log(contact);
    } else {
      contactContext.updateContact(contact);
      toggleModal(false);
    }

    setContact({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      phoneext: '',
      phonetype: '',
      referedby: '',
      movedate: '',
      contactcomments: ''
    });
  };

  const clearAll = () => {
    contactContext.clearCurrent();
  };

  const type_list = [
    { label: 'Mobile', value: 'Mobile' },
    { label: 'Home', value: 'Home' },
    { label: 'Work', value: 'Work' }
  ];

  return (
    <>
      {/* <div
        style={{
          textAlign: 'right',
          fontSize: '20px',
          margin: '1rem 1.25rem 0 0'
        }}
      >
        <i
          class="fas fa-times"
          style={{ color: '#4B515D', cursor: 'pointer' }}
          onClick={() => toggleModal(false)}
        />
      </div> */}
      <form onSubmit={onSubmit} style={{ margin: '1.5rem', zIndex: 99999 }}>
        <h2 style={{ color: '#3F729B' }} className="">
          <i
            className={
              contactContext.current ? 'fas fa-user-edit' : 'fas fa-user-plus'
            }
          />{' '}
          {contactContext.current ? ' Edit Contact' : ' Add New Contact'}
        </h2>
        <div className="grid-2">
          <div>
            <CustomInput
              navy
              // error={this.state.emailBool}
              // helpText={errors.email}
              labelText="First Name"
              id="firstname"
              onChange={onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <Email className={classes.inputAdornmentIcon} />
                //   </InputAdornment>
                // ),
                type: 'text',
                // placeholder: 'First Name',
                name: 'firstname',
                value: firstname,
                onChange: onChange
              }}
            />

            <CustomInput
              navy
              // error={this.state.emailBool}
              // helpText={errors.email}
              labelText="Last Name"
              id="lastname"
              onChange={onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <Email className={classes.inputAdornmentIcon} />
                //   </InputAdornment>
                // ),
                type: 'text',
                // placeholder: 'First Name',
                name: 'lastname',
                value: lastname,
                onChange: onChange
              }}
            />
            <CustomInput
              navy
              // error={this.state.emailBool}
              // helpText={errors.email}
              labelText="Email"
              id="email"
              onChange={onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <Email className={classes.inputAdornmentIcon} />
                //   </InputAdornment>
                // ),
                type: 'email',
                // placeholder: 'First Name',
                name: 'email',
                value: email,
                onChange: onChange
              }}
            />
            <CustomInput
              navy
              // error={this.state.emailBool}
              // helpText={errors.email}
              labelText="Refered By"
              id="refered by"
              onChange={onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <Email className={classes.inputAdornmentIcon} />
                //   </InputAdornment>
                // ),
                type: 'text',
                // placeholder: 'First Name',
                name: 'referedby',
                value: referedby,
                onChange: onChange
              }}
            />
          </div>
          {/* Right Side */}
          <div>
            <CustomInput
              navy
              // error={this.state.emailBool}
              // helpText={errors.email}
              labelText="Phone Number"
              id="phone"
              onChange={onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <Email className={classes.inputAdornmentIcon} />
                //   </InputAdornment>
                // ),
                type: 'text',
                // placeholder: 'First Name',
                name: 'phone',
                value: phone,
                onChange: onChange
              }}
            />
            <CustomSelect
              fullWidth
              onChange={onChange}
              menuItems={type_list}
              selectedValue={phonetype}
              firstItem={'Select Phone Type'}
              name="phonetype"
              label={'Select Phone Type'}
            />
            <CustomInput
              navy
              // error={this.state.emailBool}
              // helpText={errors.email}
              labelText="Phone Extension"
              id="phoneext"
              onChange={onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <Email className={classes.inputAdornmentIcon} />
                //   </InputAdornment>
                // ),
                type: 'text',
                // placeholder: 'First Name',
                name: 'phoneext',
                value: phoneext,
                onChange: onChange
              }}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="mui-pickers-date"
                label="Move Date"
                value={selectedDate}
                onChange={date => handleDateChange(date)}
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div>
          <CustomInput
            navy
            // error={this.state.emailBool}
            // helpText={errors.email}
            labelText="Customer Comments"
            id="contactcomments"
            onChange={onChange}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              // endAdornment: (
              //   <InputAdornment position="end">
              //     <Email className={classes.inputAdornmentIcon} />
              //   </InputAdornment>
              // ),
              type: 'text',
              multiline: true,
              rows: 2,
              name: 'contactcomments',
              value: contactcomments,
              onChange: onChange
            }}
          />
        </div>

        {/* <input
          type="text"
          placeholder="First name"
          name="firstname"
          value={firstname}
          onChange={onChange}
        /> */}

        {/* <input
          type="text"
          placeholder="Last name"
          name="lastname"
          value={lastname}
          onChange={onChange}
        /> */}

        {/* <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        /> */}
        {/* <input
          type="text"
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone number"
          name="phone"
          value={phone}
          onChange={onChange}
        /> */}
        {/* <select
          name="phonetype"
          value={phonetype}
          onChange={onChange}
          className="select-css"
        >
          <option value="0">Select Phone Type</option>
          <option value="Mobile">Mobile</option>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
        </select> */}

        {/* <input
          type="text"
          placeholder="Phone extension"
          name="phoneext"
          value={phoneext}
          onChange={onChange}
        /> */}
        {/* <input
          style={{ marginBottom: '.5rem' }}
          type="text"
          placeholder="Refered by"
          name="referedby"
          value={referedby}
          onChange={onChange}
        /> */}
        {/* <label className="date-label" htmlFor="movedate">
          Move Date
        </label>
        <input
          style={{ marginTop: '.5rem' }}
          className="date-picker"
          type="date"
          placeholder="Move date"
          name="movedate"
          value={movedate}
          onChange={onChange}
        /> */}
        {/* <textarea
          placeholder="Customer comments"
          name="contactcomments"
          value={contactcomments}
          onChange={onChange}
        /> */}
        <div>
          <input
            style={{ backgroundColor: '#78909c', color: '#fff' }}
            type="submit"
            value={
              contactContext.current ? ' Update Contact' : ' Add New Contact'
            }
            className="btn btn-block"
          />
        </div>
        {/* {contactContext.current && (
          <div>
            <button className="bnt btn-light btn-block" onClick={clearAll}>
              Clear
            </button>
          </div>
        )} */}
      </form>
    </>
  );
};

export default ContactForm;
