import React from 'react';
import MenuComponent from './MenuComponent';
import moment from 'moment';
import {
  NavLink
} from 'react-router-dom';
import PropTypes from 'prop-types';

class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      width: '72px'
    }
  }

  changeLang(lang) {
    this.props.getTranslations(lang);

    setTimeout(() => {
      console.log(this.refs.search.innerText.length)
      let widthValue = this.refs.search.innerText.length * 12;
      this.setState({
        width:`${widthValue}px`
      });
    }, 0)

  }

  //render dropdown list of lang switcher
  renderLangsList() {

    let langs = ['English', 'Spanish', 'French', 'Italian', 'German',  'Korean', 'Russian', 'Arabic', 'Portugese', 'Indonesian', 'Filipino', 'Ukranian', 'Vietnamese', 'Swahili', 'Japanese', 'Hindi' ];
    let langsList;

    langsList = langs.map((lang, i) => (
        <li key={i}>
          <a className="dropdown-item" href="#" onClick={() => this.changeLang(lang)}>{lang}</a>
        </li>
      )
    );

    return langsList;
  }

  componentWillMount() {
    this.props.getTranslations('English');
  }

  renderMenuItems() {

    const {translations: {translations}} = this.props;

    const menuItems = [
      {title: translations['dashboard'], url: '/dashboard'},
      {title: translations['liveview'], url: '/liveview'},
      {title: translations['status'], url: '/status'},
      {title: translations['intel request'], url: '/intel-request/summary'},
      {title: translations['mission mgt'], url: '/mission-mgt/isr-sync'},
      {title: translations['schedules'], url: '/schedules'},
      {title: translations['orders/assets'], url: '/orders-assets/orders'},
      {title: translations['intel library'], url: '/intel-library'},
      {title: translations['messages'], url: '/messages'},
      {title: translations['admin'], url: '/admin/personnel'},
      {title: translations['logout'], url: '/logout'}
    ];

    return menuItems.map((item, i) => {
      let matchForLink = false;

      if (item.url.indexOf('/', 1) !== -1) {
        matchForLink = (this.props.routing.location.pathname.indexOf(item.url.substr(0, item.url.indexOf('/', 1))) !== -1);
      } else {
        matchForLink = (this.props.routing.location.pathname.indexOf(item.url) !== -1);
      }

      return (
        <div className="menu-button" key={i}>
          <NavLink to={item.url} className={matchForLink ? "active-menu-item" : ''} >
            <button >
              {item.title}
            </button>
            <div className="under-button-line">
              <img src={matchForLink ? '/images/menu/button-line-highlight.png' : '/images/menu/button-line.png'} className="under-button-image pull-right" alt=""/>
            </div>
          </NavLink>
        </div>
      );
    });
  }

  search() {
    console.log(this.refs.search.value);
  }

  render () {
    const {translations: {translations}} = this.props;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid header">
          <div className="user-info ">
            <div className="header-line">
              <img src="/images/menu/vertical-line.png" className="line-img" alt=""/>
            </div>
            <div className="">
              Thomas
            </div>
            <div className="">
              COL, 116th MI Brigade
            </div>
            <div className="">
              Fort Gordon, GA USA
            </div>
          </div>
          <div className="header-title text-center ">
            <div className="header-unclassified">
              UNCLASSIFIED
            </div>
            <div className="header-isr">
              CENTCOM A-ISR MISSION MANAGER
            </div>
          </div>
          <div className="date-info ">
            <div className="date">
              <div className="">
                {moment().local().format('DD MMMM, YYYY')}
              </div>
              <div className="">
                Local:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{moment().local().format('HH:mm:ss')}
              </div>
              <div className="">
                Zulu:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {moment().utc().format('HH:mm:ss')}
              </div>
            </div>
            <div className="header-line">
              <img src="/images/menu/vertical-line.png" className="line-img" alt=""/>
            </div>
          </div>
        </div>
        <div className="container-fluid buttons">
          <img src="/images/menu/horiz-line.png" className="horiz-line" alt=""/>
          <div className="buttons-list">
            {this.renderMenuItems()}
            <div className="search">
              <NavLink to="/search">
                <div className="search-button" style={{width: this.state.width}} ref="search" onClick={() => this.search()}>
                  {translations.search}
                </div>
              </NavLink>
              <input type="text" className="search-input" placeholder={translations['enter values']} name="search" />
            </div>
            <div className="langs-dropdown" style={{position: "absolute",
              top: "45px", right: "260px"}}>
              <button type="button" className="btn btn-secondary dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Change Lang
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                {this.renderLangsList()}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

HeaderComponent.propTypes = {
  children: PropTypes.element,
  routing: PropTypes.object,
  translations: PropTypes.object
};

export default HeaderComponent;