import React, { useContext, useEffect, useState } from 'react';
import history from '../../history';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import GridContainer from '../../components/components/Grid/GridContainer.jsx';
import GridItem from '../../components/components/Grid/GridItem.jsx';
import Card from '../../components/components/Card/Card.jsx';
import CardBody from '../../components/components/Card/CardBody.jsx';
import CardIcon from '../../components/components/Card/CardIcon.jsx';
import CardHeader from '../../components/components/Card/CardHeader.jsx';
import Button from '../../components/components/CustomButtons/Button.jsx';
import ContactContext from '../../context/contact/ContactContext';
import AuthContext from '../../context/auth/AuthContext';
import MaterialTable, { MTableToolbar } from 'material-table';
import Spinner from '../utils/Spinner';
import ListAlt from '@material-ui/icons/ListAlt';
import { cardTitle } from '../../assets/jss/material-dashboard-pro-react.jsx';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px'
  }
};

const Contacts = ({ props }) => {
  const contactConext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const {
    contacts,
    getContacts,
    filtered,
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
    toggleModal(true);
  };
  const onDelete = rowData => {
    deleteContact(rowData._id);
    // Clears contact being held in current state
    clearCurrent(rowData);
  };

  console.log('contacts: ', contacts);
  return (
    <>
      {contacts !== null && !loading ? (
        <GridContainer justify="center">
          <GridItem xs={11}>
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
                      icon: () => (
                        <Link to="/estimate" style={{ borderRadius: '50%' }}>
                          <ListAlt />
                        </Link>
                      ),
                      iconProps: { color: 'primary', fontSize: 'small' },
                      tooltip: 'Create Estimate'
                      // onClick: (e, rowData) => {
                      //   history.push('/estimate');
                      // }
                    }
                  ]}
                  //   components={{
                  //     Action: props => (
                  //       <Button
                  //         onClick={event =>
                  //           props.action.onClick(event, props.data)
                  //         }
                  //         color="primary"
                  //         variant="contained"
                  //         style={{ textTransform: 'none' }}
                  //         size="small"
                  //       >
                  //         My Button
                  //       </Button>
                  //     )
                  //   }
                  // }
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
                      title: 'Target Move Date',
                      field: 'move_date',
                      type: 'datetime',
                      editable: 'never'
                    }
                  ]}
                  options={{
                    exportButton: true,
                    // filtering: true
                    grouping: true
                  }}
                />
                {/* <MaterialTable
                  columns={[
                    { title: 'Adı', field: 'contact_comments' },
                    { title: 'Soyadı', field: 'date' },
                    { title: 'Soyadı', field: 'do_address' },
                    { title: 'Soyadı', field: 'email' },
                    { title: 'Soyadı', field: 'estimate_date' },
                    { title: 'Soyadı', field: 'estimate_time' },
                    { title: 'Soyadı', field: 'first_name' },
                    { title: 'Soyadı', field: 'last_name' },
                    { title: 'Soyadı', field: 'move_date' },
                    { title: 'Soyadı', field: 'opportunity_type' },
                    { title: 'Soyadı', field: 'phone' },
                    { title: 'Soyadı', field: 'phone_ext' },
                    { title: 'Soyadı', field: 'phone_type' },
                    { title: 'Soyadı', field: 'pu_address' },
                    { title: 'Soyadı', field: 'refered_by' },
                    { title: 'Soyadı', field: 'target_movedate' },
                    { title: 'Soyadı', field: 'user' },
                    { title: 'Soyadı', field: '_id' }
                  ]}
                  data={[
                    {
                      contact_comments: 'fasdfdasdfsasdfasd',
                      date: '2019-08-02T04:15:44.307Z',
                      do_address: '',
                      email: 'mgayle28@gmail.com',
                      estimate_date: null,
                      estimate_time: '',
                      first_name: 'Mandy',
                      last_name: 'gayle',
                      move_date: '2019-08-16T04:15:00.000Z',
                      opportunity_type: '',
                      phone: '7609122655',
                      phone_ext: '777',
                      phone_type: 'Mobile',
                      pu_address: '',
                      refered_by: 'Mandy gayle',
                      target_movedate: null,
                      user: '5d3b75cc5615c1828eb5842d',
                      _id: '5d43b8f0b11b163a90b0a902'
                    }
                  ]}
                  // data={[
                  //   {
                  //     name: 'Mehmet',
                  //     surname: 'Baran',
                  //     birthYear: 1987,
                  //     birthCity: 63
                  //   }
                  // ]}
                  title="Demo Title"
                /> */}
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
