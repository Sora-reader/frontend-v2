import _ from 'lodash';
import {IncomingMessage} from "http";

export const isClientNavigation = (req: IncomingMessage) => req.url?.startsWith('/_next');


/**
 * Get a copy of object with all keys in camelCase
 * @param obj original object
 * @param _depth
 * @returns new object with all keys camelCased
 */
export function camelCaseKeys(obj: any, _depth = 1) {
  let newObject: any = Array.isArray(obj) ? [] : {};

  for (let prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      newObject[_.camelCase(prop)] = camelCaseKeys(obj[prop], _depth);
    } else {
      newObject[_.camelCase(prop)] = obj[prop];
    }
  }

  return newObject;
}
