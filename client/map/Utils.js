

export const UTILS = {
    kmlLookUp: performKMLLookUp,

}
function performKMLLookUp(currentLatLong, viewerId) {
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