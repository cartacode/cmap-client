import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import CustomDatePicker from '../reusable/CustomDatePicker';
import StatusTable from "../reusable/StatusTable";
import DropDownButton from '../reusable/DropDownButton';

import Timeline from 'react-calendar-timeline/lib';
import moment from 'moment';


class OrdersComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  onFind(){
    console.log("find");
  }

  render() {

    const {translations: {translations}} = this.props;

    const cocom    = [translations['all'], translations['centcom'], translations['africom'], translations['eucom'], translations['pacom'], translations['northcom'], translations['southcom'], translations['socom'], translations['startcom'], translations['nato'],];
    const unit     = [translations['all'], translations['all ops'], translations['all intel'], '480th', '116th', '70th', '369th', '280th', '233th'];
    const ordersType = [
      {name:translations['all'],  onClick:''},
      {name:translations['Exord'],  onClick:''},
      {name:translations['Dsca'],  onClick:''},
      {name:translations['Opord'],  onClick:''},
      {name:translations['Opcon'],  onClick:''},
      {name:translations['Tacon'],  onClick:''},
      {name:translations['Juons'],  onClick:''},
      {name:translations['Frago'],  onClick:''},
      {name:translations['Travel'],  onClick:''}
    ];

    const groups = [
      {id: 1, title: 'group 1'},
      {id: 2, title: 'group 2'},
      {id: 3, title: 'group 3'},
      {id: 4, title: 'group 4'},
    ];

    const items = [
      {id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour')},
        {id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
        {id: 3, group: 3, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')},
        {id: 4, group: 4, title: 'item 4', start_time: moment().add(2, 'hour'), end_time: moment().add(4, 'hour')}
    ];

    const sideTableHeader = [translations['Location'], translations['platform'], translations['tail'], translations['status'], translations['move date'], translations['order#'],] ;
    const sideTableContent = [
      {location:'bagram, afg', flatform:'peadator', tail:'04-4021', status:'hold', move:'N/A', order:'N/A'},
      {location:'bagram, afg', flatform:'peadator', tail:'04-4021', status:'hold', move:'N/A', order:'N/A'},
      {location:'bagram, afg', flatform:'rc-135', tail:'14-3532', status:'outbound', move:'11-NOv-17', order:'1o1-68'},
      {location:'bagram, afg', flatform:'rc-135', tail:'14-3532', status:'outbound', move:'11-NOv-17', order:'1o1-68'}
    ];

    const order_type= [translations['all'],translations['Exord'], translations['Dsca'], translations['Opord'], translations['Tacon'], translations['Juons'], translations['Frago'], translations['Travel'],];
    return (
      <div>
        <div className="row orders-assets">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["orders"]} />
          </div>
          <div className="col-md-12 filter-line">
            <div className="filter-items">
              
              <MissionMgtDropDown key="3" id="3" label={translations["cocom"]} items={cocom} />
              <MissionMgtDropDown key="4" id="4" label={translations["unit"]} items={unit} />
              <MissionMgtDropDown key="5" id="5" label={translations["Order Type"]} items={order_type} />
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
            <div className="add-button">
              <DropDownButton key = '1' label={translations["Generate Order"]} id="1" items={ordersType} />
            </div>
          </div>
        </div>
        <div className="row orders-assets">
          <div className="col-md-12">
            <div className="col-md-5" style={{padding:0}}>
              <StatusTable thead={sideTableHeader} lines={sideTableContent} />
            </div>
            <div className="col-md-7" style={{padding:0}}>
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
      </div>
    );
  }
}

OrdersComponent.propTypes = {
  children: PropTypes.element,

};

export default OrdersComponent;
