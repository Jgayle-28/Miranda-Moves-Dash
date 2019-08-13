import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

// core components
import GridContainer from '../Grid/GridContainer.jsx';
import GridItem from '../Grid/GridItem.jsx';
import navPillsStyle from '../../../assets/jss/material-dashboard-pro-react/components/EsitmateNavPillsStyle.jsx';

class NavPills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    };
  }
  handleChange = (event, active) => {
    this.setState({ active });
  };
  handleChangeIndex = index => {
    this.setState({ active: index });
  };
  render() {
    const {
      classes,
      tabs,
      direction,
      color,
      horizontal,
      alignCenter
    } = this.props;
    const flexContainerClasses = classNames({
      [classes.flexContainer]: true,
      [classes.horizontalDisplay]: horizontal !== undefined
    });
    const tabButtons = (
      <Tabs
        classes={{
          root: classes.root,
          fixed: classes.fixed,
          flexContainer: flexContainerClasses,
          indicator: classes.displayNone
        }}
        value={this.state.active}
        onChange={this.handleChange}
        centered={alignCenter}
        style={{ padding: '0' }}
      >
        {tabs.map((prop, key) => {
          var icon = {};
          if (prop.tabIcon !== undefined) {
            icon['icon'] = <prop.tabIcon className={classes.tabIcon} />;
          }
          const pillsClasses = classNames({
            [classes.pills]: true,
            [classes.horizontalPills]: horizontal !== undefined,
            [classes.pillsWithIcons]: prop.tabIcon !== undefined
          });
          return (
            <Tab
              label={prop.tabButton}
              key={key}
              {...icon}
              classes={{
                root: pillsClasses,
                labelContainer: classes.labelContainer,
                label: classes.label,
                selected: classes[color]
              }}
              style={{
                borderBottom: '1px solid #78909C',
                padding: '0',
                display: 'flex',
                flexDirection: 'row'
              }}
            />
          );
        })}
      </Tabs>
    );
    const tabContent = (
      <div className={classes.contentWrapper}>
        <SwipeableViews
          axis={direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.active}
          onChangeIndex={this.handleChangeIndex}
          style={{ overflowY: 'hidden' }}
        >
          {tabs.map((prop, key) => {
            return (
              <div className={classes.tabContent} key={key}>
                {prop.tabContent}
              </div>
            );
          })}
        </SwipeableViews>
      </div>
    );
    return horizontal !== undefined ? (
      <>
        <GridContainer>
          <GridItem
            {...horizontal.tabsGrid}
            style={{ padding: '0', margin: '0' }}
          >
            <div
              style={{
                textTransform: 'uppercase',
                letterSpacing: '.5px',
                fontWeight: 300,
                width: '100%',
                background: '#003A6C',
                color: '#fff',
                textAlign: 'center',
                padding: '.5rem',
                boxShadow:
                  '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)'
              }}
            >
              Rooms
            </div>
          </GridItem>
          <GridItem
            style={{ maxHeight: '550px', overflow: 'auto' }}
            {...horizontal.contentGrid}
          >
            <div
              style={{
                textTransform: 'uppercase',
                letterSpacing: '.5px',
                fontWeight: 300,
                width: '100%',
                background: '#003A6C',
                color: '#fff',
                textAlign: 'center',
                padding: '.5rem',
                boxShadow:
                  '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)'
              }}
            >
              Item List
            </div>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem
            style={{
              maxHeight: '550px',
              overflow: 'auto',
              padding: '0',
              margin: '0'
            }}
            {...horizontal.tabsGrid}
          >
            {tabButtons}
          </GridItem>
          <GridItem
            style={{
              maxHeight: '550px',
              overflow: 'auto'
            }}
            {...horizontal.contentGrid}
          >
            {tabContent}
          </GridItem>
        </GridContainer>
      </>
    ) : (
      <div>
        {tabButtons}
        {tabContent}
      </div>
    );
  }
}

NavPills.defaultProps = {
  active: 0,
  color: 'primary'
};

NavPills.propTypes = {
  classes: PropTypes.object.isRequired,
  // index of the default active pill
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.func,
      tabContent: PropTypes.node
    })
  ).isRequired,
  color: PropTypes.oneOf([
    'primary',
    'warning',
    'danger',
    'success',
    'info',
    'rose',
    'navy',
    'grey'
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object
  }),
  alignCenter: PropTypes.bool
};

export default withStyles(navPillsStyle)(NavPills);
