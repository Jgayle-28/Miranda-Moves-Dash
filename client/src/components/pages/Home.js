import React, { useContext, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Contacts from '../contacts/Contacts';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import OpportunityStepper from '../components/Forms/OpportunityStepper';
import oppModalStyle from '../../assets/jss/material-dashboard-pro-react/oppModalStyle';
// Forms for New Opportunity stepper
import OppDetailForm from '../Forms/NewOppForms/OppDetailForm';
import MoveDetails from '../Forms/NewOppForms/MoveDetails';
import EstimateDetails from '../Forms/NewOppForms/EstimateDetails';
import FinalizeForm from '../Forms/NewOppForms/FinalizeForm';

const Home = props => {
  // const { classes } = props;
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { modalOpen, toggleModal } = authContext;

  useEffect(() => {
    authContext.loadUser();
    //eslint-diable-next-line
  }, []);

  return (
    <>
      {/* <ContactFilter /> */}
      <Contacts />
      {/* MODAL */}
      <Dialog
        maxWidth="md"
        scroll="body"
        // color
        open={modalOpen}
        // onClose={() => toggleModal(false)}
        aria-labelledby="form-dialog-title"
        onBackdropClick={() => toggleModal(false)}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            width: '100%',
            hieght: '100%',
            boxShadow: 'none',
            margin: '0',
            padding: '0'
          }
        }}
      >
        <DialogContent>
          <OpportunityStepper
            color="navy"
            validate
            steps={[
              {
                stepName: 'Opportunity Details',
                stepComponent: OppDetailForm,
                stepId: 'opportunity_details'
              },
              {
                stepName: 'Move Details',
                stepComponent: MoveDetails,
                stepId: 'move_details'
              },
              {
                stepName: 'Estimate Details',
                // stepComponent: MoveDetails,
                stepComponent: EstimateDetails,
                stepId: 'estimate_details'
              },
              {
                stepName: 'Finalize Details',
                stepComponent: FinalizeForm,
                stepId: 'finalize_details'
              }
            ]}
            title={
              <span style={{ color: '#01579b' }} className="">
                <i
                  className={
                    contactContext.current
                      ? 'fas fa-user-edit'
                      : 'fas fa-user-plus'
                  }
                />{' '}
                {contactContext.current
                  ? ' Edit Opportunity'
                  : ' Add New Opportunity'}
              </span>
            }
            finishButtonClick={e => alert(e)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(oppModalStyle)(Home);
