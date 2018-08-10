import PropTypes from 'prop-types';
import React from 'react';
import ReactTable from 'react-table';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import "react-table/react-table.css";
import BaseModal from './location/BaseModal';


class LocationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: "",
      filter: [],
      baseModalOpen: false,
      baseshow: false,
      editId: "0"
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


  notify =()=>{
    const { translations } = this.props;
    if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['Update Locations Message'], translations['Location Title'], 5000);
    }else{
      NotificationManager.success(translations['Add Locations Message'], translations['Location Title'], 5000);
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
    const columns = [
      {
        Header: translations["type"],
        accessor: "category"
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
        Header: translations["Country"],
        accessor: "country"
      },
      {
        Header: translations["Region"],
        accessor: "region"
      },
      {
        Header: translations["unit"],
        accessor: "region"
      },
      {
        Header: translations["Record Date"],
        accessor: "region"
      },
      {
        Header: translations["view"],
        accessor: "id",
        filterable: false,
        Cell: row => (
          <span className="number change-cursor-to-pointer">
            <img
              src="/assets/img/general/pen_icon.png"
              onClick={() => this.openBaseModalFrom(row.row.id)}
            />
          </span>
        ) // Custom cell components!
      }
    ];

    const rowFields = [
      { name: translations["Type"], type: "dropdown", valFieldID: "Type" },
      { name: translations["Name"], type: "input", valFieldID: "Name" },
      { name: translations["COCOM"], type: "dropdown", valFieldID: "Cocom" },
      {
        name: translations["Country"],
        type: "dropdown",
        valFieldID: "Country"
      },
      { name: translations["Region"], type: "dropdown", valFieldID: "Region" },
      { name: translations["Unit"], type: "dropdown", valFieldID: "Unit" },
      {
        name: translations["Record Date"],
        type: "date",
        valFieldID: "RecordDate"
      }
    ];

    const generalFields = [
      {
        name: translations["Name"],
        type: "input",
        domID: "LocationName",
        valFieldID: "LocationName"
      },
      {
        name: translations["Street/Road"],
        type: "input",
        domID: "LocationStreet",
        valFieldID: "LocationStreet"
      },
      {
        name: translations["City/Town"],
        type: "input",
        domID: "LocationCity",
        valFieldID: "LocationCity"
      },
      {
        name: translations["Country"],
        type: "dropdown",
        domID: "dispLocationCountry",
        ddID: "Countries",
        valFieldID: "LocationCountry"
      },
      {
        name: translations["COCOM"],
        type: "dropdown",
        domID: "dispLocationCOCOM",
        ddID: "COCOM",
        valFieldID: "LocationCOCOM"
      },
      {
        name: translations["Region"],
        type: "dropdown",
        domID: "dispLocationRegion",
        ddID: "Regions",
        valFieldID: "LocationRegion"
      }
    ];

    const locationFields = [
      {
        name: translations["Lat"],
        type: "number",
        domID: "LocationLat",
        valFieldID: "LocationLatitude"
      },
      {
        name: translations["Lon"],
        type: "number",
        domID: "LocationLon",
        valFieldID: "LocationLongitude"
      },
      {
        name: translations["Elevation"],
        type: "number",
        domID: "LocationElevation",
        valFieldID: "LocationElevation"
      },
      {
        name: translations["MGRS"],
        type: "input",
        domID: "LocationMGRS",
        valFieldID: "LocationMGRS"
      }
    ];

    const contactFields = [
      {
        name: translations["Point of Contact"],
        type: "input",
        domID: "dispLocationPointofContact",
        valFieldID: "LocationPointofContact"
      },
      {
        name: translations["DSN"],
        type: "input",
        domID: "DSN",
        valFieldID: "LocationDSN"
      },
      {
        name: translations["Email-NIPR"],
        type: "input",
        domID: "EmailNIPR",
        valFieldID: "LocationEmailNIPR"
      },
      {
        name: translations["Email-SIPR"],
        type: "input",
        domID: "EmailSIPR",
        valFieldID: "LocationEmailSIPR"
      },
      {
        name: translations["Frequency"],
        type: "number",
        domID: "LocationFrequency",
        valFieldID: "LocationFrequency"
      },
      {
        name: translations["Chat ID"],
        type: "input",
        domID: "ChatID",
        valFieldID: "LocationChatID"
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
                filterable={true}
                defaultFilterMethod={(filter, row) => {
                  const id = filter.pivotId || filter.id;
                  return row[id] !== undefined
                    ? String(row[id]).startsWith(filter.value)
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
