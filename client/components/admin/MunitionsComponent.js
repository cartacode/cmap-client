import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import AddMunitionsInventory from './munitions/AddMunitionsInventory';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class MunitionsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addMunitionsInventoryOpen:false,
      rocketModalOpen: false,
      gunModalOpen: false,      
      serialVal:'',
      nameVal:'',
      form : {
        type: 'Test'
      },
      editId: '0',

    }
  }

  componentDidMount() {
    this.props.fetchMunitionInventory();
  }

openMunitionsForm = (row) => {
  this.setState({
    editId: row,
    addMunitionsInventoryOpen: true,
  });
}

closeMunitionsForm = () => {
  this.notify();
  this.props.fetchMunitionInventory();
  this.setState({
    editId: '0',
    addMunitionsInventoryOpen: false,
  });
}

notify =()=>{
  const { translations } = this.props;
  if (this.state.editId !== undefined && this.state.editId !== '0') {
    NotificationManager.success(translations['Update Munition Inventory Message'], translations['Munition Inventory Title'], 5000);
  }else{
    NotificationManager.success(translations['Add Munition Inventory Message'], translations['Munition Inventory Title'], 5000);
  }
}

  handleForm = () => {
    console.log("here");
    this.setState({
      form: {
        type: 'Air-to-surface'
      }
    }, () => {
     // console.log("New state in ASYNC callback:22222", this.state.intelRequest);
    });
  }

  render() {

    const {translations} = this.props;

    const munitions = [
      {name:translations['Missile'], onClick:this.missileModal},
      {name:translations['Rocket'], onClick:this.rocketModal},
      {name:translations['Guns'], onClick:this.gunModal}
    ];

    const { allMunitionInventory } = this.props;

    const columns = [
      /*{
        Header: translations["type"],
        accessor: 'role',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="MunitionRoles" dropdownData={(value)=>{onChange({filterValue:value}); console.log(value);}} value={this.state.filterValue}/>,
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },*/
      {
        Header: translations["type"],
        accessor: 'type',
        // Filter: ({ filter, onChange }) =>
        //             <FilterDropdown dropdownDataUrl="MunitionRoles" munitions={munitions} dropdownData={(value)=>{onChange({filterValue:value}); console.log(value);}} value={this.state.filterValue}/>,
        // sortMethod: (a, b) => {
        //               if (a.length === b.length) {
        //                 return a > b ? 1 : -1;
        //               }
        //               return a.length > b.length ? 1 : -1;
        //             }// String-based value accessors!
      },
      {
        Header: translations["Manufacturer"],
        accessor: 'manufacturer',
      },
      /*{
        Header: translations['Name'],
        accessor: 'munition',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
      },*/
	  {
		Header: translations['Name'],
		accessor: 'name',
		// Filter: ({ filter, onChange }) =>
		// 		   <select
		// 			onChange={event => onChange(event.target.value)}
		// 			style={{ width: "100%" }}
		// 			value={filter ? filter.value : ""}
		// 		  >
		// 			{allMunitions.map(function(data, key){
		// 				return (<option key={key} value={data.munition}>{data.munition}</option> );
		// 			})}
		// 		  </select>
	  },
      {
        Header: translations['serial#'],
        accessor: 'serialNumber',
      },
      {
        Header: translations["Branch"],
        accessor: 'branch',
      },
      {
        Header: translations['cocom'],
        accessor: 'COCOM',
        // Filter: ({ filter, onChange }) =>
        //             <FilterDropdown dropdownDataUrl="COCOM" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/>
      },
      {
        Header: translations['unit'],
        accessor: 'owningUnit',
        // Filter: ({ filter, onChange }) =>
        //             <FilterDropdown dropdownDataUrl="Units" dropdownData={(value)=>{onChange({filterValue:value}); console.log(value);}} value={this.state.filterValue}/>
      },
      /*{
        Header: translations['Location'],
        accessor: 'location'
      },*/
	  {
		Header: translations['Location'],
		accessor: 'location',
		// Filter: ({ filter, onChange }) =>
		// 		   <select
		// 			onChange={event => onChange(event.target.value)}
		// 			style={{ width: "100%" }}
		// 			value={filter ? filter.value : ""}
		// 		  >
		// 			{allMunitions.map(function(data, key){
		// 				return (<option key={key} value={data.location}>{data.location}</option> );
		// 			})}
		// 		  </select>
	  },
      {
        Header: translations['view'],
        accessor: 'ID',
        filterable: false,
        Cell: row => <span className="number"><img src="/assets/img/general/pen_icon.png" onClick={() => this.openMunitionsForm(row.value)}/></span>
      }
    ];

    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["Munitions"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <button className="ccir-button" onClick={() => this.openMunitionsForm('0')} >{translations["Add Munition"]}</button>
            </div>
          </div>
          { this.state.addMunitionsInventoryOpen ?
            <AddMunitionsInventory onClose={this.closeMunitionsForm} editId={this.state.editId} translations = {translations}/>
            : null
          }
          <NotificationContainer />
          <div className="col-md-12">
            <ReactTable
              data={allMunitionInventory}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable={true}
						  defaultFilterMethod={(filter, row) => {
							  const id = filter.pivotId || filter.id;
							  return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
              }}
            />
          </div>
        </div>
        
      </div>
    );
  }
}

MunitionsComponent.propTypes = {
  children: PropTypes.element,

};

export default MunitionsComponent;
