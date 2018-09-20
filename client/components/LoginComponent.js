import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import { Link,  NavLink} from 'react-router-dom';
import FullHeaderLine from './reusable/FullHeaderLine';
import ContentBlock from './reusable/ContentBlock';
import ContentFull from './reusable/ContentFull';
import PersonnelComponent from '../components/admin/PersonnelComponent.js';
import { requestHeaders, formDataRequestHeader } from '../dictionary/network';

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: {
          'grant_type':'password',
      }
  }
  }

  componentDidMount () {
    document.forms[0].elements[0].focus();
    const { authenticated } = this.props;
    if(authenticated) {
      console.log("Called Auth");
      console.log(location.href);
      history.pushState(null, null, location.href);
      window.onpopstate = function(event) {
        history.go(1);
      };
    }
  }

  onClear(){
    console.log("Cleared");
  }

  onEnter(){
    console.log("enter");
  }

  handleGeneralPersonnelData = (generalData) => {
    const { login } = this.state;

    this.setState({
      login: {
        ...login,
        username: generalData.username,
        password: generalData.password,
      },
      // selectedBranch: generalData.ServiceBranch,
      // selectedRank: generalData.Rank,
      // selectedPaygrade: paygrade,
    });

  }

  setSession = () => {
    const { loginData } = this.props;
    const { authenticated } = this.props;
    console.log(authenticated);
    let mySession = JSON.stringify(loginData);
    console.log(mySession);
    localStorage.setItem('session',mySession);
    if (authenticated)
    { 
      console.log("Authenticated");
      requestHeaders['Authorization']='Bearer '+ loginData.access_token;
      formDataRequestHeader['Authorization']='Bearer '+ loginData.access_token;
      this.props.history.replace('/admin/personnel'); 
    }
  }

  handleSubmit = event => {

    event.preventDefault();
    let {  login } = this.state;
    let { loginData } = this.props;
    console.log(login);
      this.props.login(login).then(() => {
        // Stop Loader
        // this.setState({loading:false});
        // this.props.onClose(NoticeType.ADD);
        this.setSession();
      //  this.props.history.push('/admin/personnel');
      });

  }

  render() {

    const generalFields = [
      {name: 'Username', type: 'input', domID: 'username', valFieldID: 'username', required: true },
      {name: 'Password', type: 'password', domID: 'password', valFieldID: 'password', required: true },
    ];
    
    return (
      <div className="login">
        <div className="col-md-12">
          <FullHeaderLine headerText="unclassified"/>
        </div>
        <div className="col-md-12 logo">
          <img src="/assets/img/login/logo.png" />
        </div>
        <div className="col-md-12">
          <div className="second-header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              a-isr mission Manager
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
        </div>
        <div className="col-md-12 login-part"> 
          <div className="col-md-6 login-img">
            <div><img src="/assets/img/login/passport.png" /></div>
          </div>
          <div className="col-md-6 login-win">
            <div><img src="/assets/img/login/line_top.png" /></div>
            <div className="login-info">
              {/* <div className="col-md-12 login-text">
                Change Password
              </div>
              <div className="col-md-12 login-input">
                <input defaultValue="User Name" />
              </div>
              <div className="col-md-12 login-input">
                <input defaultValue="Password" />
              </div>
              <div className="col-md-12 login-button">
                 <div className="row action-buttons" >
                  <div className="menu-button">
                    <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                    <button className="highlighted-button" onClick={this.onClear.bind(this)}>
                      CLEAR
                    </button>
                    <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                  </div>
                  <div className="menu-button">
                    <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                    < NavLink to="dashboard">
                      <button className="highlighted-button" onClick={this.onEnter.bind(this)}>
                        ENTER
                      </button>
                    </NavLink>
                    <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                  </div>
                </div>
              </div> */}
           <form action="" onSubmit={this.handleSubmit}>   
            <div className="col-md-3"></div>
              <ContentBlock 
              fields={generalFields} data={this.handleGeneralPersonnelData} initstate ={this.state.login} editId = {0} />
              

              <div className="row action-buttons">
                  <div className="menu-button">
                    <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                    <button type="submit" className='highlighted-button'>
                      Submit        
                    </button>
                    <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
              </div>
              </form>    
            </div>
            
            <div>
              <img src="/assets/img/login/line_down.png" /></div>



          </div>

          
        </div>

                        

        <div className="col-md-12 app-name">
          centcom a-isr mission manager
        </div>
        <div className="col-md-12 logo-text">
          <div className="text-header">
            Use of this or any other DoD interest computer system constitutes comsent to monitoring at all times.
          </div>
          <div className="text-body">
            This is a DoD interest computer system. All DoD interest computer systems and related equipment are intended for the communication, transmission, processing, and storage of official U.S. Government or other authorized information only. All DoD interest 
computer systems are subject to monitoring at all times to ensure proper functioning of equipment and systems including security devices and systems, to prevent unauthorized use and violations of statutes and security regulations, to deter criminal activity, and for other similar purposes. Any user of a DoD interest computer system should be aware that any information placed in the system is subject to monitoring and is not subject to any expectation of privacy. If monitoring of this or any other DoD interest 
computer system reveals possible evidence of violation of criminal statutes, this evidence and any other related information, including identification information about the user, may be provided to law enforcement officials. If monitoring of this or any other 
DoD interest computer systems reveals violations of security regulations or unauthorized use, employees who violate security regulations or make unauthorized use of DoD interest computer systems are subject to appropriate disciplinary action.
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  children: PropTypes.element,

};




export default LoginComponent;
