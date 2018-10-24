import React from 'react';

class FooterComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <footer className="clearfix">
        <div className="left-block">
          <p className="lat"><span>LAT: </span>-43.23234"</p>
          <p className="lon"><span>LON: </span>-23.23342"</p>
          <p className="elv"><span>ELV: </span>2,232m</p>
          <p className="alt"><span>ALT: </span>4,232m</p>
        </div>
        <div className="middle-block">
          <div className="current-status-block green">Unclassified</div>
        </div>
        <div className="right-block">
          <a href="#" className="email-link" />
          <a href="#" className="messages-link" />
          <a href="#" className="alerts-link" />
          <a href="#" className="notifications-link"><span>2</span></a>
          <a href="#" className="audio-link" />
          <a href="#" className="break-out" />
        </div>
      </footer>
    );
  }
}

export default FooterComponent;
