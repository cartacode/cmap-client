import PropTypes from 'prop-types';
import React from 'react';
import 'react-table/react-table.css';
import TimelineFilter from '../reusable/TimelineFilter';
import { MissionConsts } from '../../dictionary/constants';


class IsrSyncComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.PLATFORM,
      tab: MissionConsts.TABS.ISR,
      // showUnitType: true,
    };
  }

  render() {
    const { translations } = this.props;

    
    
    return (
      <div>
        <TimelineFilter translations={translations} headerTxt={translations['isr sync']} defaultResource={this.state.defaultResource} tab={this.state.tab} showUnitType={this.state.showUnitType}/>
      </div>
    );
  }
}

IsrSyncComponent.propTypes = {
  children: PropTypes.element,

};

export default IsrSyncComponent;
