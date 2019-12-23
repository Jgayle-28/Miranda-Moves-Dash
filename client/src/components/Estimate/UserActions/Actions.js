import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import LocalShipping from "@material-ui/icons/LocalShipping";
import NotInterested from "@material-ui/icons/NotInterested";

import ContactContext from "../../../context/contact/ContactContext";

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextType = ContactContext;
  clearInventory = () => {
    const { user } = this.props;
    const contacts = this.context;
    const contact = {
      _id: user._id,
      inventory: []
    };
    contacts.updateContact(contact);
    this.props.updateUser(user._id);
    console.log("called props update user");
  };
  render() {
    // console.log("USER FROM ACTIONS", this.props.user);
    return (
      <>
        <GridContainer justify="center" style={{ marginTop: "2rem" }}>
          <GridItem xs={12} sm={12} md={2}>
            <Button
              color="info"
              size="lg"
              style={{
                background: "linear-gradient(-137deg, #000046 0%, #1CB5E0 100%)"
              }}
            >
              <LocalShipping /> Send To Dispatch
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Button
              color="warning"
              size="lg"
              style={{
                background: "linear-gradient(-137deg, #F2994A 0%, #F2C94C 100%)"
              }}
              onClick={this.clearInventory}
            >
              <NotInterested /> Clear Inventory
            </Button>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}
export default Actions;
