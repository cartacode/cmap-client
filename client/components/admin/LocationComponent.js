import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import CustomDatePicker from '../reusable/CustomDatePicker';
import DropDownButton from '../reusable/DropDownButton';
import FilterDropdown from '../reusable/FilterDropdown';
import StatusTable from '../reusable/StatusTable';
import FormBlock from  '../reusable/FormBlock';
import ContentBlock from "../reusable/ContentBlock";
import ModalFormBlock from '../reusable/ModalFormBlock';

import BaseModal from './location/BaseModal';
import NaiModal from './location/NaiModal';
import PoiModal from './location/PoiModal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import "react-table/react-table.css";
import ReactTable from 'react-table';


class LocationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      filterValue: '',
      filter: [],
      baseModalOpen:false,
      naiModalOpen: false,
      poiModalOpen: false,
      tableRowDetailModalOpen: false,
      baseshow:false,
      naishow:false
    }
  }

  onFind(){
    console.log("find");
  }

  baseModal = () => {
    this.setState({
      baseModalOpen: !this.state.baseModalOpen
    });
  }

  baseForm = () => {
    this.setState({
      baseshow: true,
      naishow:false
    });
  }

  naiForm = () => {
    this.setState({
      naishow: true,
      baseshow:false
    });
  }

  naiModal = () => {
    this.setState({
      naiModalOpen: !this.state.naiModalOpen
    });
  }

  poiModal = () => {
    this.setState({
      poiModalOpen: !this.state.poiModalOpen
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
    })
  }

  componentWillMount() {
    this.props.fetchLocations();

    // console.log("--here is locations fetch---");
    // console.log(data);
  }

  render() {

    const {translations} = this.props;

    const locations = [
      {name:translations['Base'], onClick: this.baseModal},
      {name:translations['NAI'], onClick: this.naiModal},
      {name:translations['POI'], onClick: this.poiModal}
    ];

    const { allLocations } = this.props;

    console.log("That data");
    console.log(allLocations);

    const columns = [
      {
        Header:translations["type"],
        accessor: 'category',
      },
      {
        Header: translations["Name"] ,
        accessor: 'name',
      },
      {
        Header: translations['COCOM'],
        accessor: 'COCOM',
        // Filter: ({ filter, onChange }) =>
        //             <FilterDropdown dropdownDataUrl="COCOM" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/>,
        // sortMethod: (a, b) => {
        //               if (a.length === b.length) {
        //                 return a > b ? 1 : -1;
        //               }
        //               return a.length > b.length ? 1 : -1;
        //             }// String-based value accessors!
      },
      {
        Header: translations["Country"],
        accessor: 'country',

      },
      {
        Header: translations["Region"],
        accessor: 'region',
      },
      {
        Header: translations['unit'],
        accessor: 'region',
      },

      {
        Header: translations['Record Date'],
        accessor: 'region',
      },
      {
        Header: translations['view'],
        accessor: 'view',
        filterable: false,
        Cell: row => <span className='number'><img src="/assets/img/general/eye_icon.png" onClick={this.tableRowDetailModal} /></span> // Custom cell components!
      }
    ];

    const rowFields = [
      {name: translations['Type'], type: 'dropdown'},
      {name: translations['Name'], type: 'input'},
      {name: translations['COCOM'], type: 'dropdown'},
      {name: translations['Country'], type: 'dropdown'},
      {name: translations['Region'], type: 'dropdown'},
      {name: translations['Unit'], type: 'dropdown'},
      {name: translations['Record Date'], type: 'date'},
    ];

    const generalFields = [
      {name: translations['Name'], type: 'input', domID: 'LocationName', valFieldID: 'LocationName'},
      {name: translations['Street/Road'], type: 'input', domID: 'LocationStreet', valFieldID: 'LocationStreet'},
      {name: translations['City/Town'], type: 'input', domID: 'LocationCity', valFieldID: 'LocationCity'},
      {name: translations['Country'], type: 'dropdown', domID: 'dispLocationCountry', ddID: 'Countries', valFieldID: 'LocationCountry'},
      {name: translations['COCOM'], type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM',valFieldID: 'LocationCOCOM'},
      {name: translations['Region'], type: 'dropdown', domID: 'dispLocationRegion', ddID: 'Regions', valFieldID: 'LocationRegion'},
    ];

    const locationFields = [
      {name: translations['Lat'], type: 'number', domID: 'LocationLat', valFieldID: 'LocationLatitude'},
      {name: translations['Lon'], type: 'number', domID: 'LocationLon', valFieldID: 'LocationLongitude'},
      {name: translations['Elevation'], type: 'number', domID: 'LocationElevation', valFieldID: 'LocationElevation'},
      {name: translations['MGRS'], type: 'input', domID: 'LocationMGRS', valFieldID: 'LocationMGRS'},

    ];

    const contactFields = [
      {name: translations['Point of Contact'], type: 'input', domID: 'dispLocationPointofContact', valFieldID:'LocationPointofContact'},
      {name: translations['DSN'], type: 'input', domID: 'DSN', valFieldID: 'LocationDSN'},
      {name: translations['Email-NIPR'], type: 'input', domID: 'EmailNIPR', valFieldID: 'LocationEmailNIPR'},
      {name: translations['Email-SIPR'], type: 'input', domID: 'EmailSIPR', valFieldID: 'LocationEmailSIPR'},
      {name: translations['Frequency'], type: 'number', domID: 'LocationFrequency', valFieldID: 'LocationFrequency'},
      {name: translations['Chat ID'], type: 'input', domID: 'ChatID', valFieldID: 'LocationChatID'},
    ];


    return (
      <div>
        <div className="row orders-assets">
          <div className="row">

          </div>
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["Location"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <DropDownButton key = '1' label={translations["Add Location"]} id="1" items={locations}/>
            </div>
          </div>

          <BaseModal show={this.state.baseModalOpen} onClose={this.baseModal} translations = {translations}/>
          <NaiModal show={this.state.naiModalOpen} onClose={this.naiModal} translations = {translations}/>
          <PoiModal show={this.state.poiModalOpen} onClose={this.poiModal} translations = {translations}/>

                <br/>
          <div className="row personnel">
          <div className="col-md-12">
            <ReactTable
              data={allLocations}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable={true}
						  defaultFilterMethod={(filter, row) => {
							    const id = filter.pivotId || filter.id;
                  return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
                }}
            />
          </div>
          </div>
        </div>


        <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/>
      </div>
    );
  }
}

LocationComponent.propTypes = {
  children: PropTypes.element,

};

export default LocationComponent;
