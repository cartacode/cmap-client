import React from 'react';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Notify extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    const { type } = this.props;
    const { message } = this.props;
    const { title } = this.props;
    switch (type) {
      case 'info':
        NotificationManager.info(message);
        break;
      case 'success':
        NotificationManager.success(message, title);
        break;
      case 'warning':
        NotificationManager.warning(message, title, 3000);
        break;
      case 'error':
        NotificationManager.error(message, title, 5000, () => {
          alert('callback');
        });
        break;
    }
  }

  render() {
    return (
      <div>
        <NotificationContainer />
      </div>
    );
  }
}

Notify.propTypes = {
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
