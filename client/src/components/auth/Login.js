import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import CustomInput from "../../components/components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

const Login = props => {
  // bring in the context
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  // destructure from the context
  const { setAlert } = alertContext;
  const { loginUser, error, clearErrors, isAuthenticated } = authContext;

  // Use for updates in state/context
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // set the component state
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      loginUser({ email, password });
    }
  };

  return (
    <>
      <div className="form-container">
        <h1>
          Account <span style={{ color: "#3F729B" }}>Login</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <CustomInput
              navy
              // error={this.state.emailBool}
              // helpText={errors.email}
              labelText="Email"
              id="firstname"
              onChange={onChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email className={props.classes.inputAdornmentIcon} />
                  </InputAdornment>
                ),
                type: "email",
                // placeholder: 'First Name',
                name: "email",
                value: email,
                onChange: onChange
              }}
            />
          </div>
          <div className="form-group">
            <CustomInput
              navy
              // error={this.state.passwordBool}
              // helpText={errors.password}
              type="password"
              labelText="Password"
              id="password"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Lock className={props.classes.inputAdornmentIcon} />
                  </InputAdornment>
                ),
                type: "password",
                placeholder: "Password...",
                name: "password",
                value: password,
                onChange: onChange
              }}
            />
          </div>
          <input
            style={{ backgroundColor: "#78909c" }}
            type="submit"
            value="Login"
            className="btn  btn-block"
          />
        </form>
      </div>
    </>
  );
};

export default withStyles(loginPageStyle)(Login);
