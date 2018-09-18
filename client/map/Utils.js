

export const UTILS = {
    kmlLookUp: performKMLLookUp,
    naipoiLookUp: performLocationLookUp,

}
function performLocationLookUp(currentLatLong){
  let nai=JSON.parse(localStorage.getItem("NAI")),
      poi=JSON.parse(localStorage.getItem("POI")),
      locations=nai.concat(poi),
      distances = [];
    for(var i=0; locations[i]; i++){
      let xDistance = locations[i].locationLongitude-currentLatLong.longitude,
          yDistance = locations[i].locationLatitude-currentLatLong.latitude,
          distance = Math.sqrt(xDistance*xDistance + yDistance*yDistance);
          distances.push({distance, index: i});
    }
    distances.sort(function (a, b) {
      return a.distance - b.distance;
    });
    return locations[distances[0].index];
  

}
function performKMLLookUp(currentLatLong) {
      let centerPoints = [];
      let KMLdata = JSON.parse(localStorage.getItem("KMLdata"));
      for(let i=0; KMLdata[i]; i++){
        if(KMLdata[i].CenterPoint){
          var centers=KMLdata[i].CenterPoint.split(";");
          if(centers.length > 1){
            for(let j=0; centers[j]; j++) {
              centerPoints.push({CCIRPIRId: KMLdata[i].CCIRPIRId, missionName: KMLdata[i].MissionName,point: centers[j], KMLUri: KMLdata[i].EffectiveAreaKML, CCIRPIR: [KMLdata[i].Description4,KMLdata[i].Description5,KMLdata[i].Description6]});
            }
          } else{
            centerPoints.push({CCIRPIRId: KMLdata[i].CCIRPIRId, missionName: KMLdata[i].MissionName,point: centers, KMLUri: KMLdata[i].EffectiveAreaKML, CCIRPIR: [KMLdata[i].Description4,KMLdata[i].Description5,KMLdata[i].Description6]});
            
          }
        }
        
      }
      console.log("centers", centerPoints);
    
    
      //finding nearest point
    
      let distances = [];
      for(let i=0; centerPoints[i]; i++){
        let point = centerPoints[i].point.split(",");
        let xDistance = Number(point[0]) - currentLatLong.longitude;
        let yDistance = Number(point[1]) - currentLatLong.latitude;
        let distance = Math.sqrt(yDistance*yDistance + xDistance*xDistance);
        distances.push({distance, index: i});
    
      }
      
      distances.sort(function (a, b) {
        return a.distance - b.distance;
      });
      console.log("nearest--", centerPoints[distances[0].index]);
      return centerPoints[distances[0].index];
    
    
}