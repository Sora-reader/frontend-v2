import camelCase from 'lodash.camelcase';
import { IncomingMessage } from 'http';
import { GetServerSideProps } from 'next';
import { wrapper } from '../core/store';
import { getRunningOperationPromises } from '../core/api/mangaApi';
import { ParsedUrlQuery } from 'querystring';

export const isClientNavigation = (req: IncomingMessage) => req.url?.startsWith('/_next');

/** Get a copy of object with all keys in camelCase
 * @param obj original object
 * @param _depth
 * @returns new object with all keys camelCased */
export function camelCaseKeys(obj: any, _depth = 1) {
  let newObject: any = Array.isArray(obj) ? [] : {};

  for (let prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      newObject[camelCase(prop)] = camelCaseKeys(obj[prop], _depth);
    } else {
      newObject[camelCase(prop)] = obj[prop];
    }
  }

  return newObject;
}

/** Wrapper for param extraction and validation */
export const extractParam = (params: ParsedUrlQuery, key: string) => {
  const param = params[key];
  return (typeof param === 'string' && param !== 'undefined' && param) || undefined;
};

// (store) => ...
type gsspPropsCallbackParams = Parameters<typeof wrapper.getServerSideProps>[0];
// store param of ^                                         ^
type gsspStore = Parameters<gsspPropsCallbackParams>[0]; // |
// Params of async handler which is a return type of        |                 ⌄ make params required
type gsspHandlerParams = Parameters<ReturnType<gsspPropsCallbackParams>>[0] & { params: ParsedUrlQuery };
/** Boilerplate function to generate getServerSideProps when using RTK.
 * @param f callback function that given store and context handles parsing params and dispatching actions */
export const RTKSSRBoilerplate = (f: (a1: gsspStore, a2: gsspHandlerParams) => Promise<any>) =>
  wrapper.getServerSideProps((store) => async ({ req, params, ...other }) => {
    const isClient = isClientNavigation(req);
    let props = {};

    if (!isClient) {
      const requiredParams = params as ParsedUrlQuery;
      props = (await f(store, { req, params: requiredParams, ...other })) || {};

      await Promise.all(getRunningOperationPromises());
    }

    return {
      props,
    };
  }) as GetServerSideProps;
