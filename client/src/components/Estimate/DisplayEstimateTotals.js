import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
    width: '100%'
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
          {/* {inventory &&
            inventory.map((item, i) => <li key={i}>{item.name}</li>)} */}
        </TabPanel>
        {/***** UNCOMMENT TO CREATE TAB PANELS ******/}

        {/* {inventory &&
          // map through inventory
          inventory.map((room, i) => (
            // map through the rooms
            <TabPanel key={i} value={value} index={i + 1} dir={theme.direction}>
              {room.items.map((item, i) => (
                <li key={i}>{item.name}</li>
              ))}
            </TabPanel>
          ))} */}

        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}

// import React from 'react';
// import BugReport from '@material-ui/icons/BugReport';
// import Code from '@material-ui/icons/Code';
// import Cloud from '@material-ui/icons/Cloud';
// // core components
// import Tabs from '../components/CustomTabs/CustomTabs.jsx';
// import Tasks from '../components/Tasks/Tasks.jsx';
// import { bugs, website, server } from '../../variables/general.jsx';

// const DisplayEstimateTotals = () => {
//   return (
//     <>
//       <Tabs
//         title="Totals:"
//         headerColor="info"
//         // TODO map through rooms and create a tab for each
//         // TODO const tabs = rooms.map ((room,i) => { tabName: room.roomName, tabContent: (<DisplayRoom ={room.roomData} />)})
//         tabs={[
//           {
//             tabName: 'All Rooms',
//             tabIcon: BugReport,
//             tabContent: (
//               <Tasks
//                 checkedIndexes={[0, 3]}
//                 tasksIndexes={[0, 1, 2, 3]}
//                 tasks={bugs}
//               />
//             )
//           },
//           {
//             tabName: 'Website',
//             tabIcon: Code,
//             tabContent: (
//               <Tasks
//                 checkedIndexes={[0]}
//                 tasksIndexes={[0, 1]}
//                 tasks={website}
//               />
//             )
//           },
//           {
//             tabName: 'Server',
//             tabIcon: Cloud,
//             tabContent: (
//               <Tasks
//                 checkedIndexes={[1]}
//                 tasksIndexes={[0, 1, 2]}
//                 tasks={server}
//               />
//             )
//           }
//         ]}
//       />
//     </>
//   );
// };

// export default DisplayEstimateTotals;
