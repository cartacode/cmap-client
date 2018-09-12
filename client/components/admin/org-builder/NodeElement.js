import React from 'react';
import PropTypes from 'prop-types';

class NodeElement extends React.PureComponent {
  handleClick = function(event,nodeData){
    event.stopPropagation();
    console.log("Stopped");
    console.log(nodeData.unitID);
    if(nodeData.unitID)
    {
      console.log("Org");
      this.props.check(nodeData);
    }
  }

  render() {
    const {className, nodeData} = this.props;
    let type;
    if (nodeData.unitLogo == null) {
        nodeData.unitLogo = nodeData.PhotoPath;
    }

    if(nodeData.Rank)
    {
      nodeData.type = "Personnel";
    }
    return (
      <div className={className}>
        <div className="element-bg">
        <img className="img-valign" src={nodeData.unitLogo} height="55" width="55"/>
          <div className="text-1">{nodeData.UnitName}{nodeData.FullName} <br/>
       
       {nodeData.type === "Personnel" ?  (<span><span className="rank-text">{nodeData.Rank}</span> <br/>
       <span className="unit-text"> {nodeData.DutyPosition}</span></span>) : (<span> <br/>
       <span className="unit-text"> {nodeData.Location}</span> <br/> </span>) }
          
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
              <span className="glyphicon glyphicon-plus-sign" onClick={(e) => this.handleClick(e,nodeData)}/>
            &nbsp;
            <a href="#">
              <span className="glyphicon glyphicon-edit"/>
            </a>&nbsp;
            <a href="#">
              <span className="glyphicon glyphicon-remove-sign"/>
            </a>
          </div>
        </div>
         {/* {nodeData._children && 
        <button>{nodeData._collapsed ? 'Expand' : 'Collapse'}</button>
        }  */}
      </div>
    );
  }
}

NodeElement.propTypes = {
  className: PropTypes.any,
  nodeData: PropTypes.object,
};

export default NodeElement;
