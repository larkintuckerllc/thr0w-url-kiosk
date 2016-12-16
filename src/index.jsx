import 'babel-polyfill';
import 'bootstrap-loader';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as fromApiServer from './api/server';
import * as fromApiThr0w from './api/thr0w';
import * as fromApiDefaultUrl from './api/defaultUrl';
import * as fromDefaultUrl from './ducks/defaultUrl';
import * as fromServer from './ducks/server';
import * as fromAuthenticated from './ducks/authenticated';
import * as fromChannel from './ducks/channel';
import configureStore from './configureStore';
import App from './components/App';
import './favicon.ico';
import './index.scss';

chrome.power.requestKeepAwake('display');
fromApiServer.initialize(() => {
  fromApiThr0w.initialize(() => {
    fromApiDefaultUrl.initialize(() => {
      const store = configureStore();
      const defaultUrl = fromApiDefaultUrl.getDefaultUrl();
      const server = fromApiServer.getServer();
      const authenticated = fromApiThr0w.authenticated();
      const channel = fromApiThr0w.getChannel();
      if (defaultUrl !== null) {
        store.dispatch(fromDefaultUrl.setDefaultUrl(defaultUrl));
      }
      if (server !== null) {
        store.dispatch(fromServer.setServer(server));
      }
      if (authenticated) {
        fromAuthenticated.autoLogin()(store.dispatch);
      }
      if (channel !== null) {
        store.dispatch(fromChannel.setChannel(parseInt(channel, 10)));
      }
      render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById('root')
      );
    });
  });
});
