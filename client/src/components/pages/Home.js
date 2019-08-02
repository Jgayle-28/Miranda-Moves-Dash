import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
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
      {/* <ContactFilter /> */}
      <Contacts />

      {/* MODAL */}
      <Dialog
        open={modalOpen}
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
