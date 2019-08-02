import React, { Fragment, useEffect, useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import AuthContext from '../../context/auth/AuthContext';
import MaterialTable, { MTableToolbar } from 'material-table';
import Close from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/Edit';

const OpportunityTable = props => {
  // function CalendarCheck() {
  //   return <FaCalendarCheck />;
  // }
  // function CalendarMinus() {
  //   return <FaCalendarMinus />;
  // }
  const contactConext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const [state, setState] = React.useState({
    columns: []
    // data: []
  });

  const {
    contacts,
    filtered,
    getContacts,
    deleteContact,
    clearCurrent,
    setCurrent,
    loading
  } = contactConext;
  const { toggleModal } = authContext;
  useEffect(() => {
    getContacts();
    //eslin-disable-next-line
  }, []);
  // useEffect(() => {
  //   if (state.data.length === 0 || state.data.length !== props.data) {
  //     setState({ data: props.data });
  //   }
  // }, [props.data]);

  const generateActionButtons = () => {
    let buttonList = [];
    if (props.updatContact) {
      buttonList.push({
        icon: <Edit />,
        tooltip: 'Edit Contact',
        onClick: props.updatContact
      });
    }

    if (props.deleteContact) {
      buttonList.push({
        icon: <Close />,
        tooltip: 'Delete Contact',
        onClick: props.deleteContact
      });
    }
    return buttonList;
  };

  return (
    <Fragment>
      <MaterialTable
        {...props}
        title={props.title}
        columns={props.columns}
        data={contacts}
        actions={generateActionButtons()}
        // editable={
        //   props.editable && {
        //     onRowUpdate: (newData, oldData) =>
        //       new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //           {
        //             newData.tableType = props.tableType;
        //             const data = state.data;
        //             const index = data.indexOf(oldData);
        //             data[index] = newData;
        //             props.editMilestone(newData);
        //             setState({ data });
        //           }
        //           resolve();
        //         }, 1000);
        //       }),
        //     onRowDelete: oldData =>
        //       new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //           {
        //             let data = state.data;
        //             const index = data.indexOf(oldData);
        //             data.splice(index, 1);
        //             setState({ data });
        //           }
        //           props.onDelete(oldData);
        //           resolve();
        //         }, 1000);
        //       })
        //   }
        // }
        // components={{
        //   Toolbar: p => (
        //     <div>
        //       <div style={{ padding: '0px 10px' }}>
        //         <MTableToolbar {...p} />
        //         <IconContext.Provider value={{ size: '2em' }}>
        //           <FaPlusSquare
        //             style={{ cursor: 'pointer' }}
        //             onClick={props.createMilestone}
        //           />
        //         </IconContext.Provider>
        //       </div>
        //     </div>
        //   )
        // }}
      />
    </Fragment>
  );
};
export default OpportunityTable;

// import React from 'react';
// import MaterialTable from 'material-table';

// const OpportunityTable = () => {
//   return (
//     <div>
//       <MaterialTable icons={tableIcons} />
//     </div>
//   );
// };

// export default OpportunityTable;
