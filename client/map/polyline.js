import Cesium from 'cesium/Cesium'; // eslint-disable-line import/no-unresolved
import uuid from 'uuid/v4';

import { getRandomColor, getRGBArray } from 'util/color';

/**
 * The map of polyline collections.
 * @static
 * @type  {Map}
 */
const polylineCollections = new Map();

/**
 * Adds a polyline to the collection corresponding to the provided identifier.
 * @param   {Object}          config              The configuration object.
 * @param   {string}          config.collectionId The identifier of the polyline collection.
 * @param   {string}          [config.color]      The color of the polyline represented as a hex string.
 * @param   {Array.<Object>}  config.points       The coordinate points of the polyline.
 * @param   {number}          [config.width]      The width of the polyline.
 * @returns {Object}
 */
export function addPolyline({ collectionId, color = getRandomColor(), points, width = 2 }) {
  let collection;

  if (polylineCollections.has(collectionId)) {
    collection = polylineCollections.get(collectionId);
  } else {
    collection = new Cesium.PolylineCollection();
    polylineCollections.set(collectionId, collection);
  }

  return collection.add({
    id: `Polyline__${uuid()}`,
    material: new Cesium.Material({
      fabric: {
        type: 'Color',
        uniforms: {
          color: new Cesium.Color(...getRGBArray(color), 1.0),
        },
      },
    }),
    positions: Cesium.Cartesian3.fromDegreesArray(points),
    width,
  });
}

/**
 * Removes the polyline from the collection corresponding to the provided identifier.
 * @param {string}  collectionId  The identifier of the polyline collection.
 * @param {Object}  polyline      The polyline to remove.
 */
export function removePolyline(collectionId, polyline) {
  if (polylineCollections.has(collectionId)) {
    polylineCollections.get(collectionId).remove(polyline);
  }

  polyline.destroy();
}

/**
 * Removes the polyline collection corresponding to the provided identifier.
 * @param {string}  collectionId  The identifier of the polyline collection.
 */
export function removePolylineCollection(collectionId) {
  if (!polylineCollections.has(collectionId)) {
    return;
  }

  const collection = polylineCollections.get(collectionId);

  polylineCollections.delete(collectionId);

  collection.removeAll();
  collection.destroy();
}
