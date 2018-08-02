import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import UploadBlock from "../reusable/UploadBlock";
// import ContentBlock from "../reusable/ContentBlock";
// import ButtonsList from "../reusable/ButtonsList";
// import FilterDropdown from '../reusable/FilterDropdown';
// import Dropdown from '../reusable/Dropdown';
// import FilterDatePicker from '../reusable/FilterDatePicker';
// import DropDownButton from '../reusable/DropDownButton';
// import StatusTable from '../reusable/StatusTable';

import AddPersonnel from './personnel/AddPersonnelModal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Switch, Route, NavLink } from 'react-router-dom';


import "react-table/react-table.css";
import ReactTable from 'react-table';


class PersonnelComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPersonnelModalOpen: false,
      tableRowDetailModalOpen: false,
      addshow: false,
      editId: null,
    };
  }

  componentWillMount() {
    this.props.fetchPersonnels();
  }

  addPersonnelModal = (row) => {    
    this.setState({
      editId: row,
      addPersonnelModalOpen: !this.state.addPersonnelModalOpen,
    });
  }

  addPersonnelForm = () => {

    this.setState({
      addshow: !this.state.addshow
    });
  }

  openForm = () => {
    console.log("Okay");

  }

  tableRowDetailModal = (row) => {
    // this.props.onePersonnel();
    console.log('row ==> ' + JSON.stringify(row));
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
    });
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
    const { allPersonnels } = this.props;
    const columns = [

      {
        Header: translations["First Name"],
        accessor: 'firstName',
        filterMethod: (filter, row) =>
          row[filter.id].startsWith(filter.value),
      },
      {
        Header: translations['Last Name'],
        accessor: 'lastName',
      },
      {
        Header: translations['Rank'],
        accessor: 'rank.description',

      },
      {
        Header: translations['Service'],
        accessor: 'branchOfService.description',
      },
      {
        Header: translations['Deployed Unit'],
        accessor: 'deployedUnit.description',
      },
      {
        Header: translations['CAC ID'],
        accessor: 'CACID',
      },
      {
        Header: translations['view'],
        accessor: 'ID',
        filterable: false,
        Cell: row => <span className="number"><img src="/assets/img/general/eye_icon.png" onClick={() => this.addPersonnelModal(row.value)} /></span> // Custom cell components!
      },
    ];

    const rowFields = [
      {name: translations['First Name'], type: 'input'},
      {name: translations['Last Name'], type: 'input'},
      {name: translations['Rank'], type: 'dropdown'},
      {name: translations['Service'], type: 'input'},
      {name: translations['Deployed Unit'], type: 'dropdown'},
      {name: translations['CAC ID'], type: 'input'},
      {name: translations['Record Date'], type: 'date'},
    ];



    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["personnel"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <button className="ccir-button" onClick={() => this.addPersonnelModal(0)}>{translations["Add Personnel"]}</button>
            </div>
          </div>

          <AddPersonnel show={this.state.addPersonnelModalOpen} editId={this.state.editId} onClose={this.addPersonnelModal} translations = {translations}/>

          <div className="col-md-12">
            <ReactTable
              data={allPersonnels}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            />
          </div>
        </div>


        {/* <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} itemid={this.state.editId} rowdata = {rowFields} translations = {translations}/> */}
      </div>
    );
  }
}

PersonnelComponent.propTypes = {
  children: PropTypes.element,

};

export default PersonnelComponent;
