import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getDefaultUrl } from '../../ducks/defaultUrl';
import { getServer } from '../../ducks/server';
import { getAuthenticated } from '../../ducks/authenticated';
import { getChannel } from '../../ducks/channel';
import { getConnected } from '../../ducks/connected';
import DefaultUrl from './DefaultUrl';
import Server from './Server';
import Authentication from './Authentication';
import Channel from './Channel';
import Connect from './Connect';
import Webview from './Webview';

const App = ({ authenticated, channel, connected, defaultUrl, server }) => {
  if (defaultUrl === null) return <DefaultUrl />;
  if (server === null) return <Server />;
  if (!authenticated) return <Authentication />;
  if (channel === null) return <Channel />;
  if (!connected) return <Connect />;
  return <Webview />;
};
App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  channel: PropTypes.number,
  connected: PropTypes.bool.isRequired,
  defaultUrl: PropTypes.string,
  server: PropTypes.string,
};
export default connect(
  state => ({
    authenticated: getAuthenticated(state),
    channel: getChannel(state),
    connected: getConnected(state),
    defaultUrl: getDefaultUrl(state),
    server: getServer(state),
  }),
  null
)(App);
