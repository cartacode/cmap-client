import PropTypes from 'prop-types';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import AddPlatform from './platform/AddPlatformModal';
import { defaultFilter } from '../../util/helpers';
import {NoticeType, TableDefaults } from '../../dictionary/constants';



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

  closePlatformForm = (actionType) => {
    this.notify(actionType);
    this.props.fetchPlatforms();
    this.setState({
      editId: 0,
      addPlatformModalOpen: false,
    });
  }


  loadData = (actionType) => {
		this.notify(actionType);
		this.props.fetchPlatforms();
	}

	deletePayload = (value) => {
		if (value !== undefined && value !== '0') {
			this.props.deletePlatformById(value).then(() => {
				this.setState({ editId: '0' });
        this.notify(NoticeType.DELETE);
        this.props.fetchPlatforms();
			});
		}
	}

  notify =(actionType)=>{
    const { translations } = this.props;
    if (NoticeType.DELETE != actionType) {
        if (this.state.editId !== undefined && this.state.editId !== '0') {
          NotificationManager.success(translations['Update Platform Specification Message'], translations['Platform Specification Title'], 5000);
        }else{
          NotificationManager.success(translations['Add Platform Specification Message'], translations['Platform Specification Title'], 5000);
        }
      }else{
        NotificationManager.success(translations['Delete Platform Specification Message'],translations['Platform Specification Title'], 5000);
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

    const columns = [

      {
        Header: translations['Platform Name'],
        accessor: 'name',
      },
      {
        Header: translations['Manufacturer'],
        accessor: 'manufacturer'
      },
      {
        Header: translations['Category'],
        accessor: 'category'
      },
      {
        Header: translations['Mission Role'],
        accessor: 'role'
      },
      {
        Header: translations['Payload Capacity(lbs.)'],
        accessor: 'payloadCapacity',
      },
      {
        Header: translations['Armament Capacity(lbs.)'],
        accessor: 'armamentCapacity',
      },
      {
        Header: translations['view'],
        accessor: 'ID',
        filterable: false,
        Cell: row => <div><span className='number change-cursor-to-pointer'><img src="/assets/img/general/pen_icon.png" onClick={() => this.openPlatformForm(row.value)} /></span><span className='number change-cursor-to-pointer'><img src="/assets/img/general/trash_icon.png" onClick={() => this.deletePayload(row.value)} /></span></div>
      }
    ];

    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">
              Platforms Library
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
          </div>

          <div className="col-md-12 filter-line">
            <div className="add-button">
              <button className="ccir-button" onClick={() => this.openPlatformForm('0')} >Add Library</button>
            </div>
          </div>

          {this.state.addPlatformModalOpen ?
            <AddPlatform editId={this.state.editId} onClose={this.closePlatformForm} translations={translations} />
            : null}
          

          <div className="col-md-12">
            <ReactTable
              data={allPlatforms}
              columns={columns}
              className="-striped -highlight"
              loading={this.props.isLoading}
              filterable={true}
              defaultPageSize={TableDefaults.PAGE_SIZE}
              minRows={TableDefaults.PAGE_SIZE}
              defaultFilterMethod={defaultFilter}
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
