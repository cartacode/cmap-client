import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonsList from "../reusable/ButtonsList";
import Accordion from "../reusable/Accordion";
import Dropdown from "../reusable/Dropdown";
// import '../../vendor/treant-js/Treant.css';
// import '../../vendor/treant-js/examples/custom-colored/custom-colored.css';
// import '../../vendor/treant-js/vendor/raphael.js';
// import '../../vendor/treant-js/Treant.js';

// import '../../../node_modules/treant-js/Treant.css';
// import '../../../node_modules/treant-js/examples/custom-colored/custom-colored.css';
// import '../../../node_modules/treant-js/vendor/raphael.js';
// import Treant from '../../../node_modules/treant-js/Treant.js';

class OrgBuilderComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  renderSchema = () => {

  };


  componentDidMount() {
    var config = {
        container: "#custom-colored",
        nodeAlign: "BOTTOM",
        connectors: {
          type: 'step'
        },
        node: {
          HTMLclass: 'nodeExample1'
        }
      },
      ceo = {
        text: {
          name: "Mark Hill",
          title: "Chief executive officer",
          contact: "Tel: 01 213 123 134",
        },
        image: "/assets/img/admin/avatar.png"
      },

      cto = {
        parent: ceo,
        text:{
          name: "Joe Linux",
          title: "Chief Technology Officer",
        },
        image: "/assets/img/admin/avatar.png"
      },
      cbo = {
        parent: ceo,
        connectors: {
          style: {
            color: 'white',
            backgroundColor: 'white',
          }
        },
        childrenDropLevel: 2,
        text:{
          name: "Linda May",
          title: "Chief Business Officer",
        },
        image: "/assets/img/admin/avatar.png"
      },
      cdo = {
        parent: ceo,
        text:{
          name: "John Green",
          title: "Chief accounting officer",
          contact: "Tel: 01 213 123 134",
        },
        image: "/assets/img/admin/avatar.png"
      },
      cio = {
        parent: cto,
        text:{
          name: "Ron Blomquist",
          title: "Chief Information Security Officer"
        },
        image: "/assets/img/admin/avatar.png"
      },
      ciso = {
        parent: cto,
        text:{
          name: "Michael Rubin",
          title: "Chief Innovation Officer",
          contact: "we@aregreat.com"
        },
        image: "/assets/img/admin/avatar.png"
      },
      cio2 = {
        parent: cdo,
        text:{
          name: "Erica Reel",
          title: "Chief Customer Officer"
        },
        image: "/assets/img/admin/avatar.png"
      },
      ciso2 = {
        parent: cbo,
        text:{
          name: "Alice Lopez",
          title: "Chief Communications Officer"
        },
        image: "/assets/img/admin/avatar.png"
      },
      ciso3 = {
        parent: cbo,
        text:{
          name: "Mary Johnson",
          title: "Chief Brand Officer"
        },
        image: "/assets/img/admin/avatar.png"
      },
      ciso4 = {
        parent: cbo,
        text:{
          name: "Kirk Douglas",
          title: "Chief Business Development Officer"
        },
        image: "/assets/img/admin/avatar.png"
      },

      chart_config = [
        config,
        ceo,cto,cbo,
        cdo,cio,ciso,
        cio2,ciso2,ciso3,ciso4
      ];

    setTimeout(() => {
      new Treant(chart_config)
    }, 0);
  }

  render() {

    const {translations} = this.props;

    return (
      <div>
        <div className="row personnel" >
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["organisation builder"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
        </div>
        <div className="row personnel" >
          <div className="org-builder">
            <Accordion />
            <div className="schema">
              <div className="chart" id="custom-colored"> --@-- </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OrgBuilderComponent.propTypes = {
  children: PropTypes.element,

};

export default OrgBuilderComponent;
