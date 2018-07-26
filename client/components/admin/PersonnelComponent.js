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

import AddPersonnelModal from './personnel/AddPersonnelModal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



import "react-table/react-table.css";
import ReactTable from 'react-table';

import { makeData } from '../../actions/actions';


class PersonnelComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      filterValue: '',
      filter: [],
      addPersonnelModalOpen:false,
      tableRowDetailModalOpen: false,
    }
  }

  onFind(){
    console.log("find");
  }

  addPersonnelModal = () => {
    console.log("Okayman");
    this.setState({
      addPersonnelModalOpen: !this.state.addPersonnelModalOpen
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
    })
  }


  componentWillMount() {

    this.props.fetchPersonnels();
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

    const {translations: {translations}} = this.props;
    const {all_personnels} = this.props;

    console.log(all_personnels);

    const columns = [

      {
        Header: translations["First Name"],
        accessor: 'type',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
      },
      {
        Header: translations['Last Name'],
        accessor: 'payload',
      },
      {
        Header: translations['Rank'],
        accessor: 'serial',

      },
      {
        Header: translations['Service'],
        accessor: 'status',
      },
      {
        Header: translations['Deployed Unit'],
        accessor: 'remark',
      },
      {
        Header: translations['CAC ID'],
        accessor: 'etic',
      },
      {
        Header: translations['view'],
        accessor: 'view',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/eye_icon.png" onClick={this.tableRowDetailModal} /></span>// Custom cell components!
      }
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
            <img src="/images/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["personnel"]}
            </div>
            <img className="mirrored-X-image" src="/images/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <button className="ccir-button" onClick={this.addPersonnelModal} >{translations["Add Personnel"]}</button>
            </div>
          </div>
          <div className="col-md-12">
            <ReactTable
              data={all_personnels}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            />
          </div>
        </div>

        <AddPersonnelModal show={this.state.addPersonnelModalOpen} onClose={this.addPersonnelModal} translations = {translations}/>
        <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/>
      </div>
    );
  }
}

PersonnelComponent.propTypes = {
  children: PropTypes.element,

};

export default PersonnelComponent;
