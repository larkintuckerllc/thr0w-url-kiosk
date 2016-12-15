import * as fromApi from '../api/server';
import { ACTION_PREFIX } from '../config';

// API
// REDUCER MOUNT POINT
const reducerMountPoint = 'server';
// ACTIONS
export const SET_SERVER = `${ACTION_PREFIX}SET_SERVER`;
// ACTION CREATOR VALIDATORS
const validServer = value =>
  !(value === undefined || typeof value !== 'string');
// SCHEMA
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_SERVER:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS
export const getServer = (state) => state[reducerMountPoint];
// ACTION CREATORS
export const setServer = (value) => {
  if (!validServer(value)) throw new Error();
  fromApi.setServer(value);
  return ({
    type: SET_SERVER,
    value,
  });
};
export const removeServer = () => {
  fromApi.removeServer();
  return ({
    type: SET_SERVER,
    value: null,
  });
};
