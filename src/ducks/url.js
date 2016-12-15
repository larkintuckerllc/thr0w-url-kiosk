import { ACTION_PREFIX } from '../config';

// API
// REDUCER MOUNT POINT
const reducerMountPoint = 'url';
// ACTIONS
export const SET_URL = `${ACTION_PREFIX}SET_URL`;
// ACTION CREATOR VALIDATORS
const validUrl = value =>
  !(value === undefined || typeof value !== 'string');
// SCHEMA
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_URL:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS
export const getUrl = (state) => state[reducerMountPoint];
// ACTION CREATORS
export const setUrl = (value) => {
  if (!validUrl(value)) throw new Error();
  return ({
    type: SET_URL,
    value,
  });
};
