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

closePersonnelForm = () => {
  const { translations } = this.props;
  NotificationManager.success(translations['Add Personnel Success'], translations['personnel']);
  this.props.fetchPersonnels();
  this.setState({
    editId: '0',
    addPersonnelModalOpen: false,
  });
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
      Cell: row => <span className="number"><img src="/assets/img/general/pen_icon.png" onClick={() => this.openPersonnelForm(row.value)} /></span>,
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
          <AddPersonnel editId = {this.state.editId} onClose={this.closePersonnelForm} translations = {translations}/>
          : null
        }
        <div className="col-md-12">
          <ReactTable
            data={allPersonnels}
            columns={columns}            
            defaultPageSize={10}
            className="-striped -highlight"
            filterable={true}
            defaultFilterMethod={(filter, row) => {
              const id = filter.pivotId || filter.id
              return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
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
