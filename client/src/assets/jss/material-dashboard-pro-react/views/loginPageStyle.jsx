import {
  container,
  cardTitle,
  whiteColor,
  grayColor
} from '../../../../assets/jss/material-dashboard-pro-react.jsx';

const loginPageStyle = theme => ({
  container: {
    ...container,
    zIndex: '4',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '100px'
    }
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor
  },
  textCenter: {
    textAlign: 'center'
  },
  justifyContentCenter: {
    justifyContent: 'center !important'
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: whiteColor
    },
    marginLeft: '5px',
    marginRight: '5px'
  },
  inputAdornment: {
    marginRight: '18px'
  },
  inputAdornmentIcon: {
    color: grayColor[6]
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)'
  },
  cardHeader: {
    marginBottom: '20px'
  },
  login_header: {
    // backgroundColor: "#001a31"
    // fontWeight: "500",
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  login_logo: {
    width: '100%'
  },
  socialLine: {
    padding: '0.9375rem 0'
  }
});

export default loginPageStyle;
