import {
  navyColor,
  infoBoxShadow
} from '../../../../assets/jss/material-dashboard-pro-react.jsx';

const customSelectStyle = {
  select: {
    zIndex: 9999999,
    padding: '12px 0 7px',
    fontSize: '.75rem',
    fontWeight: '400',
    lineHeight: '1.42857',
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: '#3C4858',
    letterSpacing: '0',
    '&:focus': {
      backgroundColor: 'transparent'
    },
    '&[aria-owns] + input + svg': {
      transform: 'rotate(180deg)'
    },
    '& + input + svg': {
      transition: 'all 300ms linear'
    }
  },
  selectFormControl: {
    margin: '10px 1px 10px 0px !important',
    '& > div': {
      '&:before': {
        borderBottomWidth: '1px !important',
        borderBottomColor: '#D2D2D2 !important'
      },
      '&:after': {
        borderBottomColor: navyColor + '!important'
      }
    }
  },
  selectLabel: {
    fontSize: '14px',
    color: '#aaaaaa !important'
    // top: "2px"
    // lineHeight: "2"
  },
  selectMenu: {
    '& > div > ul': {
      zIndex: 9999999,
      border: '0',
      padding: '5px 0',
      margin: '0',
      boxShadow: 'none',
      minWidth: '100%',
      borderRadius: '4px',
      boxSizing: 'border-box',
      display: 'block',
      fontSize: '14px',
      textAlign: 'left',
      listStyle: 'none',
      backgroundColor: '#fff',
      backgroundClip: 'padding-box'
    },
    '& $selectPaper $selectMenuItemSelectedMultiple': {
      backgroundColor: 'inherit'
    },
    '& > div + div': {
      maxHeight: '266px !important'
    }
  },
  selectMenuItem: {
    zIndex: 9999999,
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '2px',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: '400',
    lineHeight: '2',
    whiteSpace: 'nowrap',
    color: '#333',
    paddingRight: '30px',
    '&:hover': {
      backgroundColor: navyColor,
      color: '#FFFFFF',
      ...infoBoxShadow
    }
  },
  selectMenuItemSelected: {
    backgroundColor: navyColor + '!important',
    color: '#FFFFFF'
  },
  selectMenuItemSelectedMultiple: {
    backgroundColor: 'transparent !important',
    '&:hover': {
      backgroundColor: navyColor + '!important',
      color: '#FFFFFF',
      ...infoBoxShadow,
      '&:after': {
        color: '#FFFFFF'
      }
    },
    '&:after': {
      top: '16px',
      right: '12px',
      width: '12px',
      height: '5px',
      borderLeft: '2px solid currentColor',
      transform: 'rotate(-45deg)',
      opacity: '1',
      color: '#3c4858',
      position: 'absolute',
      content: "''",
      borderBottom: '2px solid currentColor',
      transition: 'opacity 90ms cubic-bezier(0,0,.2,.1)'
    }
  },
  selectPaper: {
    zIndex: 9999999,
    boxSizing: 'borderBox',
    borderRadius: '4px',
    padding: '0',
    minWidth: '100%',
    display: 'block',
    border: '0',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
    backgroundClip: 'padding-box',
    margin: '2px 0 0',
    fontSize: '14px',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor: 'transparent',
    maxHeight: '266px'
  },
  formControl: {
    // margin: "0 0 17px 0",
    // paddingTop: "27px",
    position: 'relative',
    '& svg,& .fab,& .far,& .fal,& .fas,& .material-icons': {
      color: '#495057'
    }
  }
};

export default customSelectStyle;
