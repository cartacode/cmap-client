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
      editId: '0',
    }
  }

  componentWillMount() {

    this.props.fetchPersonnels();
  }

  onFind() {
    console.log('find');
  }

  addPersonnelModal = () => {    
    this.setState({
      addPersonnelModalOpen: !this.state.addPersonnelModalOpen,
    });
  }

  addPersonnelForm = () => {

    this.setState({
      addshow: !this.state.addshow
    });
  }

  openForm = () => {
    console.log('Opne Form');

  }

  tableRowDetailModal = () => {
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

getOnePersonnel = (row) => {
  this.props.fetchPersonnelById(row);
  this.setState({
    addPersonnelModalOpen: !this.state.addPersonnelModalOpen
  });
}

openPersonnelForm = (row) => {
  this.setState({
    editId: row,
    addPersonnelModalOpen: true,
  });
}

closePersonnelForm = () => {
  this.setState({
    editId: 0,
    addPersonnelModalOpen: false,
  });
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
      Cell: row => <span className='number'><img src="/assets/img/general/pen_icon.png" onClick={() => this.openPersonnelForm(row.value)} /></span>,
    },
  ];

  return (
    <div>
      <div className="row orders-assets">
        <div className="header-line">
          <img src="/assets/img/admin/personnel_1.png" alt=""/>
          <div className="header-text">
            {translations['personnel']}
          </div>
          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
        </div>
        <div className="col-md-12 filter-line">
          <div className="add-button">
            <button className="ccir-button" onClick={() => this.openPersonnelForm('0')} >{translations["Add Personnel"]}</button>
          </div>
        </div>
        {this.state.addPersonnelModalOpen ?
          <AddPersonnel editId = {this.state.editId} onClose={this.closePersonnelForm} translations = {translations}/>
          : null
        }
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


        {/* <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/> */}
      </div>
    );
  }
}

PersonnelComponent.propTypes = {
  children: PropTypes.element,
};

export default PersonnelComponent;
