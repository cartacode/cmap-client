import PropTypes from 'prop-types';
import React from 'react';
import { MissionConsts } from '../../dictionary/constants';
import FlightOpsPlatform from './flight-ops/FlightOpsPlatform';
import FlightOpsTeam from './flight-ops/FlightOpsTeam';

class FlightOpsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedResource: MissionConsts.RESOURCE.PLATFORM,
      tab: MissionConsts.TABS.FOP,
    };
  }


  updateSelectedResource = (resource) => {
    this.setState({
      selectedResource: resource,
    });
  }

  render = () => {

    const { translations } = this.props;

    return (
      <div>
        { this.state.selectedResource === MissionConsts.RESOURCE.PLATFORM ?
          <FlightOpsPlatform updateResource={this.updateSelectedResource}/>
          : null
        }

        { this.state.selectedResource === MissionConsts.RESOURCE.TEAM ?
          <FlightOpsTeam updateResource={this.updateSelectedResource}/>
          : null
        }
        
      </div>
    );
  }
}

FlightOpsComponent.propTypes = {
  children: PropTypes.element,

};

export default FlightOpsComponent;
