import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormBlock from '../reusable/FormBlock';
import FullHeaderLine from '../reusable/FullHeaderLine';
import StatusTable from '../reusable/StatusTable';


class LiveViewComponent extends React.Component {

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

    const missionBlock1= [
      {name: translations['Mission Name'], type: 'input'},
      {name: translations['Mission#'], type: 'input'},
      {name: translations['Originating Req #'], type: 'input'},
      {name: translations['Air Tasking Order #'], type: 'input'},
      {name: translations['ATO Issue Date'], type: 'input'},
      {name: translations['Supported Command'], type: 'input'},
      {name: translations['Supported Unit'], type: 'input'},
      {name: translations['Named Operation'], type: 'input'},
      {name: translations['Mission Type'], type: 'input'},
      {name: translations['Sub-Mission Type'], type: 'input'},
      {name: translations['Active Dates'], type: 'input'},
    ];

    const missionBlock2= [
      {name: translations['ISR Asset Country'], type: 'input'},
      {name: translations['ISR Unit'], type: 'input'},
      {name: translations['ISR Platform'], type: 'input'},
      {name: translations['Primary Payload'], type: 'input'},
      {name: translations['Secondary Payload'], type: 'input'},
      {name: translations['Armed'], type: 'input'},
      {name: translations['Operations Area'], type: 'input'},
      {name: translations['Air Operation Center'], type: 'input'},
      {name: translations['Collection Operations COCOM'], type: 'input'},
      {name: translations['Take-off Beddown COCOM'], type: 'input'},
      {name: translations['Recovery Beddown COCOM'], type: 'input'},
    ];

    const missionBlock3= [
      {name: translations['Priority Intel Req'], type: 'input'},
      {name: translations['Departure Time'], type: 'input'},
      {name: translations['On Station'], type: 'input'},
      {name: translations['Off Station'], type: 'input'},
      {name: translations['Land Time'], type: 'input'},
      {name: translations['Best Collection Time'], type: 'input'},
      {name: translations['Latest Time of Intel Value'], type: 'input'},
      {name: translations['Report Classification'], type: 'input'},
      {name: translations['PED Team']+' #1', type: 'input'},
      {name: translations['PED Team']+' #2', type: 'input'},
      {name: translations['PED Team']+' #3', type: 'input'},
    ];

    const requirementsHeader = [translations['Priority#'], translations['eei#'], translations['Name'], translations['threat'], translations['Location'], translations['grid'], translations['POIs'], translations['LIMIDS Request'], translations['view'], translations['edit'], translations['del'],];
    const requirementContent = [
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
    ];

    return (
      <div>
        <div className="row mission-mgt">
          <div className="col-md-12 header-line">
            <img className="full-line" src="/images/general/full_line.png" />
          </div>
          <div className="col-md-12">
            <FormBlock fields={missionBlock1} />
            <FormBlock fields={missionBlock2} />
            <FormBlock fields={missionBlock3} />
          </div>
        </div>
        <div className="row mission-mgt">
          <div className="col-md-12 header-line">
            <FullHeaderLine headerText={translations["requirements/eei's"]} />
          </div>
          <div className='col-md-12'>
            <StatusTable thead={requirementsHeader} lines={requirementContent} />
          </div>
        </div>
        <div className="row mission-mgt">
          <div className="col-md-12 header-line">
            <FullHeaderLine headerText={translations["special instructions/notes"]} />
          </div>
          <div className="col-md-12 special-instruction">
            this mission will be coordinated in conjunction with local forces. a joint, pre-mission planning meeting will be held at the jioc at 0900 tuesday
          </div>
          <div className="col-md-12 instructors">
            <div className="col-md-6 prepare-instructor">
              <span className="name-label">{translations["prepared by:"]}  </span>
              LTC John Smith            
            </div>
            <div className="col-md-6 approve-instructor">
              <span className="name-label">{translations["approved by:"]} </span>
              CMD paul Matis
            </div>
          </div>
        </div>
        <div className="row action-buttons" >
          <div className="menu-button">
            <img className="line" src="/images/admin/edit_up.png" alt=""/>
            <button className="highlighted-button" onClick={this.onClear.bind(this)}>
              {translations["clear"]}
            </button>
            <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
          </div>
          <div className="menu-button">
            <img className="line" src="/images/admin/edit_up.png" alt=""/>
            <button className="highlighted-button" onClick={this.onRoute.bind(this)}>
              {translations["route"]}
            </button>
            <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

LiveViewComponent.propTypes = {
  children: PropTypes.element,

};

export default LiveViewComponent;
