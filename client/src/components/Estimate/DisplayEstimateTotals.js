import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EstimateItemTable from './EstimateItemTable';
import AllRoomsTable from './AllRoomsTable';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Badge from '../components/Badge/Badge.jsx';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxHeight: 400,
    overflow: 'auto'
  },
  chipRoot: {
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { inventory } = props;

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="full width tabs example"
        >
          <Tab label="All Rooms" {...a11yProps(0)} />
          {inventory &&
            inventory.map((room, i) => (
              <Tab label={room.roomName} {...a11yProps(i + 1)} />
            ))}

          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/***** to display items and totals in table *****/}
          <AllRoomsTable
            updateItem={props.updateItem}
            deleteItem={props.deleteItem}
            inventory={inventory}
          />
        </TabPanel>
        {/***** ROOM PANELS ******/}
        {inventory &&
          // map through inventory
          inventory.map((room, i) => (
            // map through the rooms create a panel and table pass in items
            <TabPanel key={i} value={value} index={i + 1} dir={theme.direction}>
              <EstimateItemTable
                updateItem={props.updateItem}
                roomName={room.roomName}
                deleteItem={props.deleteItem}
                items={room.items}
              />
            </TabPanel>
          ))}
      </SwipeableViews>
    </div>
  );
}
