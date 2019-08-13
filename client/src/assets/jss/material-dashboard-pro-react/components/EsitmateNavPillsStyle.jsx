import {
  greyColor,
  navyColor,
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  blackColor,
  grayColor,
  hexToRgb
} from '../../material-dashboard-pro-react.jsx';

const navPillsStyle = theme => ({
  root: {
    marginTop: '20px',
    paddingLeft: '0',
    marginBottom: '0',
    overflow: 'visible !important'
  },
  flexContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  },
  displayNone: {
    display: 'none !important'
  },
  fixed: {
    overflowX: 'visible'
  },
  horizontalDisplay: {
    display: 'block'
  },
  pills: {
    // float: 'left',
    position: 'relative',
    display: 'flex',
    // borderRadius: '30px',
    minWidth: '100px',
    textAlign: 'center',
    transition: 'all .3s',
    // padding: '10px 15px',
    color: grayColor[6],
    height: 'auto',
    opacity: '1',
    maxWidth: '100%'
    // margin: '0 5px'
  },
  pillsWithIcons: {
    display: 'flex'
    // borderRadius: '4px'
  },
  tabIcon: {
    width: '30px',
    height: '30px',
    display: 'block',
    margin: '15px 0'
  },
  horizontalPills: {
    display: 'flex',
    width: '100%'
    // float: 'none !important'
  },
  labelContainer: {
    padding: '0!important',
    color: 'inherit'
  },
  label: {
    lineHeight: '24px',
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: '300',
    position: 'relative',
    display: 'block',
    color: 'inherit'
  },
  contentWrapper: {
    marginTop: '20px'
  },
  primary: {
    '&,&:hover': {
      color: whiteColor,
      backgroundColor: primaryColor[0],
      boxShadow:
        '0 4px 20px 0px rgba(' +
        hexToRgb(blackColor) +
        ', 0.14), 0 7px 10px -5px rgba(' +
        hexToRgb(primaryColor[0]) +
        ', 0.4)'
    }
  },
  info: {
    '&,&:hover': {
      color: whiteColor,
      backgroundColor: infoColor[0],
      boxShadow:
        '0 4px 20px 0px rgba(' +
        hexToRgb(blackColor) +
        ', 0.14), 0 7px 10px -5px rgba(' +
        hexToRgb(successColor[0]) +
        ', 0.4)'
    }
  },
  navy: {
    '&,&:hover': {
      color: whiteColor,
      backgroundColor: navyColor,
      boxShadow:
        '0 4px 20px 0px rgba(' +
        hexToRgb(blackColor) +
        ', 0.14), 0 7px 10px -5px rgba(' +
        hexToRgb(successColor[0]) +
        ', 0.4)'
    }
  },
  grey: {
    '&,&:hover': {
      color: whiteColor,
      backgroundColor: greyColor,
      boxShadow:
        '0 4px 20px 0px rgba(' +
        hexToRgb(blackColor) +
        ', 0.14), 0 7px 10px -5px rgba(' +
        hexToRgb(greyColor) +
        ', 0.4)'
    }
  },
  success: {
    '&,&:hover': {
      color: whiteColor,
      backgroundColor: successColor[0],
      boxShadow:
        '0 2px 2px 0 rgba(' +
        hexToRgb(successColor[0]) +
        ', 0.14), 0 3px 1px -2px rgba(' +
        hexToRgb(successColor[0]) +
        ', 0.2), 0 1px 5px 0 rgba(' +
        hexToRgb(successColor[0]) +
        ', 0.12)'
    }
  },
  warning: {
    '&,&:hover': {
      color: whiteColor,
      backgroundColor: warningColor[0],
      boxShadow:
        '0 4px 20px 0px rgba(' +
        hexToRgb(blackColor) +
        ', 0.14), 0 7px 10px -5px rgba(' +
        hexToRgb(warningColor[0]) +
        ', 0.4)'
    }
  },
  danger: {
    '&,&:hover': {
      color: whiteColor,
      backgroundColor: dangerColor[0],
      boxShadow:
        '0 4px 20px 0px rgba(' +
        hexToRgb(blackColor) +
        ', 0.14), 0 7px 10px -5px rgba(' +
        hexToRgb(warningColor[0]) +
        ', 0.4)'
    }
  },
  rose: {
    '&,&:hover': {
      color: whiteColor,
      backgroundColor: roseColor[0],
      boxShadow:
        '0 4px 20px 0px rgba(' +
        hexToRgb(blackColor) +
        ', 0.14), 0 7px 10px -5px rgba(' +
        hexToRgb(roseColor[0]) +
        ', 0.4)'
    }
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default navPillsStyle;
