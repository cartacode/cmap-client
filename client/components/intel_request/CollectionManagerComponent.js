import PropTypes from "prop-types";
import React from "react";
import {NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import FullHeaderLine from "../reusable/FullHeaderLine";
import { NoticeType } from "../../dictionary/constants";
import { getIntelRequestStatusCodeColor, defaultFilter } from "../../util/helpers";


class CollectionManagerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: "",
      filter: [],
      editId: "0"
    };
  }

  componentDidMount() {
    this.loadData();
  }

  deleteApprovedIntelRequests = (value) => {
    if (value !== undefined && value !== "0") {
      let  statusId  = 7; //'DRC'
      this.props.deleteApprovedIntelRequestById(value, statusId).then(() => {
        this.setState({ editId: "0" });
        this.notify(NoticeType.DELETE);
        this.loadData();
      });
    }
  };

  getColor= (row)=>{
    const colorCode = getIntelRequestStatusCodeColor(row.original.abbreviation);
  }


  moveToCollectionPlan = (row) => {
    //@Note:- When Intel request is moved to Collection Plan section then Intel request should be changed to status
    // 'Approved – Pending Resources' and status codre should be 10 (APR).
    const value = row.value;
    if (value !== undefined && value !== '0') {
      let  statusId  = 10; //'APR';
	    this.props.moveToCollectionPlan(value, statusId).then(() => {
	      this.setState({ editId: '0' });
	      this.notify(NoticeType.MOVE_TO_COLLECTION);
	      this.loadData();
      }); 
    }
  };

  moveToIntelRequest = (value) => {
    //@Note:- When Intel request is moved to Collection Plan section then Intel request should be changed to status
    // 'Approved – Approved - Validated' and status codre should be 21 (AV).
    if (value !== undefined && value !== '0') {
      let  statusId  = 21;//'AV';
      this.props.moveToIntelRequest(value, statusId).then(() => {
        this.setState({ editId: "0" });
        this.notify(NoticeType.MOVE_TO_INTEL_REQUEST);
        this.loadData();
      });
    }
  };

  deleteCollectionPlan=(value)=>{
    if (value !== undefined && value !== "0") {
      this.props.deleteCollectionPlanById(value).then(() => {
        this.setState({ editId: "0" });
        this.notify(NoticeType.DELETE);
        this.loadData();
      });
    }
  }

  loadData = () => {
    let  unitId  = 12;
    let  statusId  = 21; //'AV';
    this.props.fetchApprovedIntelRequests(unitId, statusId);

    statusId  = 10;//'APR';
    this.props.fetchCollectionPlans(unitId, statusId);
  };

  notify = actionType => {
    const { translations } = this.props;
    if (this.state.editId !== undefined && this.state.editId !== "0") {
      NotificationManager.success(translations['Intel Request update'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.ADD == actionType) {
      NotificationManager.success(translations['Intel Request add'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.MOVE_TO_COLLECTION == actionType) {
      NotificationManager.success(translations['Intel Request moved'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.MOVE_TO_INTEL_REQUEST == actionType) {
      NotificationManager.success(translations['Intel Request moved'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.DELETE == actionType) {
      NotificationManager.success(translations['Intel Request delete'], translations['Intel Request Title'], 5000);
    }
  };

  render() {
    const { translations } = this.props;
    const { allApprovedIntelRequests } = this.props;
    const { allCollectionsPlan } = this.props;
    const editurl = "/intel-request/detail/";
    const intelRequestColumns = [
      {
        Header: "IR#",
        accessor: "IntelRequestID",
        Cell: row => <div>
                          <span style = {this.getColor(row)} ></span>
                          <span>{row.value}</span>
                    </div>,
      },
      {
        Header: "Status",
        accessor: "Status"
      },
      {
        Header: "Mission Type",
        accessor: "MissionTypeText"
      },
      {
        Header: "Payload",
        accessor: "PrimaryPayloadName"
      },
      {
        Header: "Armed",
        accessor: "Armed"
      },
      {
        Header: "Command",
        accessor: "COCOMText"
      },

      {
        Header: translations["view"],
        accessor: "IntelRequestID",
        filterable: false,
        Cell: row => (
          <div>
            {/* <Link to={`${editurl}${row.value}`} className="text-success"  title="Edit" > <span className="glyphicon glyphicon-edit" /> </Link> */}&nbsp;
            <a href="#" className="btn btn-primary" title="Move To Collection Plan" onClick={() => this.moveToCollectionPlan(row)} > <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            <a href="#" className="btn btn-danger" title="Delete" onClick={() => this.deleteApprovedIntelRequests(row.value)} ><span className="glyphicon glyphicon-trash" /> </a>
          </div>
        )
      }
    ];

    const collectionPlanColumns = [
      {
        Header: "IR#",
        accessor: "IntelRequestID"
      },
      {
        Header: "Status",
        accessor: "Status"
      },
      {
        Header: "Mission Type",
        accessor: "MissionTypeText"
      },
      {
        Header: "Payload",
        accessor: "PrimaryPayloadName"
      },
      {
        Header: "Armed",
        accessor: "Armed"
      },
      {
        Header: "Command",
        accessor: "COCOMText"
      },

      {
        Header: translations["view"],
        accessor: "IntelRequestID",
        filterable: false,
        Cell: row => (
          <div>
            <a href="#" className="btn btn-primary" title="Move To Intel Request" onClick={() => this.moveToIntelRequest(row.value)} > <span className="glyphicon glyphicon-circle-arrow-left" /> </a>
            &nbsp;
          </div>
        )
      }
    ];

    let langs = ["val 1", "val 2"];
    return (
      <div>
        <div className="row intel-request">
          <div className="col-md-12 two-block">
            <FullHeaderLine headerText={translations["CollectionMap"]} />
            <img
              className="photo"
              src="/assets/img/intel_request/request/request_pic.png"
              alt=""
            />
          </div>

          {/* <div className="col-md-6 two-block">
            
          </div> */}

          {/* <div className="col-md-6">
            
          </div> */}
          <div className="col-md-12">
            
            <div className="row ">
              <div className="col-md-6">
            <FullHeaderLine headerText={translations["IntelRequests"]} />
                <ReactTable
                  data={allApprovedIntelRequests}
                  columns={intelRequestColumns}
                  defaultPageSize={5}
                  showPaginationTop={true}
                  showPaginationBottom={false}
                  className="-striped -highlight"
                  filterable={false}
                  showPageSizeOptions={false}
                  previousText="&#8678;"
                  nextText="&#8680;"
                  minRows={5}
                  defaultFilterMethod={defaultFilter}
                />
              </div>

              <div className="col-md-6">
                <FullHeaderLine headerText={translations["CollectionPlan"]} />
                <div className="row ">
                  <ReactTable
                    data={allCollectionsPlan}
                    columns={collectionPlanColumns}
                    defaultPageSize={5}
                    minRows={5}
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    className="-striped -highlight"
                    filterable={false}
                    showPagination={true}
                    previousText="&#8678;"
                    nextText="&#8680;"
                    defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CollectionManagerComponent.propTypes = {
  children: PropTypes.element
};

export default CollectionManagerComponent;
