import React, { Component } from "react";
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import CloudDownload from "@material-ui/icons/CloudDownload";
import jsPDF from "jspdf";
import "jspdf-autotable";
import MirandaLogo from "../../assets/img/logos/newPdf_log.jpg";
import signature from "../../assets/img/signature.jpg";

class Finalize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    this.setState({ user: this.props.user });
  }
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ user: this.props.user });
    }
  }
  generatePdf = () => {
    const { user } = this.props;

    const Signature = signature;
    var doc = new jsPDF();
    // LOGO & INFO
    const logo = MirandaLogo;
    doc.addImage(logo, "JPEG", 15, 6, 38, 12);
    doc.setFontSize(8);
    doc.text("Phone: (480) 899-4117", 137, 8);
    doc.text("Email: customerservice@mirandadelivery.com", 137, 13);

    // doc.fromHTML(document.getElementById("info-table"), 5, 90);

    doc.autoTable({
      startY: 23,
      html: "#info-table",
      useCss: true
    });
    let finalY = doc.previousAutoTable.finalY;
    doc.autoTable({
      // startY: 63,
      startY: finalY + 3,
      html: "#move-detail-table",
      useCss: true
    });
    finalY = doc.previousAutoTable.finalY;
    doc.autoTable({
      startY: finalY + 3,
      html: "#move-total-table",
      useCss: true
    });
    finalY = doc.previousAutoTable.finalY;
    if (user.moveServices.packing.packingItems.length !== 0) {
      doc.autoTable({
        startY: finalY + 3,
        html: "#move-packing-table",
        useCss: true
      });
    }
    finalY = doc.previousAutoTable.finalY;
    if (user.moveServices.fees.length !== 0) {
      doc.autoTable({
        startY: finalY + 3,
        html: "#move-fees-table",
        useCss: true
      });
    }
    finalY = doc.previousAutoTable.finalY;
    if (user.moveServices.storage.storageItems.length !== 0) {
      doc.autoTable({
        startY: finalY + 3,
        html: "#move-storage-table",
        useCss: true
      });
    }
    finalY = doc.previousAutoTable.finalY;
    if (user.moveServices.additionalServices.addservices.length !== 0) {
      doc.autoTable({
        startY: finalY + 3,
        html: "#move-addService-table",
        useCss: true
      });
    }
    finalY = doc.previousAutoTable.finalY;
    doc.autoTable({
      startY: finalY + 3,
      pageBreak: "avoid",
      tableWidth: 100,
      html: "#move-finalTotals-table",
      useCss: true
    });
    finalY = doc.previousAutoTable.finalY;
    if (user.contact_comments.length !== 0) {
      doc.autoTable({
        startY: finalY + 3,
        pageBreak: "avoid",
        html: "#move-comments-table",
        useCss: true
      });
    }
    finalY = doc.previousAutoTable.finalY;
    doc.autoTable({
      startY: finalY + 3,
      pageBreak: "avoid",
      html: "#move-understand-table",
      useCss: true
    });

    finalY = doc.previousAutoTable.finalY;
    if (user.inventory.length !== 0) {
      doc.autoTable({
        startY: finalY + 3,
        // pageBreak: "avoid",
        html: "#move-items-table",
        useCss: true
      });
    }
    finalY = doc.previousAutoTable.finalY;

    // Signature line
    doc.addImage(Signature, "JPEG", 15, finalY + 10);

    doc.save(`${user.first_name} ${user.last_name}-move-estimate.pdf`);
  };
  render() {
    // console.log("USER", this.props.user);
    const { user } = this.state;
    // const { user } = this.props;
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "1rem"
          }}
        >
          <Button color="navy" size="sm" onClick={this.generatePdf}>
            <CloudDownload />
            Download PDF
          </Button>
        </div>
        {/*** Checks for user and only display once user loads ***/}
        {user !== null ? (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div
                id="finalized-tables"
                style={{
                  margin: "auto",
                  maxWidth: "1000px",
                  maxHeight: "600px",
                  overflowY: "auto"
                }}
              >
                <table id="info-table" border="1">
                  <thead>
                    <tr>
                      <th className="t-head" colspan="2">
                        Moving Estimate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="padding-0">
                    <tr className="padding-0">
                      <td className="td-half-brl">
                        Customer: {user.first_name} {user.last_name}
                      </td>
                      <td className="td-half-br">
                        Customer Rep: Francisco Miranda
                      </td>
                    </tr>
                    <tr>
                      <td className="td-half-brl">
                        Phone: {user.phone && user.phone}
                      </td>
                      <td className="td-half-br">Phone: (480) 899-4117</td>
                    </tr>
                    <tr>
                      <td className="td-half-brl">
                        Email: {user.email && user.email}
                      </td>
                      <td className="td-half-br">Fax: (480) 899-4127</td>
                    </tr>
                    {/* //TODO Add move date and time here */}
                    <tr>
                      <td className="td-half-brl">
                        {user.pack_date !== null ? (
                          <>
                            <span style={{ marginRight: ".5rem" }}>
                              {" "}
                              Move Date: {user.move_date && user.move_date}
                            </span>{" "}
                            Move Time: {user.move_time && user.move_time}
                          </>
                        ) : (
                          <>Move Date: {user.move_date && user.move_date}</>
                        )}
                      </td>
                      <td className="td-half-br">
                        Email: cisco@mirandadelivery.com
                      </td>
                    </tr>
                    <tr>
                      <td className="td-half-brl">
                        {user.pack_date !== null ? (
                          <>
                            <span style={{ marginRight: ".5rem" }}>
                              Pack Date: {user.pack_date && user.pack_date}
                            </span>{" "}
                            Pack Time: {user.pack_time && user.pack_time}
                          </>
                        ) : (
                          <>Move Time: {user.move_time && user.move_time}</>
                        )}
                      </td>
                      <td className="td-half-br">
                        Web: www.mirandadelivery.com
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                {/* Move Detail Table */}
                <table id="move-detail-table" border="1">
                  <thead>
                    <tr>
                      <th className="t-head">Moving From</th>
                      <th className="t-head">Moving To</th>
                    </tr>
                  </thead>
                  <tbody className="padding-0">
                    <tr className="padding-0">
                      <td className="td-half">
                        {user.pu_address && user.pu_address}
                      </td>
                      <td className="td-half">
                        {user.do_address && user.do_address}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <>
                  {/*** Checks for move services and conditionally renders each ***/}
                  {user.moveServices && (
                    <>
                      {/* Move Total Table */}
                      {user.moveServices.moveCost !== "undefined" &&
                      user.moveServices.moveCost.totalMoveCost > 0 ? (
                        <>
                          <br />
                          <table id="move-total-table" border="1">
                            <thead>
                              <tr>
                                <th className="t-head" colspan="2">
                                  Moving Charges
                                </th>
                              </tr>
                            </thead>
                            <tbody className="padding-0">
                              <tr className="padding-0">
                                <td className="td-half">Move hours</td>
                                <td className="td-half">
                                  {user.moveServices.moveCost.moveHours} hr(s)
                                </td>
                              </tr>
                              {user.moveServices.moveCost.driveTime && (
                                <tr className="padding-0">
                                  <td className="td-half">Travel Time</td>
                                  <td className="td-half">
                                    {user.moveServices.moveCost.driveTime} hr(s)
                                  </td>
                                </tr>
                              )}

                              {user.moveServices.moveCost.stairHours && (
                                <tr className="padding-0">
                                  <td className="td-half">Time For Stairs</td>
                                  <td className="td-half">
                                    {user.moveServices.moveCost.stairHours}{" "}
                                    hr(s)
                                  </td>
                                </tr>
                              )}
                              {user.moveServices.moveCost.longCarryHours && (
                                <tr className="padding-0">
                                  <td className="td-half">
                                    Time For Long Carry
                                  </td>
                                  <td className="td-half">
                                    {user.moveServices.moveCost.longCarryHours}{" "}
                                    hr(s)
                                  </td>
                                </tr>
                              )}
                              {(user.moveServices.moveCost.totalMen &&
                                user.moveServices.moveCost.totalTrucks) ||
                              (user.moveServices.moveCost.moveHours &&
                                user.moveServices.moveCost.ratePerHour) ||
                              (user.moveServices.moveCost.totalMoveCost &&
                                user.moveServices.moveCost.longCarryHours) ||
                              (user.moveServices.moveCost.stairHours &&
                                user.moveServices.moveCost.driveTime) ? (
                                <tr className="padding-0">
                                  <td className="td-half">
                                    Move charges based on{" "}
                                    {user.moveServices.moveCost.totalMen} men &{" "}
                                    {user.moveServices.moveCost.totalTrucks}{" "}
                                    truck(s) for{" "}
                                    {(
                                      user.moveServices.moveCost.moveHours +
                                      user.moveServices.moveCost.driveTime +
                                      user.moveServices.moveCost.stairHours +
                                      user.moveServices.moveCost.longCarryHours
                                    ).toFixed(2)}{" "}
                                    hours @{" "}
                                    {user.moveServices.moveCost.ratePerHour}
                                    /hr
                                  </td>
                                  <td className="td-half">
                                    $
                                    {user.moveServices.moveCost.totalMoveCost.toFixed(
                                      2
                                    )}
                                  </td>
                                </tr>
                              ) : null}
                            </tbody>
                          </table>
                        </>
                      ) : null}
                      {/* Packing Charges Table */}
                      {user.moveServices.packing.packingItems !== "undefined" &&
                      user.moveServices.packing.packingItems.length !== 0 ? (
                        <>
                          <br />
                          <table id="move-packing-table" border="1">
                            <thead>
                              <tr>
                                <th className="t-head" colspan="4">
                                  Packing Material Charges
                                </th>
                              </tr>
                            </thead>
                            <tbody className="padding-0">
                              <tr>
                                <td className="t-head td-20">Packing Item</td>
                                <td className="t-head td-20">Quantity</td>
                                <td className="t-head td-20">Rate</td>
                                <td className="t-head td-20">Total</td>
                              </tr>
                              {user.moveServices.packing.packingItems.map(
                                (item, i) => (
                                  <tr className="padding-0">
                                    <td className="td-20">
                                      {item.packingItem}
                                    </td>
                                    <td className="td-20">
                                      {item.packingItemQty}
                                    </td>
                                    <td className="td-20">
                                      ${item.packingItemRate.toFixed(2)}
                                    </td>
                                    <td className="td-20">
                                      ${item.packingItemAmt.toFixed(2)}
                                    </td>
                                  </tr>
                                )
                              )}
                              <tr className="padding-0">
                                <td className="ta-right" colSpan="3">
                                  Sub-Total
                                </td>
                                <td className="td-20">
                                  $
                                  {user.moveServices.packing.packingTotal.toFixed(
                                    2
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      ) : null}
                      {/* Fee Charges Table */}
                      {user.moveServices.fees !== "undefined" &&
                      user.moveServices.fees.totalFees > 0 ? (
                        <>
                          <br />
                          <table id="move-fees-table" border="1">
                            <thead>
                              <tr>
                                <th className="t-head" colspan="2">
                                  Total Fees
                                </th>
                              </tr>
                            </thead>
                            <tbody className="padding-0">
                              {user.moveServices.fees.receivingFee && (
                                <tr className="padding-0">
                                  <td className="td-half">Receiving Fee</td>
                                  <td className="td-half">
                                    $
                                    {user.moveServices.fees.receivingFee.toFixed(
                                      2
                                    )}
                                  </td>
                                </tr>
                              )}
                              {user.moveServices.moveCost.tripFee &&
                                user.moveServices.moveCost.tripFee.length !==
                                  0 && (
                                  <tr className="padding-0">
                                    <td className="td-half">Trip Fee</td>
                                    <td className="td-half">
                                      $
                                      {user.moveServices.moveCost.tripFee.toFixed(
                                        2
                                      )}
                                    </td>
                                  </tr>
                                )}
                              <tr className="padding-0">
                                <td className="ta-right">Sub-Total</td>
                                <td className="td-20">
                                  $
                                  {(
                                    user.moveServices.fees.receivingFee +
                                    user.moveServices.moveCost.tripFee
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      ) : null}
                      {/* Storage Charges Table */}
                      {user.moveServices.storage.storageItems !== "undefined" &&
                      user.moveServices.storage.storageItems.length !== 0 ? (
                        <>
                          <br />
                          <table id="move-storage-table" border="1">
                            <thead>
                              <tr>
                                <th className="t-head" colspan="5">
                                  Storage Charges
                                </th>
                              </tr>
                            </thead>
                            <tbody className="padding-0">
                              <tr>
                                <td className="td-21">Storage Item</td>
                                <td className="td-21">Quantity</td>
                                <td className="td-21">Rate</td>
                                <td className="td-21">Days In Storage</td>
                                <td className="td-21">Total</td>
                              </tr>
                              {user.moveServices.storage.storageItems.map(
                                (item, i) => (
                                  <tr className="padding-0">
                                    <td className="td-21">{item.itemName}</td>
                                    <td className="td-21">{item.itemQty}</td>
                                    <td className="td-21">
                                      ${parseFloat(item.itemRate).toFixed(2)}
                                    </td>
                                    <td className="td-21">
                                      {item.daysInStorage}
                                    </td>
                                    <td className="td-21">
                                      ${item.itemAmt.toFixed(2)}
                                    </td>
                                  </tr>
                                )
                              )}
                              <tr className="padding-0">
                                <td className="ta-right" colSpan="4">
                                  Sub-Total
                                </td>
                                <td className="td-20">
                                  $
                                  {user.moveServices.storage.storageTotal.toFixed(
                                    2
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      ) : null}
                      {/* Additional Services Table */}
                      {user.moveServices.additionalServices.addservices !==
                        "undefined" &&
                      user.moveServices.additionalServices.addservices
                        .length !== 0 ? (
                        <>
                          <br />
                          <table id="move-addService-table" border="1">
                            <thead>
                              <tr>
                                <th className="t-head" colspan="2">
                                  Additional Services
                                </th>
                              </tr>
                            </thead>
                            <tbody className="padding-0">
                              {user.moveServices.additionalServices.addservices.map(
                                (service, i) => (
                                  <tr className="padding-0">
                                    <td className="td-half">
                                      {service.serviceName}
                                    </td>
                                    <td className="td-half">
                                      $
                                      {parseFloat(service.serviceAmt).toFixed(
                                        2
                                      )}
                                    </td>
                                  </tr>
                                )
                              )}

                              <tr className="padding-0">
                                <td className="ta-right">Sub-Total</td>
                                <td className="td-20">
                                  $
                                  {user.moveServices.additionalServices
                                    .addServicesTotal !== null
                                    ? user.moveServices.additionalServices.addServicesTotal.toFixed(
                                        2
                                      )
                                    : ""}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      ) : null}
                      {/* Display Totals Table */}
                      <br />
                      <table id="move-finalTotals-table" border="1">
                        <thead>
                          <tr>
                            <th className="t-head" colspan="2">
                              Totals
                            </th>
                          </tr>
                        </thead>
                        <tbody className="padding-0">
                          {user.moveServices.moveCost.totalMoveCost && (
                            <tr className="padding-0">
                              <td className="td-half">Move Charges</td>
                              <td className="td-20">
                                $
                                {user.moveServices.moveCost.totalMoveCost.toFixed(
                                  2
                                )}
                              </td>
                            </tr>
                          )}
                          {user.moveServices.packing.packingTotal &&
                          user.moveServices.packing.packingTotal !== 0 ? (
                            <tr className="padding-0">
                              <td className="td-half">Packing Charges</td>
                              <td className="td-20">
                                $
                                {user.moveServices.packing.packingTotal.toFixed(
                                  2
                                )}
                              </td>
                            </tr>
                          ) : null}
                          {user.moveServices.additionalServices
                            .addServicesTotal &&
                          user.moveServices.additionalServices
                            .addServicesTotal !== 0 ? (
                            <tr className="padding-0">
                              <td className="td-half">
                                Additional Service Charges
                              </td>
                              <td className="td-20">
                                $
                                {user.moveServices.additionalServices.addServicesTotal.toFixed(
                                  2
                                )}
                              </td>
                            </tr>
                          ) : null}
                          {user.moveServices.storage.storageTotal &&
                          user.moveServices.storage.storageTotal !== 0 ? (
                            <tr className="padding-0">
                              <td className="td-half">Storage Charges</td>
                              <td className="td-20">
                                $
                                {user.moveServices.storage.storageTotal.toFixed(
                                  2
                                )}
                              </td>
                            </tr>
                          ) : null}
                          {user.moveServices.fees.receivingFee &&
                          user.moveServices.fees.receivingFee.length !== 0 &&
                          user.moveServices.moveCost.tripFee &&
                          user.moveServices.moveCost.tripFee.length !== 0 ? (
                            <tr className="padding-0">
                              <td className="td-half">Fee Charges</td>
                              <td className="td-20">
                                $
                                {(
                                  user.moveServices.fees.receivingFee +
                                  user.moveServices.moveCost.tripFee
                                ).toFixed(2)}
                              </td>
                            </tr>
                          ) : user.moveServices.moveCost.receivingFee &&
                            user.moveServices.moveCost.receivingFee.length !==
                              0 ? (
                            <tr className="padding-0">
                              <td className="td-half">Fee Charges</td>
                              <td className="td-20">
                                $
                                {user.moveServices.fees.receivingFee.toFixed(2)}
                              </td>
                            </tr>
                          ) : user.moveServices.moveCost.tripFee &&
                            user.moveServices.moveCost.tripFee.length !== 0 ? (
                            <tr className="padding-0">
                              <td className="td-half">Fee Charges</td>
                              <td className="td-20">
                                ${user.moveServices.moveCost.tripFee.toFixed(2)}
                              </td>
                            </tr>
                          ) : null}
                          <tr className="padding-0">
                            <td className="ta-right">Grand Total</td>
                            <td className="td-20">
                              $
                              {user.moveServices.allTotal &&
                              user.moveServices.allTotal.length !== 0
                                ? user.moveServices.allTotal.toFixed(2)
                                : ""}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {/* User Comments table */}
                      {user.contact_comments.length !== 0 && (
                        <>
                          <br />
                          <table id="move-comments-table" border="1">
                            <thead>
                              <tr>
                                <th className="t-head">Comments</th>
                              </tr>
                            </thead>
                            <tbody className="padding-0">
                              <tr className="padding-0">
                                <td className="td-20">
                                  {user.contact_comments}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      )}

                      {/* Understanding Estimate Table */}
                      <br />
                      <table id="move-understand-table" border="1">
                        <thead>
                          <tr>
                            <th className="t-head">
                              Understanding Your Estimate
                            </th>
                          </tr>
                        </thead>
                        <tbody className="padding-0">
                          <tr className="padding-0">
                            <td className="td-20">
                              - Please be advised this is just an estiamate. The
                              total charges for your move are based on actual
                              moving time plus <br /> the travel. Packing
                              materials are billed for an additional cost. All
                              jobs are subject to a minimum charge of 1 <br />{" "}
                              hour. Please ask your sales person. <br /> - We
                              will provide a blanket wrap service while we
                              transport your items. <br /> - Full replacement
                              value insurance is included in the cost. <br /> -
                              The last hour is always prorated into 15 minute
                              increments. <br /> - The FULL invoice for services
                              is payable at the completion of the move by:
                              Check, Cashier's Check, Money Order,
                              <br /> Cash or Visa & Master Card with a 4%
                              administration fee on cards. <br /> - Cancellation
                              Policy: A 72 hour (3 Day) notice of cancellation
                              is required to receive a return of deposit.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {/* Items To Be Moved Table */}
                      {user.inventory.length !== 0 && (
                        <>
                          <br />
                          <table id="move-items-table" border="1">
                            <thead>
                              <tr>
                                <th className="t-head" colspan="2">
                                  Items To Be Moved
                                </th>
                              </tr>
                            </thead>
                            <tbody className="padding-0">
                              {user.inventory.map((room, i) => (
                                <>
                                  <tr className="padding-0">
                                    <td className="t-head" colspan="2">
                                      {room.roomName}
                                    </td>
                                  </tr>
                                  {room.items.map((item, i) => (
                                    <tr className="padding-0">
                                      <td className="td-half">{item.name}</td>
                                      <td className="td-half">
                                        {item.itemAmt}
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              ))}
                              <tr className="padding-0">
                                <td className="ta-right">Total Items</td>
                                <td className="td-20">
                                  {user.moveServices.totalItemCount}
                                </td>
                              </tr>
                              <tr className="padding-0">
                                <td className="ta-right">
                                  Estimated Total Volume
                                </td>
                                <td className="td-20">
                                  {user.moveServices.totalVolume} CFT
                                </td>
                              </tr>
                              <tr className="padding-0">
                                <td className="ta-right">
                                  Estimated Total Weight
                                </td>
                                <td className="td-20">
                                  {user.moveServices.totalWeight} Lbs
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      )}
                    </>
                  )}
                </>
              </div>
            </GridItem>
          </GridContainer>
        ) : null}
      </>
    );
  }
}
export default Finalize;
