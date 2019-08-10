import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import SubmitOppForm from './SubmitOppForm';
import DisplayOppDetails from './components/DisplayOppDetails';
import DisplayMoveDetails from './components/DisplayMoveDetails.js';
import DisplayEstimateDetails from './components/DisplayEstimateDetails.js';

class FinalizeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null,
      finalized: null
    };
  }
  sendState() {
    return this.state;
  }
  isValidated() {
    return true;
  }

  render() {
    const { allStates } = this.props;
    // Check to make sure all forms have been filled out
    if (Object.keys(allStates).length > 2) {
      const {
        opportunity_details,
        move_details,
        estimate_details
      } = this.props.allStates;
      // const { first_name, last_name } = this.props.allStates.opportunity_details;
      return (
        <>
          <GridContainer
            justify="center"
            alignContent="center"
            alignItems="flex-start"
          >
            <GridItem xs={12} sm={4}>
              <DisplayOppDetails opportunity_details={opportunity_details} />
            </GridItem>

            <GridItem xs={12} sm={4}>
              <DisplayMoveDetails move_details={move_details} />
            </GridItem>

            <GridItem xs={12} sm={4}>
              <DisplayEstimateDetails estimate_details={estimate_details} />
            </GridItem>
          </GridContainer>
          <GridContainer
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <SubmitOppForm allStates={this.props.allStates} />
          </GridContainer>
        </>
      );
    } else {
      return null;
    }
  }
}
FinalizeForm.propTypes = {
  classes: PropTypes.object
};
export default FinalizeForm;