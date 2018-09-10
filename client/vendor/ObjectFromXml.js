
/**
 * Tries to convert a given XML data to a native JavaScript object by traversing the DOM tree.
 * If a string is given, it first tries to create an XMLDomElement from the given string.
 * 
 * @param {XMLDomElement|String} source The XML string or the XMLDomElement prefreably which containts the necessary data for the object.
 * @param {Boolean} [includeRoot] Whether the "required" main container node should be a part of the resultant object or not.
 * @return {Object} The native JavaScript object which is contructed from the given XML data or false if any error occured.
 */
function loadDoc(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (xhr.status == 200) {
              // Resolve the promise with the response text
              resolve(xhr.responseXML);
            }
            else {
              // Otherwise reject with the status text
              // which will hopefully be a meaningful error
              reject(Error(xhr.statusText));
            }
        }
      
        xhr.send();
      });
}
window.ObjectfromXML = function( source ) {
    return loadDoc(source);
    
};
window.processsXML = function(source){
    var corrdinateElements = source.getElementsByTagName("coordinates");
    var center = [];
    for(let i=0; corrdinateElements[i]; i++) {
        var coordinatesArray = corrdinateElements[i].innerHTML.replace(/(\r\n\t|\n|\r\t)/gm,"").
                            replace(/\s/g, "*").
                            split("*").
                            clean("").
                            clean(undefined);
        for(let i=0;coordinatesArray[i];i++){
            let xyzValues = coordinatesArray[i].split(",");
            coordinatesArray[i] = {
                x: Number(xyzValues[0]),
                y: Number(xyzValues[1]),
            }
        }
        var con = new Contour(coordinatesArray);
        center.push(con.centroid());
    }
    return center;
}

String.prototype.clean = function() {
    var self = this;
    return this.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "");
}
Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  }
