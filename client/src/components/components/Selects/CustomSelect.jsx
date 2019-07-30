import React from 'react';

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// core components
import PropTypes from 'prop-types';
import styles from '../../../assets/jss/material-dashboard-pro-react/components/customSelectStyle';

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.changeParentState(event);
  };

  render() {
    const {
      classes,
      selectedValue,
      onChange,
      label,
      name,
      firstItem,
      menuItems,
      isDisabled
    } = this.props;
    return (
      <FormControl fullWidth className={classes.selectFormControl}>
        <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
          {label}
        </InputLabel>
        <Select
          style={{ zIndex: 9999999 }}
          disabled={isDisabled ? isDisabled : null}
          MenuProps={{
            className: classes.selectMenu
          }}
          classes={{
            select: classes.select
          }}
          value={selectedValue}
          onChange={onChange}
          inputProps={{
            name: name,
            id: name
          }}
        >
          {typeof firstItem !== 'undefined' && (
            <MenuItem
              style={{ zIndex: 9999999 }}
              disabled
              classes={{
                root: classes.selectMenuItem
              }}
            >
              {firstItem}
            </MenuItem>
          )}
          {menuItems.map((item, key) => {
            return (
              <MenuItem
                style={{ zIndex: 9999999 }}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                key={key}
                value={item.value}
              >
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}
CustomSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  firstItem: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired
};
export default withStyles(styles)(CustomSelect);
