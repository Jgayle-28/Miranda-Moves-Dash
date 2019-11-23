import React, { useContext, useEffect, useState } from "react";
import ContactContext from "../../context/contact/ContactContext";
import { makeStyles } from "@material-ui/core/styles";
import Assignment from "@material-ui/icons/Assignment";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import AssignmentReturned from "@material-ui/icons/AssignmentReturned";
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import EstimateHeader from "./EstimateHeader";
import EstimateNavPills from "../components/NavPills/EstimateNavPills";
// Panel components
import Inventory from "./Inventory";
import Supplies from "./SuppliesServices/index.js";
import Finalize from "./Finalize";
import Actions from "./UserActions/Actions";

class Estimate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      inventory: []
    };
  }
  static contextType = ContactContext;

  // TODO convert to rcc, call getContact on mount, set user to state, on update of child compoents call getContact through passed in prop and update contact thus updating user in all children components
  componentDidMount() {
    const contacts = this.context;
    // console.log("contacts:", contacts);
    const { user } = this.props.location.state;
    // Sets inventory on initial load for components
    if (user.inventory !== this.state.inventory) {
      this.setState({ inventory: user.inventory });
    }
    // Call focus contact
    contacts.getContact(user._id);
    if (contacts.focusContact !== null) {
      this.setState({ user: contacts.focusContact });
    } else {
      this.setState({ user: user });
    }
  }
  componentDidUpdate() {
    const contacts = this.context;
    // console.log("contacts:", contacts);
    // Sets focus contact to load in other components
    if (contacts.focusContact !== null) {
      if (contacts.focusContact !== this.state.user) {
        this.setState({ user: contacts.focusContact });
      }
    }
  }
  componentWillUnmount() {
    const contacts = this.context;
    contacts.clearFocus();
  }
  // Updates inventory live so the other components can update with it
  setInventory = inventory => {
    this.setState({ inventory: inventory });
    // console.log("INVENTORY CALLED");
  };
  // Calls focus contact and causes update so other components can update
  updateUser = userid => {
    const contacts = this.context;
    contacts.getContact(userid);
    // TODO maybe set state to user with focus contact - works with out it right now though
  };

  render() {
    const { user } = this.props.location.state;
    // console.log("USER", this.state.user);
    // console.log("INVENTORY FROM ESTIMATE CONTAINER", inventory);
    return (
      <>
        {/* <Fab
        color="primary"
        aria-label="Add"
        // className={classes.fab}
        style={{
          backgroundColor: '#90A4AE',
          color: 'white',
          margin: '1rem',
          zIndex: 9,
          position: 'fixed',
          top: '6rem',
          left: '1.2rem'
        }}
        onClick={() => this.props.history.goBack()}
      >
        <KeyboardBackspace />
      </Fab> */}
        <GridContainer justify="center">
          {/***** ESTIMATE HEADER ******/}
          <EstimateHeader user={user} />
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={11}>
            <EstimateNavPills
              user={user}
              color="grey"
              alignCenter
              tabs={[
                // {/***** INVENTORY COMPONENT ******/}
                {
                  tabButton: "Inventory",
                  tabIcon: Assignment,
                  tabContent: (
                    <Inventory
                      user={user}
                      updateInventory={this.setInventory}
                      updateUser={this.updateUser}
                    />
                  )
                },
                // {/***** SUPPLIES & SERVICES COMPONENT ******/}
                {
                  tabButton: "Services",
                  tabIcon: AssignmentInd,
                  tabContent: (
                    <Supplies
                      user={this.state.user}
                      // user={
                      //   this.state.user !== null
                      //     ? this.state.user
                      //     : this.props.location.state.user
                      // }
                      inventory={this.state.inventory}
                      updateUser={this.updateUser}
                    />
                  )
                },
                // {/***** FINALIZE COMPONENT ******/}
                {
                  tabButton: "Finalize",
                  tabIcon: AssignmentTurnedIn,
                  tabContent: <Finalize user={this.state.user} />
                },
                // {/***** Actions COMPONENT ******/}
                {
                  tabButton: "Actions",
                  tabIcon: AssignmentReturned,
                  tabContent: <Actions user={this.state.user} />
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </>
    );
  }
}
export default Estimate;

// OLD LAYOUT
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
// import Fab from "@material-ui/core/Fab";

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%",
//     marginTop: "1rem"
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     flexBasis: "33.33%",
//     flexShrink: 0
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary
//   }
// }));

// const classes = useStyles();
// const [expanded, setExpanded] = React.useState(false);

// const handleChange = panel => (event, isExpanded) => {
//   setExpanded(isExpanded ? panel : false);
// };

//  <div className={classes.root}>
//    <ExpansionPanel
//      expanded={expanded === "panel1"}
//      onChange={handleChange("panel1")}
//    >
//      <ExpansionPanelSummary
//        expandIcon={<ExpandMoreIcon />}
//        aria-controls="panel1bh-content"
//        id="panel1bh-header"
//      >
//        <Typography className={classes.heading}>Inventory</Typography>
//        <Typography className={classes.secondaryHeading}>
//          Create {user.first_name} {user.last_name}'s Inventory
//        </Typography>
//      </ExpansionPanelSummary>
//      <ExpansionPanelDetails>
//        {/***** INVENTORY COMPONENT ******/}
//        <Inventory user={user} />
//      </ExpansionPanelDetails>
//    </ExpansionPanel>
//    <ExpansionPanel
//      expanded={expanded === "panel2"}
//      onChange={handleChange("panel2")}
//    >
//      <ExpansionPanelSummary
//        expandIcon={<ExpandMoreIcon />}
//        aria-controls="panel2bh-content"
//        id="panel2bh-header"
//      >
//        <Typography className={classes.heading}>Supplies / Services</Typography>
//        <Typography className={classes.secondaryHeading}>
//          Add {user.first_name} {user.last_name}'s Supplies & services rendered
//        </Typography>
//      </ExpansionPanelSummary>
//      <ExpansionPanelDetails>
//        {/***** SUPPLIES & SERVICES COMPONENT ******/}
//        <Supplies user={user} />
//      </ExpansionPanelDetails>
//    </ExpansionPanel>
//    <ExpansionPanel
//      expanded={expanded === "panel3"}
//      onChange={handleChange("panel3")}
//    >
//      <ExpansionPanelSummary
//        expandIcon={<ExpandMoreIcon />}
//        aria-controls="panel3bh-content"
//        id="panel3bh-header"
//      >
//        <Typography className={classes.heading}>Finalize</Typography>
//        <Typography className={classes.secondaryHeading}>
//          Please Confirms {user.first_name} {user.last_name}'s estimate
//        </Typography>
//      </ExpansionPanelSummary>
//      <ExpansionPanelDetails>
//        <Typography>
//          <h1>Display pdf and confirmation details here</h1>
//        </Typography>
//      </ExpansionPanelDetails>
//    </ExpansionPanel>
//    <ExpansionPanel
//      expanded={expanded === "panel4"}
//      onChange={handleChange("panel4")}
//    >
//      <ExpansionPanelSummary
//        expandIcon={<ExpandMoreIcon />}
//        aria-controls="panel4bh-content"
//        id="panel4bh-header"
//      >
//        <Typography className={classes.heading}>Actions</Typography>
//      </ExpansionPanelSummary>
//      <ExpansionPanelDetails>
//        <Typography>
//          <h1>Add actions here?</h1>
//        </Typography>
//      </ExpansionPanelDetails>
//    </ExpansionPanel>
//  </div>;
