import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import SubmitOppForm from './SubmitOppForm';

class FinalizeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null,
      finalized: null
    };
  }
  sendState() {
    console.log('step3 state ', this.state);
    return this.state;
  }
  isValidated() {
    return true;
  }

  render() {
    return (
      <GridContainer justify="center">
        {/* Row 1 */}
        <GridItem xs={12} sm={6}>
          display data from forms here
        </GridItem>
        {/* Row 2 */}
        <GridItem xs={12} sm={6}>
          display data from forms here
        </GridItem>
        <GridItem xs={12} sm={12}>
          <SubmitOppForm allStates={this.props.allStates} />
        </GridItem>
      </GridContainer>
    );
  }
}
FinalizeForm.propTypes = {
  classes: PropTypes.object
};
export default FinalizeForm;
