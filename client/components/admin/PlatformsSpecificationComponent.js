import PropTypes from 'prop-types';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import AddPlatform from './platform/AddPlatformModal';





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

  componentWillMount() {
    this.props.fetchPlatforms();
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
    this.notify();
    this.props.fetchPlatforms();
    this.setState({
      editId: 0,
      addPlatformModalOpen: false,
    });
  }

  notify =()=>{
    const { translations } = this.props;
    if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['Update Platform Specification Message'], translations['Platform Specification Title'], 5000);
    }else{
      NotificationManager.success(translations['Add Platform Specification Message'], translations['Platform Specification Title'], 5000);
    }
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
          <NotificationContainer /> 

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
