import React from 'react';
// material-ui components
import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// @material-ui/icons
import Close from '@material-ui/icons/Close';
// core components
import Button from '../CustomButtons/Button.jsx';
import GridContainer from '../Grid/GridContainer.jsx';
import GridItem from '../Grid/GridItem.jsx';

import modalStyle from '../../../assets/jss/material-dashboard-pro-react/modalStyle.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class NewOppModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        // classes={{
        //   root: classes.center,
        //   paper: classes.modal
        // }}
        maxWidth="xl"
        scroll="body"
        open={this.props.open}
        transition={Transition}
        // keepMounted
        onClose={() => this.handleClose('modal')}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            // width: '100%',
            // hght: '100%',
            boxShadow: 'none'
          }
        }}
      >
        {/* <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              justIcon
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="transparent"
              onClick={() => this.handleClose('modal')}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Modal title</h4>
          </DialogTitle> */}
        {/* <GridContainer justify="center">
          <GridItem xs={12} sm={12}> */}
        <DialogContent
          id="modal-slide-description"
          // className={classes.modalBody}
        >
          {this.props.children}
        </DialogContent>
        {/* </GridItem>
        </GridContainer> */}
        {/* <DialogActions
            className={classes.modalFooter + ' ' + classes.modalFooterCenter}
          >
            <Button onClick={() => this.handleClose('modal')}>
              Never Mind
            </Button>
            <Button onClick={() => this.handleClose('modal')} color="success">
              Yes
            </Button>
          </DialogActions> */}
      </Dialog>
    );
  }
}

export default withStyles(modalStyle)(NewOppModal);
