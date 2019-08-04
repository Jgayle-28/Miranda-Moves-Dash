import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.min.css';

const ButtonNav = props => {
  const authContext = useContext(AuthContext);
  const { toggleModal, isAuthenticated } = authContext;
  return (
    <>
      {isAuthenticated ? (
        <Fab
          // actionButtonStyles={actionButtonStyles}
          position={{ bottom: 10, right: 10 }}
          mainButtonStyles={{
            backgroundColor: '#01579b',
            width: 60,
            height: 60,
            borderRadius: 100
          }}
          icon={<i className="far fa-compass fa-2x" />}
          // event={event}
        >
          <Action text="Add Contact" onClick={() => toggleModal(true)}>
            <i className="fas fa-user-plus" />
          </Action>
          <Action text="Home">
            <Link to="/">
              <i className="fas fa-home" style={{ color: '#ffffff' }} />
            </Link>
          </Action>
        </Fab>
      ) : null}
    </>
  );
};

export default ButtonNav;
