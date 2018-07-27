import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import FormBlock from '../reusable/FormBlock';
import NoHeaderTable from '../reusable/NoHeaderTable';
import StatusTable from '../reusable/StatusTable';

import Timeline from 'react-calendar-timeline/lib';
import moment from 'moment';


class AtoComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  onClear(){
    console.log("clear");
  }

  onRoute(){
    console.log("route");
  }

  render() {

    const {translations: {translations}} = this.props;

    const intelRequest1 = [
      {name: translations['Support Command'], type: 'input'},
      {name: translations['Named Operation'], type: 'input'},
      {name: translations['Mission Type'], type: 'input'},
      {name: translations['Active Dates'], type: 'input'},
    ];

    const intelRequest2 = [
      {name: translations['Priority Intel Reg'], type: 'input'},
      {name: translations['Primary Sensor'], type: 'input'},
      {name: translations['Secondary Sensor'], type: 'input'},
      {name: translations['Armed'], type: 'input'},
    ];

    const intelRequest3 = [
      {name: translations['Best Collection Time'], type: 'input'},
      {name: translations['Latest Time of Intel Value'], type: 'input'},
      {name: translations['Report Classification'], type: 'input'},
      {name: translations['LIMIDS Request'], type: 'input'},
    ];

    const pedTeam = [
      {mission:'116th MIB', team:'team red', flatform:'fmv', del:'del'},
    ];

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

    const sideTableHeader = [translations['select'], translations['Location'], translations['platform'], translations['tail'], translations['type'],] ;
    const sideTableContent = [
      {select:'check', location:'bagram, afg', platform:'readator', tail:'04-4021', type:'theater'},
      {select:'check', location:'bagram, afg', platform:'readator', tail:'04-4021', type:'theater'},
      {select:'check', location:'bagram, afg', platform:'readator', tail:'04-4021', type:'theater'}
    ];


    return (
      <div>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["intelligence request"]} />
          </div>
          <FormBlock fields={intelRequest1} />
          <FormBlock fields={intelRequest2} />
          <FormBlock fields={intelRequest3} />            
        </div>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["a-isr platforms available"]} />
          </div>
          <div className="col-md-12">
            <div className="col-md-4" style={{padding:0}}>
              <StatusTable thead={sideTableHeader} lines={sideTableContent} />
            </div>
            <div className="col-md-8" style={{padding:0}}>
              <Timeline
                className="react-calendar-timeline" 
                sidebarWidth="0"
                groups={groups}
                lineHeight="51"
                items={items}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
              />
            </div>
          </div>
        </div>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["selected platform and ped teams"]} />
          </div>
          <div className="col-md-12">
            <NoHeaderTable lines={pedTeam} />
          </div>
        </div>
        <div className="row action-buttons" >
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button className="highlighted-button" onClick={this.onClear.bind(this)}>
              {translations["clear"]}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button className="highlighted-button" onClick={this.onRoute.bind(this)}>
              {translations["route"]}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

AtoComponent.propTypes = {
  children: PropTypes.element,

};

export default AtoComponent;
