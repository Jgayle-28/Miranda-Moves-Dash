import React, { useContext, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/components/Grid/GridContainer.jsx";
import GridItem from "../../components/components/Grid/GridItem.jsx";
import Card from "../../components/components/Card/Card.jsx";
import CardBody from "../../components/components/Card/CardBody.jsx";
import ContactContext from "../../context/contact/ContactContext";
import AuthContext from "../../context/auth/AuthContext";
import MaterialTable from "material-table";
import Spinner from "../utils/Spinner";
import { cardTitle } from "../../assets/jss/material-dashboard-pro-react.jsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import MirandaLogo from "../../assets/img/logos/newPdf_log.jpg";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const Contacts = props => {
  const contactConext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const {
    contacts,
    getContacts,
    deleteContact,
    clearCurrent,
    setCurrent,
    loading
  } = contactConext;
  const { toggleModal } = authContext;
  useEffect(() => {
    getContacts();
  }, []);

  const onEditClick = rowData => {
    setCurrent(rowData);
    // console.log("setCurrent from Table", rowData);
    toggleModal(true);
  };
  const onDelete = rowData => {
    deleteContact(rowData._id);
    // Clears contact being held in current state
    clearCurrent(rowData);
  };
  const generatePdf = rowData => {
    if (rowData.opportunity_type === "Residential Move") {
      console.log(rowData);
      var doc = new jsPDF();

      const logo = MirandaLogo;
      doc.addImage(logo, "JPEG", 15, 6, 38, 12);
      doc.setFontSize(8);
      doc.text("Phone: (480) 899-4117", 137, 8);
      doc.text("Email: customerservice@mirandadelivery.com", 137, 13);

      doc.autoTable({
        body: [
          [
            {
              content: `Estimate Date: ${
                rowData.estimate_date !== null ? rowData.estimate_date : ""
              }`,
              styles: { halign: "left" }
            },
            {
              content: `Estimate Time: ${
                rowData.estimate_time !== null ? rowData.estimate_time : ""
              }`,
              styles: { halign: "center" }
            }
          ]
        ],
        startY: 25
      });

      doc.autoTable({
        headStyles: { fillColor: [5, 48, 83] },

        startY: 35,
        tableWidth: "auto",
        head: [
          [
            {
              content: `${rowData.first_name} ${rowData.last_name}'s Details`,
              colSpan: 5,
              styles: { halign: "center" }
            }
          ]
        ],
        body: [
          ["Customer name:", `${rowData.first_name} ${rowData.last_name}`],
          ["Phone Number:", `${rowData.phone}`],
          ["Alternate Phone Number:", `${rowData.alt_phone}`],
          ["Email:", `${rowData.email}`],
          ["Payment Type:", `${rowData.payment_type}`],
          ["Bill To:", `${rowData.bill_to}`],
          ["Pickup Address:", `${rowData.pu_address} ${rowData.address2}`],
          ["Dropoff Address:", `${rowData.do_address} ${rowData.do_address2}`],
          [
            "Target Move Date:",
            `${rowData.move_date !== null ? rowData.move_date : ""}`
          ],
          ["Actual Move Date:"]
        ]
      });

      doc.autoTable({
        headStyles: { fillColor: [5, 48, 83] },

        startY: 118,
        head: [
          [
            {
              content: "Inventory",
              colSpan: 2,
              // rowSpan: 2,
              styles: { halign: "center" }
            }
          ]
        ]
      });

      doc.autoTable({
        headStyles: { fillColor: [5, 48, 83] },

        startY: 235,
        head: [
          [
            {
              content: "Comments",
              colSpan: 2,
              // rowSpan: 2,
              styles: { halign: "center" }
            }
          ]
        ],
        body: [
          [
            {
              content: `${rowData.contact_comments}`,
              styles: { halign: "center" }
            }
          ]
          // [`${rowData.contact_comments}`]
        ]
      });

      doc.save(`${rowData.first_name}_${rowData.last_name}'s_estimate.pdf`);
    }
    // For every opportunity type besides res move
    else {
      console.log(rowData);
      var doc = new jsPDF();

      const logo = MirandaLogo;
      doc.addImage(logo, "JPEG", 15, 6, 38, 12);
      doc.setFontSize(8);
      doc.text("Phone: (899) 480-4117", 137, 8);
      doc.text("Email: customerservice@mirandadelivery.com", 137, 13);

      doc.autoTable({
        headStyles: { fillColor: [5, 48, 83] },

        startY: 35,
        tableWidth: "auto",
        head: [
          [
            {
              content: `${rowData.first_name} ${rowData.last_name}'s Details`,
              colSpan: 5,
              styles: { halign: "center" }
            }
          ]
        ],
        body: [
          ["Customer name:", `${rowData.first_name} ${rowData.last_name}`],
          ["Phone Number:", `${rowData.phone}`],
          ["Alternate Phone Number:", `${rowData.alt_phone}`],
          ["Email:", `${rowData.email}`],
          ["Payment Type:", `${rowData.payment_type}`],
          ["Bill To:", `${rowData.bill_to}`],
          ["Pickup Address:", `${rowData.pu_address}`],
          ["Dropoff Address:", `${rowData.do_address}`],
          [
            "Delivery Date:",
            `${rowData.move_date !== null ? rowData.move_date : ""}`
          ],
          [
            "Delivery Time:",
            `${rowData.move_time !== null ? rowData.move_time : ""}`
          ]
        ]
      });

      // FOR ITEMS OF DESIGNER, PROD DIST, STORE FROM
      // map through passed in items and create body cells for each
      let body = rowData.items.map((itemObj, i) => [
        itemObj.item_qty,
        itemObj.item
      ]);
      console.log(body);
      doc.autoTable({
        headStyles: { fillColor: [5, 48, 83] },

        startY: 118,
        head: [
          [
            {
              content: "Item(s) Inventory",
              colSpan: 2,
              styles: { halign: "center" }
            }
          ]
        ],
        body: body
      });

      doc.autoTable({
        headStyles: { fillColor: [5, 48, 83] },

        startY: 235,
        head: [
          [
            {
              content: "Comments",
              colSpan: 2,
              // rowSpan: 2,
              styles: { halign: "center" }
            }
          ]
        ],
        body: [
          [
            {
              content: `${rowData.contact_comments}`,
              styles: { halign: "center" }
            }
          ]
          // [`${rowData.contact_comments}`]
        ]
      });

      doc.save(`${rowData.first_name}_${rowData.last_name}'s.pdf`);
    }
  };
  const Description = () => {
    return <Description />;
  };
  const createEstimate = opportunity => {
    props.history.push({
      pathname: "/estimate",
      state: { user: opportunity }
    });
  };

  // console.log("contacts: ", contacts);
  // console.log('props.history', props.history);
  // console.log("contactConext:", contactConext);
  return (
    <>
      {contacts !== null && !loading ? (
        <GridContainer justify="center">
          <GridItem xs={12}>
            <Card>
              <CardBody>
                <MaterialTable
                  title={"Current Opportunities"}
                  data={contactConext.contacts}
                  actions={[
                    {
                      icon: "delete",
                      iconProps: { color: "error", fontSize: "small" },
                      tooltip: "Delete Opportunity",
                      onClick: (e, rowData) => {
                        onDelete(rowData);
                      }
                    },
                    {
                      icon: "edit",
                      iconProps: { color: "action", fontSize: "small" },
                      tooltip: "Edit Opportunity",
                      onClick: (e, rowData) => {
                        onEditClick(rowData);
                      }
                    },
                    {
                      icon: "cloud_download",
                      iconProps: { color: "inherit", fontSize: "small" },
                      tooltip: "Opportunity Pdf",
                      onClick: (e, rowData) => {
                        generatePdf(rowData);
                      }
                    },
                    {
                      icon: "list_alt",
                      iconProps: { color: "primary", fontSize: "small" },
                      tooltip: "Estimate",
                      onClick: (e, rowData) => createEstimate(rowData)
                    }
                  ]}
                  columns={[
                    {
                      title: "First Name",
                      field: "first_name",
                      editable: "never"
                    },
                    {
                      title: "Last Name",
                      field: "last_name",
                      editable: "never"
                    },
                    {
                      title: "Opportunity Type",
                      field: "opportunity_type",
                      editable: "never"
                    },

                    {
                      title: "Phone Number",
                      field: "phone",
                      editable: "never"
                    },

                    {
                      title: "Email",
                      field: "email",
                      editable: "never"
                    },
                    {
                      title: "Estimate Date",
                      field: "estimate_date",
                      editable: "never"
                    },
                    {
                      title: "Estimate Time",
                      field: "estimate_time",
                      editable: "never"
                    },
                    {
                      title: "Refered By",
                      field: "refered_by",
                      editable: "never"
                    },
                    {
                      title: "Move Date",
                      field: "move_date",
                      type: "datetime",
                      editable: "never"
                    },
                    {
                      title: "Move Time",
                      field: "move_time",
                      type: "datetime",
                      editable: "never"
                    }
                  ]}
                  options={{
                    exportButton: true,
                    grouping: true
                  }}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default withStyles(styles)(Contacts);
