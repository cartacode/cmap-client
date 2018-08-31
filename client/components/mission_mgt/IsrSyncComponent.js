import PropTypes from 'prop-types';
import React from 'react';
import 'react-table/react-table.css';
import TimelineFilter from '../reusable/TimelineFilter';



class IsrSyncComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultResource: '1',
      tab: 'ISR',
      showUnitType: true,
    };
  }

  render() {
    const { translations } = this.props;

    const resource = [
      { 'id': '1', 'description': translations.platform },
      { 'id': '2', 'description': translations.teams },
    ];
    
    return (
      <div>
        <TimelineFilter translations={translations} headerTxt={translations['isr sync']} defaultResource={this.state.defaultResource} tab={this.state.tab} resource={resource} showUnitType={this.state.showUnitType}/>
      </div>
    );
  }
}

IsrSyncComponent.propTypes = {
  children: PropTypes.element,

};

export default IsrSyncComponent;
