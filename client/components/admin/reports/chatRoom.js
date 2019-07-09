import { uploadFile } from 'actions/file';
import { addChatRoom, fetchReportById, updateChatRoom, } from 'actions/reports';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from '../../reusable/ContentBlock';

import axios from 'axios';
import { NoticeType, Error } from '../../../dictionary/constants';
import Loader from '../../reusable/Loader';
import { requestHeaders, baseUrl } from '../../../dictionary/network';

class ChatRoom extends React.Component {

  constructor(props) {
    super(props);
    const ses = JSON.parse(localStorage.getItem('session'));
    const locationcategory = ses.LocationCategoryID;
    this.state = {
      clear: false,
     
      isUpdated: true,
      chatRoom: {
        locationID: ses.LocationID,
        locationcategory,
        unitID: ses.AssignedUnit,
        branch: ses.Branch,
        COCOM: ses.COCOMID,
      },
      oneChatRoom: {},
      loading: false,
      oneReport:{}
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      this.getChatRoom(editId);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }

    if(editId !== '0' && prevProps.editId !== editId) {
      this.getChatRoom(editId);
    }

  }

getChatRoom = (editId) => {
  this.props.fetchChatRoomById(editId).then(() => {
    this.setState({
      isUpdated: true,
      chatRoom: this.props.oneChatRoom,
    });

  });
}

  stopUpdate = ()=> {
    this.setState({
      isUpdated: false,
    });
  }

  handleGeneralData = (generalData) => {
    const { chatRoom } = this.state;
    this.setState({
      chatRoom: {
        ...chatRoom,
        name: generalData.name,
        link: generalData.link,
        description: generalData.description,
        unitID: generalData.unitID,
       
      },
    });

    /* if(generalData.locationcategory && generalData.locationcategory != this.state.locationcategory) {
      this.updatelocationid(generalData);
    } */
  }

  handleSubmit = event => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    const { chatRoom } = this.state;
    const { editId } = this.props;

    if (editId && editId !== '0') {
      chatRoom.id = editId;
      this.props.updateChatRoom(editId, chatRoom).then(() => {
        this.setState({
          loading: false,
        });
        if(this.props.isUpdated) {
          this.props.onClose(NoticeType.UPDATE, this.props.isUpdated);
        }
        else if(!this.props.isUpdated && this.props.error === Error.ERROR_CODE) {
          this.props.onClose(NoticeType.NOT_UPDATE, this.props.isUpdated);
        }
      });
    } else {
      this.props.addChatRoom(chatRoom).then((res) => {
        this.setState({
          loading: false,
        });
        // this.props.onClose(NoticeType.ADD);
        if(this.props.isAdded) {
          this.props.onClose(NoticeType.ADD, this.props.isAdded);
        }
        else if(!this.props.isAdded && this.props.error === Error.ERROR_CODE) {
          this.props.onClose(NoticeType.NOT_ADD, this.props.isAdded);
        }
      });
    }
  }


  stopset = () => {
    this.setState({ clear: false });
  }

  resetForm = () => {
    this.setState(this.baseState);
    const { translations } = this.props;
    console.log('FORM RESET DONE');
    if (confirm(translations.ClearConfirmation)) {
      this.setState({ clear: true });
    }
  }

  render() {

    const ses = JSON.parse(localStorage.getItem('session'));
    const { translations } = this.props;
    const { chatRoom } = this.state;

    const fields = [
      { name: translations['Description'], type: 'input', domID: 'description', valFieldID: 'description', required: true },
      { name: translations['name'], type: 'input', domID: 'name', valFieldID: 'name', required: true },
      { name: translations['link'], type: 'input', domID: 'link', valFieldID: 'link', required: true },
      { name: translations['Owning Unit'], type: 'dropdown', domID: 'unitID', ddID: `Units/GetUnits?branchID=${ses.Branch}`, valFieldID: 'unitID', required: true },
      ];

    return (

      <form action="" onSubmit={this.handleSubmit} >
        <Loader loading={this.state.loading} />
        <div className="payload-content">
          <div className="row personnel" >
            <div className="under-munitions-content">
              <div className="col-md-4" />
              <ContentBlock fields={fields} data={this.handleGeneralData} initstate={this.state.chatRoom} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
            </div>
          </div>

        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="button" className="highlighted-button" onClick={this.resetForm.bind(this)}>
              {translations.clear}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="submit" className="highlighted-button">
              {translations.submit}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

ChatRoom.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneChatRoom: state.reports.oneChatRoom,
    isAdded: state.reports.isAdded,
    isUpdated: state.reports.isUpdated,
    error: state.reports.error,
  };
};

const mapDispatchToProps = {
  addChatRoom,
  fetchReportById,
  updateChatRoom,
 
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
