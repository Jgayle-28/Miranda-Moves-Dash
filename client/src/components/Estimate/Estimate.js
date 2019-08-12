import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridContainer from '../components/Grid/GridContainer.jsx';
import GridItem from '../components/Grid/GridItem.jsx';
import EstimateNavPills from '../components/NavPills/EstimateNavPills.jsx';
// import Accordion from '../components/Accordion/Accordion.jsx';
import Card from '../components/Card/Card.jsx';
import CardHeader from '../components/Card/CardHeader.jsx';
import CardBody from '../components/Card/CardBody.jsx';
import Description from '@material-ui/icons/Description';

class Estimate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    prop: PropTypes
  };
  //TODO Create sendState() function in estimate nave pills to send allStates data between all  rooms
  // TODO passin room name as a props to the component that matches the state in parent(this component)
  // TODO when the room is updated call function that adds it to the sate of this component

  render() {
    console.log('Esitmate props', this.props.location.state.user);
    const { user } = this.props.location.state;
    return (
      <>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card raised>
              <CardHeader
                color="navy"
                style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'flex-end'
                }}
              >
                <Description
                  style={{ fontSize: '30px', padding: '0', margin: '0' }}
                />
                <p
                  style={{
                    fontWeight: '400',
                    fontSize: '14px'
                  }}
                >
                  {' '}
                  <span
                    style={{
                      margin: '0 .5rem 1rem 1rem'
                    }}
                  >
                    {user.first_name} {user.last_name}
                  </span>{' '}
                  //{' '}
                  <span
                    style={{
                      margin: '0 .5rem 1rem'
                    }}
                  >
                    {user.phone}
                  </span>{' '}
                  //{' '}
                  <span
                    style={{
                      margin: '0 .5rem 1rem'
                    }}
                  >
                    {user.email}
                  </span>
                </p>
              </CardHeader>
              <CardBody>
                <EstimateNavPills
                  color="navy"
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 12, md: 2 },
                    contentGrid: { xs: 12, sm: 12, md: 10 }
                  }}
                  tabs={[
                    {
                      tabButton: 'Family Room',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Living Room',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Dining Room',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Master Bedroom',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Office Room',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Bedroom 2',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Bedroom 3',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Bedroom 4',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Bedroom 5',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Garage',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Yard / Patio',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Laundry Room',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Basement',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Bathroom',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Reception',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Conference Room',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Waiting Room',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    },
                    {
                      tabButton: 'Break Room',
                      // tabIcon: Home,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>This is very nice.</p>
                        </span>
                      )
                    }
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <h1>Will display totals here</h1>
            </Card>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}
export default Estimate;
