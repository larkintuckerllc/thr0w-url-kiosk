import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import authenticated from './ducks/authenticated';
import channel from './ducks/channel';
import connected from './ducks/connected';
import server from './ducks/server';
import url from './ducks/url';
import defaultUrl from './ducks/defaultUrl';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  authenticated,
  channel,
  connected,
  server,
  url,
  defaultUrl,
});
