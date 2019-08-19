import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Fab from '@material-ui/core/Fab';
import GridContainer from '../components/Grid/GridContainer.jsx';
import GridItem from '../components/Grid/GridItem.jsx';
import EstimateHeader from './EstimateHeader';
// Panel components
import Inventory from './Inventory';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '1rem'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

const Estimate = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { user } = props.location.state;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="Add"
        // className={classes.fab}
        style={{
          backgroundColor: '#90A4AE',
          color: 'white',
          margin: '1rem',
          zIndex: 9,
          position: 'fixed',
          top: '6rem',
          left: '1.2rem'
        }}
        onClick={() => this.props.history.goBack()}
      >
        <KeyboardBackspace />
      </Fab>
      <GridContainer justify="center">
        <EstimateHeader user={user} />
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <div className={classes.root}>
            <ExpansionPanel
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>Inventory</Typography>
                <Typography className={classes.secondaryHeading}>
                  Create {user.first_name} {user.last_name}'s Inventory
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {/* Inventory component */}
                <Inventory user={user} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={classes.heading}>
                  Supplies / Services
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Add {user.first_name} {user.last_name}'s Supplies & services
                  rendered
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <h1>Supplies and services component will go here</h1>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className={classes.heading}>Finalize</Typography>
                <Typography className={classes.secondaryHeading}>
                  Please Confirms {user.first_name} {user.last_name}'s estimate
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <h1>Display pdf and confirmation details here</h1>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel4'}
              onChange={handleChange('panel4')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>Actions</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <h1>Add actions here?</h1>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </GridItem>
      </GridContainer>
    </>
  );
};
export default Estimate;
