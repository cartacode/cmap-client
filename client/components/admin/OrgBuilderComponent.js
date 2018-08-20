import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonsList from "../reusable/ButtonsList";
import Accordion from "../reusable/Accordion";
import Tree from 'react-d3-tree';
import TreeComponent from './org-builder/TreeComponent';
import AddNodeModal from './org-builder/AddNodeModal';
import OptionsModal from './org-builder/OptionsModal';
import { fetchOrganicOrg } from '../../actions/organicorg';
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
    this.state = {
      isAddNodeFormOpen: false,
      isOptionModalOpen: false,
      nodeId: null,
      treeConfig: {
        orientation: 'vertical',
        svgSquare: {
          shape: 'rect',
          shapeProps: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
            fill: 'yellow',
          },
        },
      },
      orgData: [
        {
          id: '1',
          name: 'Larry Pickering',
          image: '/assets/img/admin/avatar.png',
          type:'Personnel',
          attributes: {
            Rank: 'Commanding General',
            Unit: '82nd Airborne Division',
          },
          children: [
            {
              id: '1.1',
              name: 'Steve Lockwood',
              image: '/assets/img/admin/avatar.png',
              type:'Personnel',
              attributes: {
                Rank: 'Commander',
                Unit: '82nd Airborne Division',
              },
            },
            {
              id: '1.2',
              name: 'Mike Kelly',
              image: '/assets/img/admin/avatar.png',
              type:'Personnel',
              attributes: {
                Rank: 'Commander',
                Unit: '82nd Airborne Division',
              },
            },
          ],
        },
      ],
    };
  }

  componentDidMount = () => {
  this.props.fetchOrganicOrg();
  }

  renderSchema = () => {

  };

  openAddNodeForm = (parentNodeId) => {

    let { orgData } = this.state;
    this.setState({
      isAddNodeFormOpen: true,
    });

  }

  closeAddNodeForm = () => {
    this.setState({
      isAddNodeFormOpen: false,
    });
  }

  openOptionModal = (nodeData, e) => {
    console.log('node data');
    console.log(nodeData);
    this.setState({
      isOptionModalOpen: true,
    });
  }

  closeOptionModal = () => {
    this.setState({
      isOptionModalOpen: false,
    });
  }

  orgChartView = () => {
    console.log("Here");
    const { allOrganicOrgs } = this.props;
    console.log(allOrganicOrgs);

    let orgData2 = [
       {
         id: '1',
         name: allOrganicOrgs[0].UnitName,
         image: '/assets/img/admin/primoris_backgr.png',
         type:'Org',
         attributes: {
           Rank: '',
           Unit: allOrganicOrgs[0].LocationName,
         },
         children: [
           {
             id: '1.1',
             name: allOrganicOrgs[1].UnitName,
             image: '/assets/img/admin/primoris_backgr.png',
             type:'Org',
             attributes: {
               Rank: '',
               Unit: allOrganicOrgs[1].LocationName,
             },
           },
           {
             id: '1.2',
             name: allOrganicOrgs[2].UnitName,
             image: '/assets/img/admin/primoris_backgr.png',
             type:'Org',
             attributes: {
               Rank: '',
               Unit: allOrganicOrgs[2].LocationName,
             },
           },
         ],
       },
     ];
   
     this.setState({
       orgData: orgData2
     });
   }

   personnelChartView = () => {
    
    let orgData = [
       {
        id: '1',
        name: 'Larry Pickering',
        image: '/assets/img/admin/avatar.png',
        type:'Personnel',
        attributes: {
          Rank: 'Commanding General',
          Unit: '82nd Airborne Division',
        },
        children: [
          {
            id: '1.1',
            name: 'Steve Lockwood',
            image: '/assets/img/admin/avatar.png',
            type:'Personnel',
            attributes: {
              Rank: 'Commander',
              Unit: '82nd Airborne Division',
            },
          },
          {
            id: '1.2',
            name: 'Mike Kelly',
            image: '/assets/img/admin/avatar.png',
            type:'Personnel',
            attributes: {
              Rank: 'Commander',
              Unit: '82nd Airborne Division',
            },
          },
        ],
       },
     ];
   
     this.setState({
       orgData: orgData
     });
   }



onSelecOption = (nodeId, name) => {

}

chartData = ()=> {

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

  const { translations } = this.props;
  const { allOrganicOrgs } = this.props;


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
      <div >
        {this.state.isAddNodeFormOpen ?
          <AddNodeModal onClose={this.closeAddNodeForm} translations = {translations}/>
          : null
        }
      </div>
      <div >
        {this.state.isOptionModalOpen ?
          <OptionsModal onSelect={this.onSelecOption} nodeId={this.state.nodeId} onClose={this.closeOptionModal} translations = {translations}/>
          : null
        }
      </div>

      <div className="row personnel" >
       <div className="col-md-3"> 
          { <Accordion orgChart={this.orgChartView} personnelChart={this.personnelChartView}/> }
       </div>   
       <div className="col-md-9"> 
{/*             <Tree data={this.state.orgData} orientation={this.state.treeConfig.orientation} nodeSvgShape= {this.state.treeConfig.svgSquare}/> */}
          <TreeComponent data={this.state.orgData} onNodeClick = {this.openOptionModal}/>
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
