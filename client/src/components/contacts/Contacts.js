import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from '../../components/components/Grid/GridContainer.jsx';
import GridItem from '../../components/components/Grid/GridItem.jsx';
import Card from '../../components/components/Card/Card.jsx';
import CardBody from '../../components/components/Card/CardBody.jsx';
import ContactContext from '../../context/contact/ContactContext';
import AuthContext from '../../context/auth/AuthContext';
import MaterialTable from 'material-table';
import Spinner from '../utils/Spinner';
import ListAlt from '@material-ui/icons/ListAlt';
import { cardTitle } from '../../assets/jss/material-dashboard-pro-react.jsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import MirandaLogo from '../../assets/img/logos/newPdf_log.jpg';
import moment from 'moment';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px'
  }
};

// const Contacts = ({ props }) => {
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
    console.log('setCurrent from Table', rowData);
    toggleModal(true);
  };
  const onDelete = rowData => {
    deleteContact(rowData._id);
    // Clears contact being held in current state
    clearCurrent(rowData);
  };
  const generatePdf = rowData => {
    console.log(rowData);
    var doc = new jsPDF();

    const logo = MirandaLogo;
    doc.addImage(logo, 'JPEG', 15, 6, 38, 12);
    doc.setFontSize(8);
    doc.text('Phone: (899) 480-4117', 137, 8);
    doc.text('Email: customerservice@mirandadelivery.com', 137, 13);

    doc.autoTable({
      body: [
        [
          {
            content: `Estimate Date: ${
              rowData.estimate_date !== null ? rowData.estimate_date : ''
            }`,
            styles: { halign: 'left' }
          },
          {
            content: `Estimate Time: ${
              rowData.estimate_time !== null ? rowData.estimate_time : ''
            }`,
            styles: { halign: 'center' }
          }
        ]
      ],
      startY: 25
    });

    doc.autoTable({
      headStyles: { fillColor: [5, 48, 83] },

      startY: 35,
      tableWidth: 'auto',
      head: [
        [
          {
            content: `${rowData.first_name} ${rowData.last_name}'s Details`,
            colSpan: 5,
            styles: { halign: 'center' }
          }
        ]
      ],
      body: [
        ['Customer name:', `${rowData.first_name} ${rowData.last_name}`],
        ['Phone Number:', `${rowData.phone}`],
        ['Email:', `${rowData.email}`],
        ['Pickup Address:', `${rowData.pu_address}`],
        ['Dropoff Address:', `${rowData.do_address}`],
        [
          'Target Move Date:',
          `${rowData.move_date !== null ? rowData.move_date : ''}`
        ],
        ['Actual Move Date:']
      ]
    });

    doc.autoTable({
      headStyles: { fillColor: [5, 48, 83] },

      startY: 100,
      head: [
        [
          {
            content: 'Inventory',
            colSpan: 2,
            // rowSpan: 2,
            styles: { halign: 'center' }
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
            content: 'Comments',
            colSpan: 2,
            // rowSpan: 2,
            styles: { halign: 'center' }
          }
        ]
      ],
      body: [
        [
          {
            content: `${rowData.contact_comments}`,
            styles: { halign: 'center' }
          }
        ]
        // [`${rowData.contact_comments}`]
      ]
    });

    doc.save(`${rowData.first_name}_${rowData.last_name}'s_estimate.pdf`);
  };
  const Description = () => {
    return <Description />;
  };
  const createEstimate = opportunity => {
    props.history.push({
      pathname: '/estimate',
      state: { user: opportunity }
    });
  };

  console.log('contacts: ', contacts);
  console.log('props.history', props.history);
  return (
    <>
      {contacts !== null && !loading ? (
        <GridContainer justify="center">
          <GridItem xs={12}>
            <Card>
              <CardBody>
                <MaterialTable
                  title={'Current Opportunities'}
                  data={contactConext.contacts}
                  actions={[
                    {
                      icon: 'delete',
                      iconProps: { color: 'error', fontSize: 'small' },
                      tooltip: 'Delete Contact',
                      onClick: (e, rowData) => {
                        onDelete(rowData);
                      }
                    },
                    {
                      icon: 'edit',
                      iconProps: { color: 'action', fontSize: 'small' },
                      tooltip: 'Edit Contact',
                      onClick: (e, rowData) => {
                        onEditClick(rowData);
                      }
                    },
                    {
                      icon: 'cloud_download',
                      iconProps: { color: 'inherit', fontSize: 'small' },
                      tooltip: 'Download Estimate Pdf',
                      onClick: (e, rowData) => {
                        generatePdf(rowData);
                      }
                    },
                    {
                      icon: 'list_alt',
                      iconProps: { color: 'primary', fontSize: 'small' },
                      tooltip: 'Create Estimate',
                      onClick: (e, rowData) => createEstimate(rowData)
                    }
                  ]}
                  columns={[
                    {
                      title: 'First Name',
                      field: 'first_name',
                      editable: 'never'
                    },
                    {
                      title: 'Last Name',
                      field: 'last_name',
                      editable: 'never'
                    },
                    {
                      title: 'Opportunity Type',
                      field: 'opportunity_type',
                      editable: 'never'
                    },

                    {
                      title: 'Phone Number',
                      field: 'phone',
                      editable: 'never'
                    },

                    {
                      title: 'Email',
                      field: 'email',
                      editable: 'never'
                    },
                    {
                      title: 'Estimate Date',
                      field: 'estimate_date',
                      editable: 'never'
                    },
                    {
                      title: 'Estimate Time',
                      field: 'estimate_time',
                      editable: 'never'
                    },
                    {
                      title: 'Refered By',
                      field: 'refered_by',
                      editable: 'never'
                    },
                    {
                      title: 'Move Date',
                      field: 'move_date',
                      type: 'datetime',
                      editable: 'never'
                    },
                    {
                      title: 'Move Time',
                      field: 'move_time',
                      type: 'datetime',
                      editable: 'never'
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
