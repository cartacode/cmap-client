import React from 'react';
import PropTypes from 'prop-types';
import AddPersonnel from './personnel/AddPersonnelModal';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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
      editForm:false,
    };
  }

  componentDidMount() {
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


  openPersonnelForm = (row) => {
    this.setState({
      editId: row,
      addPersonnelModalOpen: true,
    });
  
  }


  // openPersonnelForm = (row) => {
  //   this.setState({counter:this.state.counter + 1});
  //   console.log("Invoked");
  //   console.log("Row"+row);
  //   console.log("Edit ID"+this.state.editId);
  //   console.log("Counter"+this.state.counter);

  //   if (this.state.counter == 0)
  //   {
  //     this.setState({
  //     editId: row,
  //     addPersonnelModalOpen: true
  //   });
  // }
  // else {
  //   this.setState({
  //     editId: row,
  //     addPersonnelModalOpen: true
  //   }, () => { console.log("State Updated");
  //     this.setState({
  //       editForm: true
  //     }); });
  // }
  // }

closePersonnelForm = (actionType) => {
  this.loadData(actionType);
  this.setState({
    editId: '0',
    addPersonnelModalOpen: false,
  });
}

loadData = (actionType) => {
  this.notify(actionType);
  this.props.fetchPersonnels();
}


notify =(actionType)=>{
  const { translations } = this.props;
  if ('DELETE' != actionType) {
    if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['Update Personnel Success'], translations['personnel'], 5000);
    }else{
      NotificationManager.success(translations['Add Personnel Success'], translations['personnel'], 5000);
    }
  }else{
    NotificationManager.success(translations['Delete Personnel Success'],translations['personnel'], 5000);
  }
}



stopupdate = () => 
  {
    this.setState({editForm:false});
  }
  
  deletePersonnel = (value) => {
	  if (value !== undefined && value !== '0') {
	    this.props.deletePersonnelById(value).then(() => {
	      this.setState({ editId: '0' });
        this.props.fetchPersonnels();
        this.notify('DELETE');
	    });
	  }
  }
  
  notify =(actionType)=>{
    const { translations } = this.props;
    if ('DELETE' != actionType) {
      if (this.state.editId !== undefined && this.state.editId !== '0') {
        NotificationManager.success(translations['Update Platform Inventory Message'], translations['personnel'], 5000);
      }else{
        NotificationManager.success(translations['Add Platform Inventory Message'], translations['personnel'], 5000);
      }
    }else{
      NotificationManager.success(translations['Delete Platform Specification Message'],translations['personnel'], 5000);
    }
  }

render() {

  const { translations } = this.props;
  const { allPersonnels } = this.props;
  const columns = [
    {
      Header: translations['First Name'],
      accessor: 'firstName',
    },
    {
      Header: translations['Last Name'],
      accessor: 'lastName',
    },
    {
      Header: translations['Branch'],
      accessor: 'branchOfService',
    },
    {
      Header: translations['Assigned Unit'],
      accessor: 'assignedUnit',
    },
    {
      Header: translations['Deployed Unit'],
      accessor: 'deployedUnit',
    },
    
    {
      Header: translations['Rank'],
      accessor: 'rank',

    },
    {
      Header: translations['CAC ID'],
      accessor: 'CACID',
    },
    {
      Header: translations['view'],
      accessor: 'ID',
      filterable: false,
      Cell: row => <div><span className="number change-cursor-to-pointer"><img src="/assets/img/general/pen_icon.png" onClick={() => this.openPersonnelForm(row.value)} /></span><span className='number change-cursor-to-pointer'><img src="/assets/img/general/trash_icon.png" onClick={() => this.deletePersonnel(row.value)} /></span></div>,
      //Cell: row => <div><a href="#" className="text-white" onClick={() => this.openPersonnelForm(row.value)} ><span className="glyphicon glyphicon-edit"/></a>&nbsp; <a href="#" onClick={() => this.deletePersonnel(row.value)} className="text-white" > <span className="glyphicon glyphicon-trash"/></a></div>,
    },
  ];

  const sortOn = [
    {
      id: 'firstName',
      desc: true,
    },
  ];

  return (
    <div>
      <NotificationContainer />
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
          <AddPersonnel editId = {this.state.editId} onClose={this.closePersonnelForm} translations = {translations} /* editForm = {this.state.editForm} */ stopupdate={this.stopupdate}/>
          : null
        }
        <div className="col-md-12">
          <ReactTable
            data={allPersonnels}
            columns={columns}
            defaultPageSize={10}
            loading={this.props.isLoading}
            className="-striped -highlight"
            filterable={true}
            defaultFilterMethod={(filter, row) => {
              const id = filter.pivotId || filter.id
              return (row[id] !== undefined && row[id] !== null) ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
            }}
          />
        </div>
      </div>
    </div>
  );
}
}

PersonnelComponent.propTypes = {
  children: PropTypes.element,
};

export default PersonnelComponent;
