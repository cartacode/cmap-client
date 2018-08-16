import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import FullHeaderLine from '../reusable/FullHeaderLine';
import ShortHeaderLine from '../reusable/ShortHeaderLine';

import ModalFormBlock from '../reusable/ModalFormBlock';

import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { addIntelEei, fetchIntelEeisByIntelId, updateIntelEei } from '../../actions/inteleei';
import { defaultFilter } from '../../util/helpers';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import  { NoticeType } from '../../dictionary/constants';

class IntelEEI extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editId: '0',
      intelId: '0',
      missionEEI: [/* { eei: '0000-01', name: 'torani farmhouse', threat: 'ied', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-06', limids:'us/noforn', edit:'edit', del:'del' },
      { eei: '0000-02', name: 'izz-al-din bed-down', threat: 'rocket', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-18', limids:'us/noforn', edit:'edit', del:'del' },
      { eei: '0000-03', name: 'mogzu road', threat: 'ied', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-22', limids:'us/noforn', edit:'edit', del:'del' },
      { eei: '0000-04', name: 'zahani fields', threat: 'direct fire', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-13', limids:'us/noforn', edit:'edit', del:'del' },
      { eei: '0000-05', name: 'madrasaye mosque', threat: 'direct fire', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-06', limids:'us/noforn', edit:'edit', del:'del' },
      { eei: '0000-06', name: 'gardez stadium', threat: 'rocket', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-43', limids:'us/noforn', edit:'edit', del:'del' } */], 
    
      intelReqEEI: {
        // id: '',
        // intelReqID: '',
        // targetName: '',
        // targetNum: '',
        // threatGroupID: '',
        // location: '',
        // district: '',
        // gridCoordinates: '',
        // LIMIDS_Req: '',
        // POI1_ID: '',
        // POI2_ID: '',
        // POI3_ID: '',
        // EEIs: '',
        // createDate: '',
        // lastUpdateDate: '',
        // objective: '',
        // EEIThreat: '',
        // LIMIDSReq: '',
      },
    };

  }

  componentDidMount = () => {
    const { intelId, eeis } = this.props;

    this.setState({
      intelId,
      missionEEI: eeis,
    });

  }

  // componentDidUpdate = (prevProps) => {

  //   const { intelId, eeis, editFetched } = this.props;
  //   if(editFetched) {
  //     this.setState({
  //       intelId,
  //       missionEEI: eeis,
  //     });
  //   }
    

  // }

  onClear = () => {

  }

  deleteEEI = (id) => {

  }

  editEEI = (id) => {

  }

  handleIntelEei1 = (intelEei1) => {
    const { intelReqEEI } = this.state;
    this.setState({
      intelReqEEI: {
        ...intelReqEEI,
        targetName: intelEei1.targetName,
        targetNum: intelEei1.targetNum,
        objective: intelEei1.objective,
        threatGroupID: intelEei1.threatGroupID
      },
    });
  }

  handleIntelEei2 = (intelEei2) => {
    const { intelReqEEI } = this.state;
    this.setState({
      intelReqEEI: {
        ...intelReqEEI,
        location: intelEei2.location,
        district: intelEei2.district,
        gridCoordinates: intelEei2.gridCoordinates,
        LIMIDS_Req: intelEei2.LIMIDS_Req
      },
    });
  }

  handleIntelEei3 = (intelEei3) => {
    const { intelReqEEI } = this.state;
    this.setState({
      intelReqEEI: {
        ...intelReqEEI,
        POI1_ID: intelEei3.POI1_ID,
        POI2_ID: intelEei3.POI2_ID,
        POI3_ID: intelEei3.POI3_ID,
        EEIs: intelEei3.EEIs,
      },
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { editId, intelReqEEI, intelId } = this.state;
    intelReqEEI.intelReqID = this.props.intelId;
    console.log('Submitting' + JSON.stringify(intelReqEEI));
    if(editId !== undefined && editId !== '0') {
      this.props.updateIntelEei(intelReqEEI).then(() => {
        this.notify(NoticeType.UPDATE);
      });
    } else {
      this.props.addIntelEei(intelReqEEI).then(() => {
        this.notify(NoticeType.ADD);
      });
    }
  }


  notify = (type) => {
    if(type === NoticeType.ADD) {
      NotificationManager.success('Added Succesfully', 'Intel Request', 5000);
    } else if(type === NoticeType.UPDATE) {
      NotificationManager.success('Update Succesfully', 'Intel Request', 5000);
    } else if(type === NoticeType.DELETE) {
      NotificationManager.success('Deleted Succesfully', 'Intel Request', 5000);
    }
  }

  render() {

    const {translations} = this.props;
    // const missionEEI: [{ eei: '0000-01', name: 'torani farmhouse', threat: 'ied', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-06', limids:'us/noforn', edit:'edit', del:'del' },
    //   { eei: '0000-02', name: 'izz-al-din bed-down', threat: 'rocket', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-18', limids:'us/noforn', edit:'edit', del:'del' },
    //   { eei: '0000-03', name: 'mogzu road', threat: 'ied', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-22', limids:'us/noforn', edit:'edit', del:'del' },
    //   { eei: '0000-04', name: 'zahani fields', threat: 'direct fire', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-13', limids:'us/noforn', edit:'edit', del:'del' },
    //   { eei: '0000-05', name: 'madrasaye mosque', threat: 'direct fire', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-06', limids:'us/noforn', edit:'edit', del:'del' },
    //   { eei: '0000-06', name: 'gardez stadium', threat: 'rocket', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-43', limids:'us/noforn', edit:'edit', del:'del' },]
    // }

    // FORM fields Array
    const eeiFiled1 = [
      { name: translations['Target Name'], type: 'input', domID: 'targetName', valFieldID: 'targetName' },
      { name: translations['Target#'], type: 'input', domID: 'targetNum', valFieldID: 'targetNum' },
      { name: translations.Objective, type: 'number', domID: 'dispObjective', ddID: 'objective', valFieldID: 'objective' },
      { name: translations['Threat Group'], type: 'dropdown', ddID: 'EEIThreat', domID: 'dispThreatGroups', valFieldID: 'threatGroupID' },
    ];

    const eeiFiled2 = [
      { name: translations.Location, type: 'input', domID: 'location', valFieldID: 'location' },
      { name: translations.District, type: 'dropdown', domID: 'dispDistrict', ddID: 'Countries', valFieldID: 'district' },
      { name: translations['Grid Coordinates'], type: 'input', domID: 'gridCoordinates', valFieldID: 'gridCoordinates' },
      { name: translations['LIMIDS Request'], type: 'dropdown', ddID: 'LIMIDSReq/GetLIMIDSReqs', domID: 'dispLIMIDS', valFieldID: 'LIMIDS_Req' },
    ];

    const eeiFiled3 = [
      { name: translations['NearestNAI'], type: 'input', domID: 'POI1_ID', valFieldID: 'POI1_ID' },
      { name: translations['NearestPOI'], type: 'input', domID: 'POI2_ID', valFieldID: 'POI2_ID' },
      //{ name: translations.POIs, type: 'input', domID: 'POI3_ID', valFieldID: 'POI3_ID' },
      { name: translations.EEIs, type: 'dropdown', domID: 'dispEEIs', ddID: 'IntelReqEEI/GetEEIOptions', valFieldID: 'EEIs' },
    ];

    // EEI columns
    const missionColumns = [
      {
        Header: translations['eei#'],
        accessor: 'eei',

      },
      {
        Header: translations.Name,
        accessor: 'name',

      },
      {
        Header: translations.threat,
        accessor: 'threat',

      },
      {
        Header: translations.Location,
        accessor: 'location',

      },
      {
        Header: translations.grid,
        accessor: 'grid',

      },
      {
        Header: translations.POIs,
        accessor: 'pois',
      },

      {
        Header: translations['LIMIDS Request'],
        accessor: 'limids',
      },

      {
        Header: translations.edit,
        accessor: 'id',
        filterable: false,
        Cell: row => <div><a href="#" className="btn btn-primary" ><span className="glyphicon glyphicon-edit"/></a>&nbsp; <a href="#" className="btn btn-danger" > <span className="glyphicon glyphicon-trash"/></a></div>,
      },
    ];

    return (
      <div>
        <NotificationContainer />
        <form action="" onSubmit={this.handleSubmit}>
          <div className="row intel-request">
            <div className="col-md-12">
              <FullHeaderLine headerText={translations['eei generator']} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={eeiFiled1} data={this.handleIntelEei1} initstate ={this.state.intelReqEEI} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={eeiFiled2} data={this.handleIntelEei2} initstate ={this.state.intelReqEEI} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={eeiFiled3} data={this.handleIntelEei3} initstate ={this.state.intelReqEEI} />
            </div>
          </div>
          <div className="row action-buttons" >
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className="highlighted-button" onClick={this.onClear.bind(this)}>
                {translations.clear}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className="highlighted-button" type="submit">
                {translations.add}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
          </div>
        </form>

        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["mission eei's"]} />
          </div>
          <div className="col-md-12">
            <ReactTable
              data={this.state.missionEEI}
              columns={missionColumns}
              defaultPageSize={5}
              minRows={1}
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
  intelId: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneEEI: state.inteleei.oneEei,
    eeis: state.inteleei.eeis,
  };
};

const mapDispatchToProps = {
  addIntelEei, fetchIntelEeisByIntelId, updateIntelEei,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntelEEI);
