import React from "react";
import GridItem from "../components/Grid/GridItem.jsx";
import Card from "../components/Card/Card.jsx";
import Description from "@material-ui/icons/Description";

const EstimateHeader = ({ user }) => {
  return (
    <>
      <GridItem xs={12} sm={12} md={11}>
        <Card
          style={{
            padding: "1rem",
            marginBottom: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            color: "#FFFFFF",
            background: "linear-gradient(-137deg, #bdc3c7 0%, #2c3e50 100%)"
          }}
        >
          <Description
            style={{ fontSize: "30px", padding: "0", margin: "0 .5rem" }}
          />
          <p
            style={{
              fontWeight: "300",
              fontSize: "16px"
            }}
          >
            {" "}
            <span
              style={{
                margin: "0 .5rem 1rem 1rem"
              }}
            >
              {user.first_name} {user.last_name}
            </span>{" "}
            //{" "}
            <span
              style={{
                margin: "0 .5rem 1rem"
              }}
            >
              {user.phone}
            </span>{" "}
            //{" "}
            <span
              style={{
                margin: "0 .5rem 1rem"
              }}
            >
              {user.email}
            </span>
          </p>
        </Card>
      </GridItem>
    </>
  );
};

export default EstimateHeader;
