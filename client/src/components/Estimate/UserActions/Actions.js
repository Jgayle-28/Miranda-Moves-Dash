import React, { Component } from "react";
import LocalShipping from "@material-ui/icons/LocalShipping";
import NotInterested from "@material-ui/icons/NotInterested";

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // console.log("USER FROM ACTIONS", this.props.user);
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.5rem"
          }}
        >
          {/* DISPATCH */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "5px",
              background: "linear-gradient(-137deg, #000046 0%, #1CB5E0 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#ffffff",
              marginRight: "1rem",
              cursor: "pointer"
            }}
          >
            <LocalShipping />
            <p
              style={{
                letterSpacing: ".5px"
                // fontWeight: "300"
              }}
            >
              Dispatch
            </p>
          </div>
          {/* CLEAR INVENTORY */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "5px",
              background: "linear-gradient(-137deg, #F2994A 0%, #F2C94C 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#ffffff",
              marginLeft: "1rem",
              cursor: "pointer"
            }}
          >
            <NotInterested />
            <span
              style={{
                letterSpacing: ".5px"
                // fontWeight: "300"
              }}
            >
              Clear
            </span>
            <span
              style={{
                letterSpacing: ".5px"
                // fontWeight: "300"
              }}
            >
              Inventory
            </span>
          </div>
        </div>
      </>
    );
  }
}
export default Actions;
