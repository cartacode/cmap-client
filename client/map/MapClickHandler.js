
import { viewers, addPoint } from 'map/viewer';


let plottedNearestPoints = [];

export const clickHandler = {
    'INTEL_REQUEST': intelRequestHandler,
};
function intelRequestHandler(currentlatLong,viewerId){
    let centerPoints = JSON.parse(localStorage.getItem("centerPoints"));
    
    // Find nearest KML center point to point where user clicked 
    let nearestPoint = findNearestPoint(currentlatLong, centerPoints);

    // Plot that nearest point on cesium
    plotNearestPoint(nearestPoint.x, nearestPoint.y, viewerId, "Nearest point");
}
function findNearestPoint(currentlatLong, centerPoints, viewerId){
    var distances = [];
     for(var i=0; centerPoints[i]; i++){
      //  addPoint(centerPoints[i].x, centerPoints[i].y, viewerId, i);
        let yDistance = centerPoints[i].y - currentlatLong.latitude;
        let xDistance = centerPoints[i].x - currentlatLong.longitude;
        let distance = Math.sqrt(yDistance*yDistance + xDistance*xDistance);
        distances.push({distance, index: i});
     }
     console.log("---distances", distances);
     distances.sort(function (a, b) {
        return a.distance - b.distance;
      });
      
     
     console.log("---distances sorted", distances);
    return centerPoints[distances[0].index];
}
function plotNearestPoint(x, y, viewerId, label){
    addPoint(x, y, viewerId, label);
}