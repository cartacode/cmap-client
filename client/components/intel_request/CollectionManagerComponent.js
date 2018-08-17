import PropTypes from "prop-types";
import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import FullHeaderLine from "../reusable/FullHeaderLine";
import { NoticeType, IntelReqStatusCodes } from "../../dictionary/constants";
import { getIntelRequestStatusCodeColoe } from "../../util/helpers";

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
      this.props.deleteApprovedIntelRequestById(value).then(() => {
        this.setState({ editId: "0" });
        this.notify("DELETE");
        this.loadData();
      });
    }
  };

  getColor= (row)=>{
    const colorCode = getIntelRequestStatusCodeColoe(row.original.StatusId);
  }


  moveToCollectionPlan = (row) => {
    //@Note:- When Intel request is moved to Collection Plan section then Intel request should be changed to status
    // 'Approved – Pending Resources' and status codre should be 10.
    const value = row.value;
    if (value !== undefined && value !== '0') {
      //For Temporary
      const userId = '99bdcdab-666f-498f-b93a-a53cce15e4a5';
	    this.props.moveToCollectionPlan(userId, value).then(() => {
	      this.setState({ editId: '0' });
	      this.notify('MOVE_TO_COLLECTION');
	      this.loadData();
      }); 
    }
  };

  moveToIntelRequest = (value) => {
    //@Note:- When Intel request is moved to Collection Plan section then Intel request should be changed to status
    // 'Approved – Approved - Validated' and status codre should be 21.
    if (value !== undefined && value !== '0') {
      //For Temporary
      const userId = '99bdcdab-666f-498f-b93a-a53cce15e4a5';
      this.props.moveToIntelRequest(userId, value).then(() => {
        this.setState({ editId: "0" });
        this.notify("MOVE_TO_INTEL_REQUEST");
        this.loadData();
      });
    }
  };

  loadData = () => {
    this.props.fetchApprovedIntelRequests();
    this.props.fetchCollectionPlans();
  };

  notify = actionType => {
    const { translations } = this.props;
    if (this.state.editId !== undefined && this.state.editId !== "0") {
      NotificationManager.success("Intel request is updated successfully.","Intel Request",5000);
    } else if ("ADD" == actionType) {
      NotificationManager.success("Intel request is added successfully.","Intel Request",5000);
    } else if ("MOVE_TO_COLLECTION" == actionType) {
      NotificationManager.success("Intel request is moved to collection plan.","Intel Request", 5000);
    } else if ("MOVE_TO_INTEL_REQUEST" == actionType) {
      NotificationManager.success("Intel request is moved to collection plan.","Intel Request", 5000);
    } else if ("DELETE" == actionType) {
      NotificationManager.success("Intel request is deleted.","Intel Request",5000);
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
            <Link to={`${editurl}${row.value}`} className="text-success"  title="Edit" > <span className="glyphicon glyphicon-edit" /> </Link>&nbsp;
            <a href="#" className="text-danger" title="Move To Collection Plan" onClick={() => this.moveToCollectionPlan(row)} > <span className="glyphicon glyphicon-circle-arrow-down" /></a>
            &nbsp;
            <a href="#" className="text-danger" title="Delete" onClick={() => this.deleteApprovedIntelRequests(row.value)} ><span className="glyphicon glyphicon-trash" /> </a>
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
            <a href="#" className="text-danger" title="Move To Intel Request" onClick={() => this.moveToIntelRequest(row.value)} > <span className="glyphicon glyphicon-circle-arrow-up" /> </a>
            &nbsp;
            <a href="#" className="text-danger" title="Delete"> <span className="glyphicon glyphicon-trash" /> </a>
          </div>
        )
      }
    ];

    let langs = ["val 1", "val 2"];
    return (
      <div>
        <div className="row intel-request">
          <div className="col-md-6 two-block">
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
          <div className="col-md-6">
            <FullHeaderLine headerText={translations["IntelRequests"]} />
            <div className="row ">
              <div className="col-md-12">
                <ReactTable
                  data={allApprovedIntelRequests}
                  columns={intelRequestColumns}
                  defaultPageSize={3}
                  showPaginationTop={true}
                  showPaginationBottom={false}
                  className="-striped -highlight"
                  filterable={false}
                  showPageSizeOptions={false}
                  previousText="&#8678;"
                  nextText="&#8680;"
                  minRows={3}
                  defaultFilterMethod={(filter, row) => {
                    const id = filter.pivotId || filter.id;
                    return row[id] !== undefined && row[id] !== null
                      ? String(row[id].toLowerCase()).startsWith(
                          filter.value.toLowerCase()
                        )
                      : true;
                  }}
                />
              </div>

              <div className="col-md-12">
                <FullHeaderLine headerText={translations["CollectionPlan"]} />
                <div className="row ">
                  <ReactTable
                    data={allCollectionsPlan}
                    columns={collectionPlanColumns}
                    defaultPageSize={3}
                    minRows={3}
                    className="-striped -highlight"
                    filterable={false}
                    showPagination={true}
                    previousText="&#8678;"
                    nextText="&#8680;"
                    defaultFilterMethod={(filter, row) => {
                      const id = filter.pivotId || filter.id;
                      return row[id] !== undefined && row[id] !== null
                        ? String(row[id].toLowerCase()).startsWith(
                            filter.value.toLowerCase()
                          )
                        : true;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}

CollectionManagerComponent.propTypes = {
  children: PropTypes.element
};

export default CollectionManagerComponent;
