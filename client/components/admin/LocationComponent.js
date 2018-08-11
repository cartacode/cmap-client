import PropTypes from 'prop-types';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import BaseModal from './location/BaseModal';


class LocationComponent
 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: "",
      filter: [],
      baseModalOpen: false,
      baseshow: false,
      editId: "0",
      editForm:false,
    };
  }

  componentWillMount() {
    this.props.fetchLocations();
  }

  onFind() {
    console.log("find");
  }

  baseForm = () => {
    this.setState({
      baseshow: true
    });
  };

  openBaseModalFrom = row => {
     this.setState({
      editId: row,
      baseModalOpen: true
    });
  };

  closeBaseModalFrom = () => {
    this.notify();
    this.props.fetchLocations();
    this.setState({
      editId: "0",
      baseModalOpen: false
    });
  };

  stopupdate = () => 
  {
    console.log("Stop Update Called");
    this.setState({editForm:false});
  }

  deleteLocations = (value) => {
    if (value !== undefined && value !== '0') {
      this.props.deleteLocationById(value).then(() => {
        this.setState({ editId: '0' });
        this.props.fetchLocations();
        this.notify('DELETE');
      });
    }
  }
  
  notify =(actionType)=>{
    const { translations } = this.props;
    if ('DELETE' != actionType) { 
    if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['Update Locations Message'], translations['Location Title'], 5000);
    }else{
      NotificationManager.success(translations['Add Locations Message'], translations['Location Title'], 5000);
    }
  }
  else{
    NotificationManager.success(translations['Delete Platform Specification Message'],translations['Location Title'], 5000);
  }
  }

  render() {
    const { translations } = this.props;
    const locations = [
      { name: translations["Base"], onClick: this.baseModal },
      { name: translations["NAI"], onClick: this.naiModal },
      { name: translations["POI"], onClick: this.poiModal }
    ];
    const { allLocations } = this.props;
    debugger;
    const columns = [
      {
        Header: translations["type"],
        accessor: "type"
      },
      {
        Header: translations["Name"],
        accessor: "name"
      },
      {
        Header: translations["COCOM"],
        accessor: "COCOM"
      },
      {
        Header: translations["Region"],
        accessor: "region"
      },
      {
        Header: translations["Country"],
        accessor: "country"
      },
      {
        Header: translations["City/Town"],
        accessor: "city"
      },
      {
        Header: translations["MGRS"],
        accessor: "MGRS"
      },
      {
        Header: translations["LocationID"],
        accessor: "id"
      },
      {
        Header: translations["view"],
        accessor: "id",
        filterable: false,
        Cell: row => (
          <div><span className="number change-cursor-to-pointer">
            <img
              src="/assets/img/general/pen_icon.png"
              onClick={() => this.openBaseModalFrom(row.row.id)}
            />
          </span>
          <span className='number change-cursor-to-pointer'>
            <img src="/assets/img/general/trash_icon.png" onClick={() => this.deleteLocations(row.value)} />
          </span>
          </div>
        ) // Custom cell components!
      }
    ];


    

    return (
      <div>
        <div className="row orders-assets">
          <div className="row" />
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">{translations["Location"]}</div>
            <img
              className="mirrored-X-image"
              src="/assets/img/admin/personnel_1.png"
              alt=""
            />
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <button
                className="ccir-button"
                onClick={() => this.openBaseModalFrom("0")}
              >
                {translations["Add Location"]}
              </button>
            </div>
          </div>
          {this.state.baseModalOpen ? (
            <BaseModal
              editId={this.state.editId}
              show={this.state.baseModalOpen}
              onClose={this.closeBaseModalFrom}
              translations={translations}
              stopupdate={this.stopupdate}
            />
          ) : null}
        {/*   <NotificationContainer />  */}
          <br />
          <div className="row personnel">
            <div className="col-md-12">
              <ReactTable
                data={allLocations}
                columns={columns}
                defaultPageSize={5}
                className="-striped -highlight"
                loading={this.props.isLoading}
                filterable={true}
                defaultFilterMethod={(filter, row) => {
                  const id = filter.pivotId || filter.id;
                  return (row[id] !== undefined && row[id] !== null)
                    ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
                    : true;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LocationComponent.propTypes = {
  children: PropTypes.element
};

export default LocationComponent;
