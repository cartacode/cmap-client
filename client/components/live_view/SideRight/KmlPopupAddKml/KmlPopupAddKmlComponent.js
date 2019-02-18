import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { addLocationKML, fetchLocationTypes } from '../../../../actions/location';
import SelectBox from '../../../reusable/SelectBox';
import Loader from '../../../reusable/Loader';
import UploadFileBlock from '../../../reusable/UploadFileBlock';
import { NoticeType } from 'dictionary/constants';
import './KmlPopupAddKmlComponent.scss';

class KmlPopupAddKmlComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clear: false,
      locationFiles: {
        KML: null,
      },
      editFetched: false,
      oneLocation: {},
      location: {
        LocationID: '',
        LocationName: '',
        KML: '',
        LocationCategory: '',
        LocationDescription: '',
        LastUpdate: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDDChange = this.handleDDChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.closeBlock = this.closeBlock.bind(this);
  }

  componentDidMount() {
    this.props.fetchLocationTypes();
  }

  handleChange(event) {
    if(event) {
      const { name, value } = event.target;
      const { location } = this.state;

      if(name) {
        this.setState({
          location: {
            ...location,
            [name]: value,
          },
        });
      }
    }
  }

  handleDDChange(value) {
    const { location } = this.state;

    this.setState({
      location: {
        ...location,
        LocationCategory: value,
      }
    });
  }

  getFilterOptions = (data) => {
    if(data) {
      const arrItems = data.map((item) => {
        return { value: item.id, label: item.description };
      });

      return arrItems;
    } else {
      return [];
    }
  }

  stopset() {
    this.setState({ clear: false });
  }

  stopupd = () => {
    this.setState({ editFetched: false });
  }

  /**
   * This is callback method called automatically and update state with locationFiles.
   */
  handleUploadFileData = (uploadFileData) => {
    const { locationFiles } = this.state;
    this.setState({
      locationFiles: {
        ...locationFiles,
        KML: uploadFileData.KML,
      },
    }, () => {
      // console.log("New state in ASYNC callback of UPLOAD IMAGERY & DATASHEETS() LOcation screen :", this.state.locationFiles);
    });
  }

  handlePhotoPreviewURL = (uploadedFile) => {
    const reader = new FileReader();
    const file = uploadedFile.originalFile;
    reader.readAsDataURL(file);
  }

  submitData = () => {
    const { locationFiles, location } = this.state;
    const formData = new FormData();
    
    if (locationFiles && locationFiles.KML) {
      formData.append('KML', locationFiles.KML, locationFiles.KML.name);
    }

    // Start Loader
    this.setState({ loading: true });
    formData.append('locationFormData', JSON.stringify(location));

    this.props.addLocationKML(formData).then(() => {
      const { oneLocation } = this.props;

      // End Loader
      this.setState({ loading: false });
  
      if(this.props.isAdded) {
        this.props.addKML(oneLocation.KML, uuid(), this.state.location.LocationName, true);
        this.resetForm();
        this.props.closeBlock(false, 'kmlPopupOpen');
      }

    });
  }

  closeBlock() {
    this.resetForm();
    this.props.closeBlock(false, 'kmlPopupOpen');
  }

  resetForm() {
    this.setState(this.baseState);
    this.setState({ clear: true });
  }

  render() {
    const { locationTypes } = this.props;

    const uploadField = [
      { name: 'KML File', type: 'file', domID: 'KML', valFieldID: 'KML', fileType: 'file', extension: 'kml', required:true },
    ];

    return (
      <div className={'kml-popup-block-add-kml'}>
        <Loader loading={this.state.loading} />
        <div className={'p-3'} style={{background: '#022033'}}>
          <div className={'d-flex align-items-center'}>
            <div className={'w-75px'}>Name:</div>
            <div className={'flex-fill mr-1'}>
              <input name="LocationName" onChange={this.handleChange} className={'w-100'} type={'text'} />
            </div>
          </div>
          <div className={'d-flex align-items-center mt-2'}>
            <div className={'w-75px'}>Category:</div>
            <div className="selectmenu-block flex-fill mr-1 mt-0 w-100 pr-0 pl-3">
              {
                <SelectBox
                  setChangedData={this.handleDDChange}
                  options={ this.getFilterOptions(locationTypes) }
                />
              }
            </div>
          </div>
          <div className={'d-flex flex-column mt-0'}>
            <div>Description:</div>
            <div className={'mt-2'}>
              <textarea className={'form-control'} onChange={this.handleChange} name="LocationDescription" rows={3} />
            </div>
          </div>

          <div className={'mt-10 align-items-center row live-view-KML'}>
            <UploadFileBlock fields={uploadField} blockWidth={'col-md-12'}
              data={this.handleUploadFileData} initstate={this.state.oneLocation} isImagedRequired={this.state.isImagedRequired}
              clearit={this.state.clear} stopset={this.stopset.bind(this)} previewFile={this.handlePhotoPreviewURL}
              editFetched={this.state.editFetched} stopupd={this.stopupd} />
          </div>

          <div className="buttons-control buttons-block mt-5 text-right">
            <button onClick={this.submitData} className="btn-save">Ok</button>
            <button onClick={this.closeBlock} className="btn-clear">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

KmlPopupAddKmlComponent.propTypes = {
  addKML: PropTypes.func,
  addLocationKML: PropTypes.func,
  closeBlock: PropTypes.func,
  isAdded: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    isAdded: state.locations.isAdded,
    locationTypes: state.locations.locationTypes,
    isTypesFetching: state.locations.isTypesFetching,
    oneLocation: state.locations.oneLocation,
  };
};

const mapDispatchToProps = {
  addLocationKML,
  fetchLocationTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(KmlPopupAddKmlComponent);
