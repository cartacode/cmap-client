import React from 'react';
import PropTypes from 'prop-types';
import FilterDatePicker from '../reusable/FilterDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import "react-table/react-table.css";
import ReactTable from 'react-table';
import AddPayloadsInventory from './payloads/AddPayloadsInventory';
import { NotificationManager, NotificationContainer } from 'react-notifications';

class PayloadsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPayloadsInventoryOpen: false,
      editId: '0',
      editForm:false,
      		// counter:0
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

	// openPayloadsForm = (row) => {
	// 	this.setState({counter:this.state.counter + 1});
	// 	if (this.state.counter == 0)
  // 	{
	// 		this.setState({
	// 			editId: row,
	// 			addPayloadsInventoryOpen: true,
	// 		});
	// 	}
	// 	else {
	// 			this.setState({
	// 		 	editId: row,
	// 			addPayloadsInventoryOpen: true
	// 			}, () => { 
	// 		 	 this.setState({
	// 			 editForm: true
	// 		  	}); });
	// 	     }
	// }

	closePayloadsForm = (actionType) => {
	  this.notify(actionType);
	  this.props.fetchPayloadInventory();
	  this.setState({
	    editId: '0',
	    addPayloadsInventoryOpen: false,
	  });
	}

	loadData = (actionType) => {
	  this.notify(actionType);
	  this.props.fetchPayloadInventory();
	}

	deletePayloadInventory = (value) => {
	  if (value !== undefined && value !== '0') {
	    this.props.deletePayloadInventoryById(value).then(() => {
	      this.setState({ editId: '0' });
	      this.loadData('DELETE');
	    });
	  }
	}

	notify = (actionType) => {
	  const { translations } = this.props;
	  if ('DELETE' != actionType) {
	    if (this.state.editId !== undefined && this.state.editId !== '0') {
	      NotificationManager.success(translations['Update Payload Inventory Message'], translations['Payload Inventory Title'], 5000);
	    } else {
	      NotificationManager.success(translations['Add Payload Inventory Message'], translations['Payload Inventory Title'], 5000);
	    }
	  } else {
	    NotificationManager.success(translations['Delete Payload Inventory Message'], translations['Payload Inventory Title'], 5000);
	  }
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

	stopupdate = () => 
	{
	  this.setState({editForm:false});
	}

	render() {
	  const { translations, allPayloadInventory } = this.props;

	  const columns = [{
	    Header: translations["type"],
	    accessor: 'typeDesc',
	  },
	  {
	    Header: translations['Manufacture'],
	    accessor: 'manufacturer',

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
	    Header: translations['Branch'],
	    accessor: 'branch',
	  },
	  {
	    Header: translations['cocom'],
	    accessor: 'COCOM',
	  },
	  {
	    Header: translations['Owning Unit'],
	    accessor: 'owningUnit',
	  },
	  {
	    Header: translations['Location'],
	    accessor: 'location',
	  },
	  {
	    Header: translations['view'],
	    accessor: 'ID',
	    filterable: false,
	    Cell: row => <div><span className="number change-cursor-to-pointer"><img src="/assets/img/general/pen_icon.png" onClick={() => this.openPayloadsForm(row.value)} /></span><span className='number change-cursor-to-pointer'><img src="/assets/img/general/trash_icon.png" onClick={() => this.deletePayloadInventory(row.value)} /></span></div>
	  }
	  ];

	  return (
	    <div>
	      <div className="row orders-assets">
	        <div className="header-line">
	          <img src="/assets/img/admin/personnel_1.png" alt="" />
	          <div className="header-text">
	            {translations["payloads"]}
	          </div>
	          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
	        </div>
	        <div className="col-md-12 filter-line">
	          <div className="add-button">
	            <button className="ccir-button" onClick={() => this.openPayloadsForm('0')} >{translations["Add Payload"]}</button>

	          </div>
	        </div>
	        {this.state.addPayloadsInventoryOpen ?
	          <AddPayloadsInventory editId={this.state.editId} onClose={this.closePayloadsForm} translations={translations} editForm = {this.state.editForm} stopupdate={this.stopupdate}/>
	          : null
	        }
	        <NotificationContainer />
	        <div className="col-md-12">
	          <ReactTable
	            data={allPayloadInventory}
	            columns={columns}
	            defaultPageSize={5}
	            loading={this.props.isLoading}
	            className="-striped -highlight"
	            filterable={true}
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
