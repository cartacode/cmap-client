import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import ButtonsBlock from '../reusable/ButtonsBlock';
import ConfigBlock from '../reusable/ConfigBlock';
import { Redirect } from 'react-router-dom';

import { sysDocsUser } from '../../dictionary/auth';

class ReferenceDocsComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick = (i) => {
    const documentHref = ["../../assets/documents/Tradecraft Technologies - AMPS Marketing Brief September 2018.pdf", "../../assets/documents/Tradecraft Technologies - AMPS Product Marketing Sheet.pdf", "../../assets/documents/Tradecraft Technologies - AMPS Product Roadmap September 2018.pdf", "../../assets/documents/Tradecraft Technologies - AMPS End User Licence Agreement EULA.pdf", "http://18.222.48.211:8081/swagger/ui/index#/"];
    window.location.href=documentHref[i];
  }

  handleClick2 = (i) => {
    const documentHref = ["../../assets/documents/Tradecraft Technologies - AMPS High-level Architecture Diagram.pdf", "../../assets/documents/Tradecraft Technologies - AMPS API Documentation Reference.pdf", "../../assets/documents/Tradecraft Technologies - AMPS Developers Guide.pdf","../../assets/documents/Tradecraft Technologies - AMPS Integration Guide.pdf"];
    window.location.href=documentHref[i];
  }

  handleClick3 = (i) => {
    const documentHref = ["https://github.com/TradecraftTech"];
    window.location.href=documentHref[i];
  }

  handleClicks = (i) => {
    const documentHref2 = ["../../assets/documents/Tradecraft Technologies - AMPS Software Config Mgmt Versioning Guidance.pdf"];
    window.location.href=documentHref2[i];
  }

  handleClicks2 = (i) => {
    const documentHref2 = ["../../assets/documents/Tradecraft Technologies - AMPS Software Config Mgmt Versioning Guidance.pdf", "../../assets/documents/Tradecraft Technologies - AMPS Change Management _ Backwards Compatibility Reference.pdf","../../assets/documents/Tradecraft Technologies - AMPS Error Handling Reference.pdf", "../../assets/documents/Tradecraft Technologies - AMPS System Monitoring Reference.pdf", "../../assets/documents/Tradecraft Technologies - AMPS User Interface Testing and Guidance.pdf"];
    window.location.href=documentHref2[i];
  }

  handleClicks3 = (i) => {
    const documentHref2 = ["../../assets/documents/Tradecraft Technologies - AMPS Software License Ageeement.pdf", "../../assets/documents/Tradecraft Technologies - AMPS End User Licence Agreement EULA.pdf", "../../assets/documents/Tradecraft Technologies - AMPS Software Maintenance and Hardware Warranty Agreement.docx.pdf"];
    window.location.href=documentHref2[i];
  }

  render() {

    const {translations} = this.props;
    const userPermissionButtons = ["AMPS Product Brief", "AMPS Product Sheet", "Product Roadmap",];
    const userPermissionButtons2 = ["Architecture Diagram", "API Documentation", "Developers Guide", "Integrators Guide",];
    const userPermissionButtons3 = ["Source/Binary/Installer Repository",];

    const serverConfigButtons = ["IA Security/SCAP Scan Report",];
    const serverConfigButtons2 = ["Config Management Versioning Guidance", "Change Management & Compatibility Reference", "Error Handling Reference", "System Monitoring Reference", "User Interface Testing & Guidance",];
    const serverConfigButtons3 = ["Software License Agreement", "End User Licence Agreement EULA", "Software Maintenance and Hardware Warranty Agreement",]

    const storageConfigButtons = [translations['direct storage admin'], translations['storage status'], translations['repository quotas'], translations['distributed archive admin'],];
    const videoConfigButtons = [translations['video ingestion'], translations['stream distribution'], translations['bandwidth tracking'], translations['remote hub admin'],];

    
    const mapsWMSConfig = [translations['map server admin'], translations['map repository'], translations['layer admin'], translations['add/delete layers'],];
    const languageMGMT = [translations['language admin'], translations['user/unit language'],];

    const chatServerConfig = [translations['chat server admin'], translations['mission and user assign'], translations['chat search'], translations['chat archive/export'],];
    const securityConfig = [translations['data tagging'], translations['notifications admin'],];

    const iconLibraies = [translations['icon and model admin'], translations['icon association'], translations['add/delete 3d models'], translations['add/delete icons'],];
    const logMGMT = [translations['logging admin'], translations['system logs export'],];

    const enterpriseAPIStatus = [
      {name: translations['PRISM'], type: 'checkbox'},
      {name: translations['CRATE'], type: 'checkbox'},
      {name: translations['Legacy Archive'], type: 'checkbox'},
      {name: translations['Legacy intel Request'], type: 'checkbox'},
      {name: translations['Legacy ATO'], type: 'checkbox'},
      {name: translations['Legacy 8/9 Line'], type: 'checkbox'},
      {name: translations['Legacy Report'], type: 'checkbox'},
      {name: translations['Legacy Depot Status'], type: 'checkbox'},
    ];

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => sysDocsUser.includes(v));

    return ( access ? (
      <div>
        <div className="row sys-config">
          <div className="col-md-12">
            <FullHeaderLine headerText="AMPS Documentation" />
          </div>
          <div className="col-md-12">
          <div className="col-md-2">
            </div>
            <div className="col-md-4">
              <ButtonsBlock buttons={userPermissionButtons} cl={this.handleClick}/>
              <ButtonsBlock buttons={userPermissionButtons2} cl={this.handleClick2}/>
              <ButtonsBlock buttons={userPermissionButtons3} cl={this.handleClick3}/>
            </div>
            <div className="col-md-4">
              <ButtonsBlock buttons={serverConfigButtons} cl={this.handleClicks}/>
              <ButtonsBlock buttons={serverConfigButtons2} cl={this.handleClicks2}/>
              <ButtonsBlock buttons={serverConfigButtons3} cl={this.handleClicks3}/>
            </div>
            <div className="col-md-2">
            </div>
          </div>


        </div>

       
            
        

      </div> ) : null
    );
  }
}

ReferenceDocsComponent.propTypes = {
  children: PropTypes.element,

};

export default ReferenceDocsComponent;
