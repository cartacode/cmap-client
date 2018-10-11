import PropTypes from 'prop-types';
import React from 'react';

class EmailSendModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  sendEmail = () =>{
    const { content } = this.state;
    this.props.sendEmail(this.props.row, content);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.updateContent(name, value);
  }

  updateContent(name, value) {
    const { content } = this.state;
    this.setState({
      content: {
        ...content,
        [name]: value,
      },
    }, () => {
    });
  }

  render() {
    const { translations } = this.props;
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className=" react-confirm-alert-overlay" >
        <div className="modal-content">
          <div className="close-button mission-mgt-close-padding hand-cursor">
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="col-md-12 text-left mission-mgt-txt-padding">
            <label>To</label>
            <input type="text" className="form-control" name="EmailTo" onChange={this.handleChange} />
          </div>
          <div className="col-md-12 text-left mission-mgt-txt-padding">
            <label>Subject</label>
            <input type="text" className="form-control" name="EmailSubject" onChange={this.handleChange} />
          </div>
          <div className="col-md-12 text-left mission-mgt-txt-padding">
            <label>Description Content</label>
            <input type="text" className="form-control" name="EmailContent" onChange={this.handleChange} />
          </div>
          <div className="col-md-12 text-center mission-mgt-save-btn-padding" >
            <button type="submit" className="highlighted-button" onClick={this.createMission}>
              {translations.submit}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

EmailSendModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.object,
  show: PropTypes.bool,
};

export default EmailSendModal;
