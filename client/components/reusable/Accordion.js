import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dropdown from "../reusable/Dropdown";

class Accordion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uncheckedResults: []
    }
  }

  componentDidMount() {

  }

  save = () => {
    console.log('saving');
  };

  close = (key) => {
    let accordionContent = document.getElementsByClassName(`accordion-content`)[key];
    this.closeSection(key, accordionContent);
  };

  closeSection = (key, accordionContent) => {
    setTimeout(() => {
      this.refs[`section${key}`].childNodes[1].style.borderBottom = 'none';
    }, 450);
    accordionContent.style.height = 0;
  };

  changeValue = (key, value) => {
    document.getElementById(`dropdown${key}`).value = value;
  };

  toggleHeader(key) {
    let accordionContent = document.getElementsByClassName(`accordion-content`)[key];
    if (accordionContent.clientHeight) {
      this.closeSection(key, accordionContent);
    } else {
      let wrapper = document.querySelector(`.accordion-content-wrapper${key}`);
      accordionContent.style.height = wrapper.clientHeight + "px";
      this.refs[`section${key}`].childNodes[1].style.borderBottom = '1px solid #bbcfe2';
    }
  }

  renderDropdowns(dropdowns) {

      let langs = ['val 1', 'val 2'];

      return dropdowns.map((item, i) => {

        return (
          <div className="dropdown-block" key={i}>
            <Dropdown id={i} items={langs}/>
          </div>
        )
      });
  }

  renderResults() {

    const results = [
      {name: 'First Name', type: 'input'},
      {name: 'Middle Initial', type: 'input'},
      {name: 'Last Name', type: 'input'},
      {name: 'Rank', type: 'dropdown'},
      {name: 'Pay Grade', type: 'dropdown'},
      {name: 'Nationality', type: 'dropdown'},
      {name: 'Clearance Level', type: 'dropdown'},
      {name: 'CAC ID', type: 'input'},
      {name: 'Call Sign', type: 'input'},
    ];

      return results.map((item, i) => {

        return (
          <div className="accordion-results" key={i}>
            <div className="result-checkbox">
              <input type="checkbox" id={`checkbox${i}`} name={`checkbox${i}`}/>
              <label htmlFor={`checkbox${i}`}><span /></label>
            </div>
            <div>
              <img className="result-avatar" src="/images/admin/avatar.png" alt=""/>
            </div>
            <div className="result-user">
              <div className="result-name">
                cmd larry pickering
              </div>
              <div className="result-from">
                82nd Airborne Division
              </div>
            </div>
          </div>
        )
      });
  }

  handleChange = (i) => {
    const {uncheckedResults} = this.state;

    let index = this.state.uncheckedResults.indexOf(i);
    if (index === -1) {
      uncheckedResults.push(i);
    } else {
      uncheckedResults.splice(index, 1);
    }
    this.setState({
      uncheckedResults
    })
  };

  renderOrders() {

    const results = [
      {name: 'First Name', type: 'input'},
      {name: 'Middle Initial', type: 'input'},
      {name: 'Last Name', type: 'input'},
      {name: 'Rank', type: 'dropdown'},
      {name: 'Pay Grade', type: 'dropdown'},
      {name: 'Nationality', type: 'dropdown'},
      {name: 'Clearance Level', type: 'dropdown'},
      {name: 'CAC ID', type: 'input'},
      {name: 'Call Sign', type: 'input'},
    ];

    return results.map((item, i) => {
      return (
        <div className="accordion-orders" key={i}>
          <div className="order-checkbox" onClick={() => this.handleChange(i)} >
            <input type="checkbox" id={`checkbox${i}`} name={`checkbox${i}`} checked={this.state.uncheckedResults.indexOf(i) === -1}/>
            <label htmlFor={`checkbox${i}`}><span /></label>
          </div>
          <div>
            <img className="order-avatar" src="/images/admin/avatar.png" alt=""/>
          </div>
          <div className="order-user">
            <div className="order-name">
              cmd larry pickering
            </div>
            <div className="order-from">
              82nd - OPORD - TF BRAVO
            </div>
            <div className="order-effective">
              Effective: 13-nov-2017
            </div>
          </div>
        </div>
      )
    });
  }

  renderRoster() {

    const roster = [
      {name: 'First Name', type: 'input'},
      {name: 'Middle Initial', type: 'input'},
      {name: 'Last Name', type: 'input'},
      {name: 'Rank', type: 'dropdown'},
      {name: 'Pay Grade', type: 'dropdown'},
      {name: 'Nationality', type: 'dropdown'},
      {name: 'Clearance Level', type: 'dropdown'},
      {name: 'CAC ID', type: 'input'},
      {name: 'Call Sign', type: 'input'},
    ];

      return roster.map((item, i) => {

        return (
          <div className="accordion-results" key={i}>
            <div>
              <img className="result-avatar" src="/images/admin/avatar.png" alt=""/>
            </div>
            <div className="roster-user">
              <div className="result-name">
                cmd larry pickering
              </div>
              <div className="result-from">
                82nd Airborne Division
              </div>
            </div>
          </div>
        )
      });
  }

  renderColorizedPanel() {

    const colors = ['red','yellow','#4afd24','#00F4FF','blue','deeppink','white','lightskyblue','darkblue','#abab00','darkred'];

    return colors.map((item, i) => {
      return (
        <div className="color" style={{backgroundColor: item}} key={i} />
      )
    });
  }

  render() {

    const firstSectionDropdowns = [
      {name: 'DSN', type: 'input'},
      {name: 'Email - NIPR', type: 'input'},
      {name: 'Email - SIPR', type: 'input'},
      {name: 'Chat ID', type: 'input'},
      {name: 'Email - NIPR', type: 'input'},
      {name: 'Email - SIPR', type: 'input'},
      {name: 'Chat ID', type: 'input'},

    ];

    let langs = ['val 1', 'val 2'];

    return (
      <div className="custom-accordion">
        <div className="accordion-section" ref={`section0`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(0)}>
            <div>
              add to roster
            </div>
            <img className="arrow pull-right" src="/images/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${0}`}>
              <div className="content">
                {this.renderDropdowns(firstSectionDropdowns)}
                <div className="accordion-search">
                  <input placeholder="Search/Filter Name, CAC ID"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-section" ref={`section${1}`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(1)}>
            <div>
              results
            </div>
            <img className="arrow pull-right" src="/images/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${1}`}>
              <div className="content">
                {this.renderResults()}
                <div className="menu-button">
                  <img className="line" src="/images/admin/edit_up.png" alt=""/>
                  <button onClick={() => this.close(1)}>
                    Close
                  </button>
                  <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
                </div>
                <div className="menu-button">
                  <img className="line" src="/images/admin/edit_up.png" alt=""/>
                  <button onClick={this.save}>
                    Add
                  </button>
                  <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-section" ref={`section${2}`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(2)}>
            <div>
              view roster
            </div>
            <img className="arrow pull-right" src="/images/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${2}`}>
              <div className="content view-roster">
                <div className="accordion-search">
                  <input placeholder="Search/Filter Name, CAC ID"/>
                </div>
                {this.renderRoster()}
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-section" ref={`section${3}`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(3)}>
            <div>
              create / edit role
            </div>
            <img className="arrow pull-right" src="/images/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${3}`}>
              <div className="content create-role">
                <div className="role-label">
                  <div>
                    Role Title
                  </div>
                  <div className="accordion-search">
                    <input placeholder="Search/Filter Name, CAC ID"/>
                  </div>
                </div>
                <div>
                  <div className="dropdown-title">
                    Role Title
                  </div>
                  <div className="dropdown-block search-input">
                    <Dropdown items={langs}/>
                  </div>
                </div>
                <div className="role-label">
                  <div>
                    Assigned Members to Role
                  </div>
                  <div className="accordion-search">
                    <input placeholder="Begin typing or drag n'drop"/>
                  </div>
                </div>
                <div className="role-label">
                  <div>
                    Role also Reports to (dotted line)
                  </div>
                  <div className="accordion-search">
                    <input placeholder="Search/Filter Name, CAC ID"/>
                  </div>
                </div>
                <div className="role-label">
                  <div>
                    Colorize Role
                  </div>
                  <div className="colorized-role">
                    {this.renderColorizedPanel()}
                  </div>
                </div>
                <div className="role-buttons">
                  <div className="menu-button">
                    <img className="line" src="/images/admin/edit_up.png" alt=""/>
                    <button onClick={() => this.close(3)}>
                      close
                    </button>
                    <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
                  </div>
                  <div className="menu-button">
                    <img className="line" src="/images/admin/edit_up.png" alt=""/>
                    <button onClick={this.save}>
                      create
                    </button>
                    <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-section" ref={`section${4}`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(4)}>
            <div>
              generate orders
            </div>
            <img className="arrow pull-right" src="/images/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${4}`}>
              <div className="content">
                {this.renderOrders()}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Accordion.propTypes = {
  children: PropTypes.element,

};

export default Accordion;
