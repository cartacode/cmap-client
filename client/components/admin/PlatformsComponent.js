import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UploadBlock from "../reusable/UploadBlock";
import ContentBlock from "../reusable/ContentBlock";
import ButtonsList from "../reusable/ButtonsList";
import FilterDropdown from '../reusable/FilterDropdown';
import Dropdown from '../reusable/Dropdown';
import FilterDatePicker from '../reusable/FilterDatePicker';
import DropDownButton from '../reusable/DropDownButton';
import StatusTable from '../reusable/StatusTable';

import AddPlatform from './platform/AddPlatformModal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import "react-table/react-table.css";
import ReactTable from 'react-table';


class PlatformComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      filterValue: '',
      filter: [],
      addPlatformModalOpen:false,
      tableRowDetailModalOpen: false,
    }
  }

  onFind(){
    console.log("find");
  }

  addPlatformModal = () => {
    this.setState({
      addPlatformModalOpen: !this.state.addPlatformModalOpen
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
    })
  }


  componentWillMount() {

    this.props.fetchPlatforms();
  }

  // renderItems(optionItem) {
  //   let items = [{"label": "-Select Item-", "value": 0}];
  //   optionItem.map((item, i) => {
  //       items.push({"label": item.description, "value": i});
  //   });
  //   return items.map(function(data, key){
  //       if(data.label == "-Select Item-"){
  //         return ( <option key={key} value=""> {data.label} </option>) ;
  //       } else {
  //         return (<option key={key} value={data.label}>{data.label}</option> );
  //       }
  //   })
  // }

  handleChange(value) {
    console.log(value);
  }

  render() {

    const {translations} = this.props;
    const {allPlatforms} = this.props;

    console.log(allPlatforms);

    const columns = [

      {
        Header: translations["Tail#"],
        accessor: 'tail',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),

        sortMethod: (a, b) => {
                  if (a.length === b.length) {
                      return a > b ? 1 : -1;
                    }
                  return a.length > b.length ? 1 : -1;
              }// String-based value accessors!
      },
      {
        Header: translations['Platform Name'],
        accessor: 'platform',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['Category'],
        accessor: 'category',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['Service'],
        accessor: 'branchOfService'
      },
      {
        Header: translations['Location'],
        accessor: 'location'
      },
      {
        Header: translations['view'],
        accessor: 'view',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/eye_icon.png" onClick={this.tableRowDetailModal} /></span>// Custom cell components!
      }
    ];

    const rowFields = [
      {name: translations['Tail#'], type: 'input', valField:'aaa'},
      {name: translations['Platform Name'], type: 'input'},
      {name: translations['Category'], type: 'input'},
      {name: translations['Service'], type: 'input'},
      {name: translations['Owning Unit'], type: 'input'},
      {name: translations['Location'], type: 'dropdown'},
      {name: translations['Record Date'], type: 'date'},
    ];

    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["platform"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <button className="ccir-button" onClick={this.addPlatformModal} >{translations["Add Platform"]}</button>
            </div>
          </div>

          <AddPlatform show={this.state.addPlatformModalOpen} onClose={this.addPlatformModal} translations = {translations}/>

          <div className="col-md-12">
            <ReactTable
              data={allPlatforms}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            />
          </div>
        </div>

        <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/>
      </div>
    );
  }
}

PlatformComponent.propTypes = {
  children: PropTypes.element,

};

export default PlatformComponent;
