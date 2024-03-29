import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  TOGGLE_MODAL
} from '../types';

const AuthState = props => {
  const initalState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    modalOpen: false
  };

  const [state, dispatch] = useReducer(authReducer, initalState);

  // Load user
  const loadUser = async () => {
    // load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register user
  const registerUser = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login user
  const loginUser = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout user
  const logoutUser = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Toggle Modal open and close
  const toggleModal = modalStatus =>
    dispatch({ type: TOGGLE_MODAL, payload: modalStatus });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        modalOpen: state.modalOpen,
        registerUser,
        loadUser,
        loginUser,
        logoutUser,
        clearErrors,
        toggleModal
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
