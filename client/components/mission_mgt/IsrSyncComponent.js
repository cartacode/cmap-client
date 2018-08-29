import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import 'react-table/react-table.css';
import TimelineFilter from '../reusable/TimelineFilter';



class IsrSyncComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultResource: '1',
      tab: 'ISR',
    };
  }

  render() {
    const { translations } = this.props;

    const resource = [
      { 'id': '1', 'description': translations.platform },
      { 'id': '2', 'description': translations.personnel },
    ];
    
    return (
      <div>
        <TimelineFilter translations={translations} headerTxt="isr sync" defaultResource={this.state.defaultResource} tab={this.state.tab} resource={resource} />
      </div>
    );
  }
}

IsrSyncComponent.propTypes = {
  children: PropTypes.element,

};

export default IsrSyncComponent;
