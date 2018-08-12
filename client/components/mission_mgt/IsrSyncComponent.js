import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import CustomDatePicker from '../reusable/CustomDatePicker';
import StatusTable from "../reusable/StatusTable";


import Timeline from 'react-calendar-timeline/lib';
import moment from 'moment';


class IsrSyncComponent extends React.Component {

  constructor(props) {
    super(props);
  }


  onFind(){
    console.log("find");
  }

  render() {

    const {translations} = this.props;

    const resource = [translations['platform'], translations['personnel'],];
    const view     = [translations['pending'], translations['avaliable'], translations['off-line'], translations['booked'], translations['active'], translations['look-back'],];
    const cocom    = [translations['all'], translations['centcom'], translations['africom'], translations['eucom'], translations['pacom'], translations['northcom'], translations['southcom'], translations['socom'], translations['startcom'], translations['nato'],];
    const unit     = [translations['all'], translations['all ops'], translations['all intel'], '480th', '116th', '70th', '369th', '280th', '233th'];
    const assets_type = [translations['all'], translations['organic'], translations['theater'], translations['sro'],];

    const groups = [
      {id: 1, title: '<table><tr><td style = "padding:20px">aaa</td><td>aaaa</td></tr></table>'},
      {id: 2, title: 'group 2'},
      {id: 3, title: 'group 3'},
    ];

    const items = [
      {id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour')},
        {id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
        {id: 3, group: 3, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
    ];

    const sideTableHeader = [translations['select'], translations['unit'], translations['team'], translations['type'], translations['Location'],] ;
    const sideTableContent = [
      {select:'check', Unit:'116th MIB', team:'Blue', type:'FMV', location:'theater'},
      {select:'check', Unit:'116th MIB', team:'red', type:'Fmv', location:'theater'},
      {select:'check', Unit:'116th MIB', team:'Yellow', type:'fmv', location:'theater'}
    ];



    return (
      <div>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <FullHeaderLine headerText="isr sync" />
          </div>
          <div className="col-md-12 filter-line">
            <MissionMgtDropDown key="1" id="1" label={translations["resource"]} items={resource} />
            <MissionMgtDropDown key="2" id="2" label={translations["view"]} items={view} />
            <MissionMgtDropDown key="3" id="3" label={translations["cocom"]} items={cocom} />
            <MissionMgtDropDown key="4" id="4" label={translations["unit"]} items={unit} />
            <MissionMgtDropDown key="5" id="5" label={translations["assets type"]} items={assets_type} />
            <div className="each-select">
              <div className="date-pic">
                <CustomDatePicker headerText={translations["start"]} />
              </div>
              <div className="date-pic">
                <CustomDatePicker headerText={translations["end"]} />
              </div>
            </div>
            <div className="filter-button">
              <div className="row action-buttons" >
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button className="highlighted-button" onClick={this.onFind.bind(this)}>
                    {translations["find & filter"]}
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <div className="col-md-4" style={{padding:0}}>
              <StatusTable thead={sideTableHeader} lines={sideTableContent} />
            </div>
            <div className="col-md-8" style={{padding:0}}>
              <Timeline
                className="react-calendar-timeline"
                sidebarWidth={0}
                groups={groups}
                lineHeight={51}
                items={items}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IsrSyncComponent.propTypes = {
  children: PropTypes.element,

};

export default IsrSyncComponent;
