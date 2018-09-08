import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import FullHeaderLine from '../reusable/FullHeaderLine';

import EeiForm from './EeiForm';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { addIntelEei, fetchIntelEeisByIntelId, updateIntelEei, deleteIntelEEIById } from '../../actions/inteleei';
import { defaultFilter } from '../../util/helpers';
import { NotificationManager } from 'react-notifications';
import { NoticeType, TableDefaults } from '../../dictionary/constants';

class IntelEEI extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editId: '0',
      intelId: '0',
      isFormOpened: false,
      clear: false,
      eeiFetched: false,
      missionEEI: [],
    };
  }

  componentDidMount = () => {
    const { intelId, eeis } = this.props;
    this.setState({
      intelId,
      missionEEI: eeis,
    });
  }

  deleteEEI = (id) => {
    this.props.deleteIntelEEIById(id).then(() => {
      this.closeEEI(NoticeType.DELETE);
    });
  }

  closeEEI = (actionType) => {
    const { intelId } = this.props;
    this.notify(actionType);
    this.props.fetchIntelEeisByIntelId(intelId).then(() => {
      this.setState({
        editId: '0',
        isFormOpened: false,
        missionEEI: this.props.inteleeis,
      });
    });
  }

  openEEI = (id) => {
    debugger;
    this.setState({
      editId: String(id),
      isFormOpened: true,
    });
  }

  notify = (type) => {
    const { translations } = this.props;
    if(type === NoticeType.ADD) {
      NotificationManager.success(translations.AddedSuccesfully, translations.IntelEEI, 5000);
    } else if(type === NoticeType.UPDATE) {
      NotificationManager.success(translations.UpdatedSuccesfully, translations.IntelEEI, 5000);
    } else if(type === NoticeType.DELETE) {
      NotificationManager.success(translations.DeletedSuccesfully, translations.IntelEEI, 5000);
    }
  }

  render() {

    const { translations } = this.props;

    // EEI columns
    const missionColumns = [
      {
        Header: translations['eei#'],
        accessor: 'id',

      },
      /* {
        Header: translations.Name,
        accessor: 'targetName',

      }, */
      {
        Header: translations.threat,
        accessor: 'threatGroup',

      },
      {
        Header: translations.Location,
        accessor: 'location',

      },
      {
        Header: translations.grid,
        accessor: 'gridCoordinates',

      },
      {
        Header: translations.NearestNAI,
        accessor: 'POI1_ID',
      },
      {
        Header: translations.NearestPOI,
        accessor: 'POI2_ID',
      },
      {
        Header: translations['LIMIDS Request'],
        accessor: 'LIMIDS_Req',
      },

      {
        Header: translations.edit,
        accessor: 'id',
        filterable: false,
        Cell: row => { this.props.missionId === null? <div>
          <a href="#intelEEIContainer" className="btn btn-primary" onClick={()=> {this.openEEI(row.value);}}><span className="glyphicon glyphicon-edit"/></a>&nbsp;
          <a href="javaScript:void('0');" onClick={()=>{this.deleteEEI(row.value);}} className="btn btn-danger" > <span className="glyphicon glyphicon-trash"/></a>
        </div> : null },
      },
    ];

    return (
      <div id="intelEEIContainer">

        { this.state.isFormOpened ? <EeiForm editId={this.state.editId} intelId={this.props.intelId} onClose={this.closeEEI} /> : null }

        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations['mission eei\'s']} />
          </div>
          { !this.state.isFormOpened && this.props.missionId === null ?
            <div className="col-md-2 filter-line pull-right">
              <div className="add-button">
                <a href="#intelEEIContainer" className="btn btn-warning ccir-button" onClick={() => this.openEEI('0')}>Add EEI</a>
              </div>
            </div>
            : null
          }
          <div className="col-md-12">
            <ReactTable
              data={this.state.missionEEI}
              columns={missionColumns}
              defaultPageSize={TableDefaults.PAGE_SIZE}
              minRows={TableDefaults.MIN_ROWS}
              className="-striped -highlight"
              filterable={true}
              defaultFilterMethod={defaultFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

IntelEEI.propTypes = {
  editId: PropTypes.string,
  eeis: PropTypes.array,
  intelId: PropTypes.string,
  missionId: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneEEI: state.inteleei.oneEei,
    inteleeis: state.inteleei.eeis,
  };
};

const mapDispatchToProps = {
  addIntelEei, fetchIntelEeisByIntelId, updateIntelEei, deleteIntelEEIById,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntelEEI);
