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


class PlatformsSpecificationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPlatformModalOpen: false,
      tableRowDetailModalOpen: false,
      addshow: false,
      editId: '0',
    }
  }

  onFind() {
    console.log("find");
  }

  addPlatformModal = () => {
    this.setState({
      addPlatformModalOpen: !this.state.addPlatformModalOpen,
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen,
    })
  }

  openPlatformForm = (row) => {
    this.setState({
      editId: row,
      addPlatformModalOpen: true,
    });
  }

  closePlatformForm = () => {
    this.setState({
      editId: 0,
      addPlatformModalOpen: false,
    });
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

    const { translations } = this.props;
    const { allPlatforms } = this.props;

    console.log(allPlatforms);

    const columns = [

      {
        Header: "ID",
        accessor: 'ID',
        // filterMethod: (filter, row) =>
        //             row[filter.id].startsWith(filter.value),

        // sortMethod: (a, b) => {
        //           if (a.length === b.length) {
        //               return a > b ? 1 : -1;
        //             }
        //           return a.length > b.length ? 1 : -1;
        //       }// String-based value accessors!
      },
      {
        Header: translations['Platform Name'],
        accessor: 'platform',
      },
      {
        Header: "Nomenclature",
        accessor: 'nomenclature',
      },
      {
        Header: "Manufacturer",
        accessor: 'manufacturer'
      },
      {
        Header: "Category",
        accessor: 'category'
      },
      {
        Header: "Category Desc",
        accessor: 'categoryDesc'
      },
      {
        Header: "Role",
        accessor: 'role'
      },
      {
        Header: translations['view'],
        accessor: 'ID',
        filterable: false,
        Cell: row => <span className='number'><img src="/assets/img/general/pen_icon.png" onClick={() => this.openPlatformForm(row.value)} /></span>// Custom cell components!
      }
    ];

    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">
              Platforms Specification
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
          </div>

          <div className="col-md-12 filter-line">
            <div className="add-button">
              <button className="ccir-button" onClick={() => this.openPlatformForm('0')} >Add Specification</button>
            </div>
          </div>

          {this.state.addPlatformModalOpen ?
            <AddPlatform editId={this.state.editId} onClose={this.closePlatformForm} translations={translations} />
            : null}

          <div className="col-md-12">
            <ReactTable
              data={allPlatforms}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable={true}
              defaultFilterMethod={(filter, row) => {
                const id = filter.pivotId || filter.id
                return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
              }}
            />
          </div>
        </div>

        {/* <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/> */}
      </div>
    );
  }
}

PlatformsSpecificationComponent.propTypes = {
  children: PropTypes.element,

};

export default PlatformsSpecificationComponent;
