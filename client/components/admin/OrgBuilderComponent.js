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

let forceRemount = 0;
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
          UnitName: 'Larry Pickering',
          unitLogo: '/assets/img/admin/avatar.png',
          type:'Personnel',
          attributes: {
            Rank: 'Commanding General',
            Unit: '82nd Airborne Division',
          },
          children: [
            {
              id: '1.1',
              UnitName: 'Steve Lockwood',
              unitLogo: '/assets/img/admin/avatar.png',
              type:'Personnel',
              attributes: {
                Rank: 'Commander',
                Unit: '82nd Airborne Division',
              },
            },
            {
              id: '1.2',
              UnitName: 'Mike Kelly',
              unitLogo: '/assets/img/admin/avatar.png',
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

    // let testdata = [
    //   {
    //     id:'1',
    //     name:allOrganicOrgs.UnitName,
    //     image: '/assets/img/admin/primoris_backgr.png',
    //     type:'Org',
    //     attributes: {
    //       Location: allOrganicOrgs.LocationName,
    //     }
    //   }

    // ];

    

    // testdata[0].children = [];
    // for (let i=0; i<allOrganicOrgs.subordinateUnits.length; i++)
    // {
    //     testdata[0].children.push({name:allOrganicOrgs.subordinateUnits[i].UnitName, image: '/assets/img/admin/primoris_backgr.png',
    //     type:'Org',
    //     attributes: {
    //       Location: allOrganicOrgs.subordinateUnits[i].LocationName,
    //     }
    //     });
    // }
    // console.log(testdata);
    

    // let orgData2 = [
    //    {
    //      id: '1',
    //      name: allOrganicOrgs.UnitName,
    //      image: '/assets/img/admin/primoris_backgr.png',
    //      type:'Org',
    //      attributes: {
    //        Location: allOrganicOrgs.LocationName,
    //       },
    //      children: [
    //        {
    //          id: '1.1',
    //          name: allOrganicOrgs.subordinateUnits[0].UnitName,
    //          image: '/assets/img/admin/primoris_backgr.png',
    //          type:'Org',
    //          attributes: {
    //            Location: allOrganicOrgs.subordinateUnits[0].LocationName,
    //          },
    //        },
    //        {
    //          id: '1.2',
    //          name: allOrganicOrgs.subordinateUnits[1].UnitName,
    //          image: '/assets/img/admin/primoris_backgr.png',
    //          type:'Org',
    //          attributes: {
    //            Location: allOrganicOrgs.subordinateUnits[1].LocationName,
    //          },
    //        },
    //      ],
    //    },
    //  ];

    let orgData2 = [ allOrganicOrgs ];

    forceRemount = forceRemount +1;
   
     this.setState({
       orgData: orgData2
     });
   }

   personnelChartView = () => {
    
    let orgData = [
       {
        id: '1',
        UnitName: 'Larry Pickering',
        unitLogo: '/assets/img/admin/avatar.png',
        type:'Personnel',
        attributes: {
          Rank: 'Commanding General',
          Unit: '82nd Airborne Division',
        },
        children: [
          {
            id: '1.1',
            UnitName: 'Steve Lockwood',
            unitLogo: '/assets/img/admin/avatar.png',
            type:'Personnel',
            attributes: {
              Rank: 'Commander',
              Unit: '82nd Airborne Division',
            },
          },
          {
            id: '1.2',
            UnitName: 'Mike Kelly',
            unitLogo: '/assets/img/admin/avatar.png',
            type:'Personnel',
            attributes: {
              Rank: 'Commander',
              Unit: '82nd Airborne Division',
            },
          },
        ],
       },
     ];

     let orgSample = [ {"PersonnelID": "123", "UnitName": "Test 1", "Rank": null, "RankAbbreviation": null, "DutyPosition": null, "PhotoPath": null, "AssignedUnitID": 0, "children" : [
      {"PersonnelID": "123", "UnitName": "Test 1", "Rank": null, "RankAbbreviation": null, "DutyPosition": null, "PhotoPath": null, "AssignedUnitID": 0}, {"PersonnelID": "123", "UnitName": "Test 1", "Rank": null, "RankAbbreviation": null, "DutyPosition": null, "PhotoPath": null, "AssignedUnitID": 0}
      ] } ];

      let orgSample2 = [{
        "PersonnelID": null,
        "FullName": null,
        "Rank": null,
        "RankAbbreviation": null,
        "DutyPosition": null,
        "PhotoPath": null,
        "AssignedUnitID": null,
        "Tier": 0,
        "children": [
          {
            "PersonnelID": "2f4b3c05-e612-4411-a9aa-e60628821837",
            "FullName": "mark koch",
            "Rank": "Chief Warrant Officer 3",
            "RankAbbreviation": "CW3",
            "DutyPosition": null,
            "PhotoPath": null,
            "AssignedUnitID": 15,
            "Tier": 1,
            "children": [
              {
                "PersonnelID": "4e2634a4-99d1-4673-a095-cb3e47a5a189",
                "FullName": "Nikhil Mahajan",
                "Rank": null,
                "RankAbbreviation": null,
                "DutyPosition": "ISR Operations NCO",
                "PhotoPath": null,
                "AssignedUnitID": 15,
                "Tier": 2,
                "children": null
              },
              {
                "PersonnelID": "64871d25-4940-4d4f-ae61-d590e65dfa52",
                "FullName": "john Layfield Layfield",
                "Rank": "Private",
                "RankAbbreviation": "PVT",
                "DutyPosition": null,
                "PhotoPath": null,
                "AssignedUnitID": 16,
                "Tier": 2,
                "children": [
                  {
                    "PersonnelID": "69eb4a99-c2b9-4fe5-b86b-cd01a9615b48",
                    "FullName": "Jhon  Leus",
                    "Rank": "Seaman",
                    "RankAbbreviation": "SN",
                    "DutyPosition": null,
                    "PhotoPath": null,
                    "AssignedUnitID": 16,
                    "Tier": 3,
                    "children": null
                  },
                  {
                    "PersonnelID": "edebbbd7-64f4-4321-9a64-40b601430ca8",
                    "FullName": "Fiona Gahlager",
                    "Rank": "General",
                    "RankAbbreviation": "GEN",
                    "DutyPosition": "ISR Tactical Controller",
                    "PhotoPath": null,
                    "AssignedUnitID": 19,
                    "Tier": 3,
                    "children": []
                  },
                  {
                    "PersonnelID": "c667a391-5cd3-4192-bd4a-65d38fe5ddd5",
                    "FullName": "Bill Snyder",
                    "Rank": null,
                    "RankAbbreviation": null,
                    "DutyPosition": "Chief, Analytical Control Element",
                    "PhotoPath": null,
                    "AssignedUnitID": 17,
                    "Tier": 3,
                    "children": [
                      {
                        "PersonnelID": "7af16e1f-04c5-4275-8e56-de5448ac8a00",
                        "FullName": "bORIS J",
                        "Rank": "Private First Class",
                        "RankAbbreviation": "PFC",
                        "DutyPosition": "Collection Planner",
                        "PhotoPath": null,
                        "AssignedUnitID": 17,
                        "Tier": 4,
                        "children": null
                      }
                    ]
                  },
                  {
                    "PersonnelID": "d613a28a-b609-46f8-acd2-0b52720baa17",
                    "FullName": "Hong ",
                    "Rank": null,
                    "RankAbbreviation": null,
                    "DutyPosition": null,
                    "PhotoPath": "map2.png",
                    "AssignedUnitID": 18,
                    "Tier": 3,
                    "children": [
                      {
                        "PersonnelID": "e6125f8b-4626-4550-a7af-25ce07fe0941",
                        "FullName": "jon shane",
                        "Rank": "Master Sergeant",
                        "RankAbbreviation": "MSGT",
                        "DutyPosition": null,
                        "PhotoPath": null,
                        "AssignedUnitID": 18,
                        "Tier": 4,
                        "children": null
                      }
                    ]
                  }
                ]
              },
              {
                "PersonnelID": "959658a1-6fe0-4d7c-bba6-4680d13a818e",
                "FullName": "Mike Martin",
                "Rank": null,
                "RankAbbreviation": null,
                "DutyPosition": null,
                "PhotoPath": null,
                "AssignedUnitID": 56,
                "Tier": 2,
                "children": []
              }
            ]
          }
        ]
      }];
   
     this.setState({
       orgData: orgSample2,       
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
          <TreeComponent data={this.state.orgData} forceRemount={forceRemount} collapsible={true}/>
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
