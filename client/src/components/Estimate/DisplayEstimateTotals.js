import React from 'react';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
// core components
import Tabs from '../components/CustomTabs/CustomTabs.jsx';
import Tasks from '../components/Tasks/Tasks.jsx';
import { bugs, website, server } from '../../variables/general.jsx';

const DisplayEstimateTotals = () => {
  return (
    <>
      <Tabs
        title="Totals:"
        headerColor="info"
        tabs={[
          {
            tabName: 'All Rooms',
            tabIcon: BugReport,
            tabContent: (
              <Tasks
                checkedIndexes={[0, 3]}
                tasksIndexes={[0, 1, 2, 3]}
                tasks={bugs}
              />
            )
          },
          {
            tabName: 'Website',
            tabIcon: Code,
            tabContent: (
              <Tasks
                checkedIndexes={[0]}
                tasksIndexes={[0, 1]}
                tasks={website}
              />
            )
          },
          {
            tabName: 'Server',
            tabIcon: Cloud,
            tabContent: (
              <Tasks
                checkedIndexes={[1]}
                tasksIndexes={[0, 1, 2]}
                tasks={server}
              />
            )
          }
        ]}
      />
    </>
  );
};

export default DisplayEstimateTotals;
