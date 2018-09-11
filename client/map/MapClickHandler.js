/**
 * MapClickHandler.js contains click callbacks on map 
 */

import { viewers, addPoint } from 'map/viewer';

export const clickHandler = {
    'INTEL_REQUEST': intelRequestHandler,
};
function intelRequestHandler(currentlatLong,viewerId){
    let centerPoints = JSON.parse(localStorage.getItem("centerPoints"));

    // Finding Nearest KML center Point to the point where useer clicked 
    let nearestPoint = findNearestPoint(currentlatLong, centerPoints);

    // Plot that nearest point on cesium
    plotNearestPoint(nearestPoint.x, nearestPoint.y, viewerId, "Nearest neighbour point");
}
function findNearestPoint(currentlatLong, centerPoints, viewerId){
    var distances = [];
     for(var i=0; centerPoints[i]; i++){
        let yDistance = centerPoints[i].y - currentlatLong.latitude;
        let xDistance = centerPoints[i].x - currentlatLong.longitude;
        let distance = Math.sqrt(yDistance*yDistance + xDistance*xDistance);
        distances.push({distance, index: i});
     }
     distances.sort(function (a, b) {
        return a.distance - b.distance;
      });
      
    return centerPoints[distances[0].index];
}
function plotNearestPoint(x, y, viewerId, label){
    addPoint(x, y, viewerId, label);
}