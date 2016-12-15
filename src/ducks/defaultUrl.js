import * as fromApi from '../api/defaultUrl';
import { ACTION_PREFIX } from '../config';

// API
// REDUCER MOUNT POINT
const reducerMountPoint = 'defaultUrl';
// ACTIONS
export const SET_DEFAULT_URL = `${ACTION_PREFIX}SET_DEFAULT_URL`;
// ACTION CREATOR VALIDATORS
const validDefaultUrl = value =>
  !(value === undefined || typeof value !== 'string');
// SCHEMA
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_DEFAULT_URL:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS
export const getDefaultUrl = (state) => state[reducerMountPoint];
// ACTION CREATORS
export const setDefaultUrl = (value) => {
  if (!validDefaultUrl(value)) throw new Error();
  fromApi.setDefaultUrl(value);
  return ({
    type: SET_DEFAULT_URL,
    value,
  });
};
export const removeDefaultUrl = () => {
  fromApi.removeDefaultUrl();
  return ({
    type: SET_DEFAULT_URL,
    value: null,
  });
};
