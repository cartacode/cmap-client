import React from 'react';
import PropTypes from 'prop-types';
import FilterDatePicker from '../reusable/FilterDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import "react-table/react-table.css";
import ReactTable from 'react-table';
import AddPayloadsInventory from './payloads/AddPayloadsInventory';

class PayloadsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPayloadsInventoryOpen:false,
      editId: '0',
    };
  }

  componentDidMount() {
    this.props.fetchPayloadInventory();
  }

openPayloadsForm = (row) => {
  this.setState({
    editId: row,
    addPayloadsInventoryOpen: true,
  });
}

closePayloadsForm = () => {
  this.props.fetchPayloadInventory();
  this.setState({
    editId: '0',
    addPayloadsInventoryOpen: false,
  });
}
	

	// renderItems(optionItem) {
	// 	let items = [{"label": "-Select Item-", "value": 0}];
	// 	optionItem.map((item, i) => {
	// 		items.push({"label": item.description, "value": i});
	// 	});
	// 	return items.map(function(data, key){
	// 		if(data.label == "-Select Item-"){
	// 		  return ( <option key={key} value=""> {data.label} </option>) ;
	// 		} else {
	// 		  return (<option key={key} value={data.label}>{data.label}</option> );
	// 		}
	// 	})
	// }

	render() {
	  const { translations, allPayloadInventory } = this.props;

		const columns = [{
		    Header: translations["type"],
		    accessor: 'type',
		  },
		  {
		    Header: translations['Name'],
		    accessor: 'name',

		  },
		  {
		    Header: translations['serial#'],
		    accessor: 'serialNumber',
		  },
		  {
		    Header: translations['cocom'],
		    accessor: 'COCOM',
		  },
		  {
		    Header: translations['Location'],
		    accessor: 'location',
		  },
		  {
		    Header: translations['Record Date'],
			accessor: 'recordDate',
			Filter: ({ filter, onChange }) =>
			<FilterDatePicker onChange={this.handleChange} value={filter ? filter.value : ""}/>
		  },
		  {
		    Header: translations['view'],
		    accessor: 'ID',
		    filterable: false,
	        Cell: row => <span className="number"  ><img src="/assets/img/general/pen_icon.png" onClick={() => this.openPayloadsForm(row.value)} /></span>,
		  }
		];

		return (
			  <div>
				  <div className="row orders-assets">
					  <div className="header-line">
					  	<img src="/assets/img/admin/personnel_1.png" alt=""/>
					  	<div className="header-text">
					  		{translations["payloads"]}
					  	</div>
					  	<img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
					  </div>
					  <div className="col-md-12 filter-line">
            			<div className="add-button">
              				<button className="ccir-button" onClick={() => this.openPayloadsForm('0')} >{translations["Add Payload"]}</button>
							  
            			</div>
          			</div>
					 {this.state.addPayloadsInventoryOpen ?
					  <AddPayloadsInventory editId = {this.state.editId} onClose={this.closePayloadsForm} translations = {translations} />
				      : null
				     }
			  			<div className="col-md-12">
			  				<ReactTable
			  					data={allPayloadInventory}
			  					columns={columns}
			  					defaultPageSize={5}
			  					className="-striped -highlight"
			  					filterable = {true}
			  					defaultFilterMethod={(filter, row) => {
			  						const id = filter.pivotId || filter.id
			  						return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
			  						}}
			  				/>
			  			</div>
			  	</div>
		  	</div>
		  );
	}
}

PayloadsComponent.propTypes = {  
  children: PropTypes.element,
};

export default PayloadsComponent;
