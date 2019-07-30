import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/alternate/Contacts';
import ContactForm from '../contacts/alternate/ContactForm';
import ContactFilter from '../contacts/alternate/ContactFilter';
import AuthContext from '../../context/auth/AuthContext';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const Home = props => {
  const authContext = useContext(AuthContext);
  const { modalOpen, toggleModal } = authContext;

  useEffect(() => {
    authContext.loadUser();
    //eslint-diable-next-line
  }, []);
  return (
    <>
      <div className="">
        <ContactFilter />
        <Contacts />
      </div>
      {/* MODAL */}
      <Dialog
        open={modalOpen}
        // width="50%"
        // height="90%"
        // effect="fadeInDown"
        onClose={() => toggleModal(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;
