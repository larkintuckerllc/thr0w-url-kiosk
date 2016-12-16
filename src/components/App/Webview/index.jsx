import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromDefaultUrl from '../../../ducks/defaultUrl';
import * as fromUrl from '../../../ducks/url';
import { offMessage, onMessage } from '../../../api/thr0w';
import styles from './index.scss';

class Webview extends Component {
  constructor() {
    super();
    this.handleMessage = this.handleMessage.bind(this);
  }
  componentDidMount() {
    const { defaultUrl } = this.props;
    this.webviewEl = document.getElementById(styles.root);
    this.webviewEl.setAttribute('partition', 'persist:browser');
    this.webviewEl.src = defaultUrl;
    onMessage(this.handleMessage);
  }
  componentWillReceiveProps(nextProps) {
    const nextUrl = nextProps.url;
    const { url } = this.props;
    if (nextUrl !== url) {
      this.webviewEl.src = nextUrl;
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    offMessage(this.handleMessage);
  }
  handleMessage(data) {
    const { setUrl } = this.props;
    if (
      data !== undefined &&
      data.message !== undefined &&
      data.message.action === 'update' &&
      data.message.url !== undefined
    ) {
      setUrl(data.message.url);
    }
  }
  render() {
    return (
      <webview
        id={styles.root}
      />
    );
  }
}
Webview.propTypes = {
  defaultUrl: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  url: PropTypes.string,
};
export default connect(
  state => ({
    defaultUrl: fromDefaultUrl.getDefaultUrl(state),
    url: fromUrl.getUrl(state),
  }), {
    setUrl: fromUrl.setUrl,
  }
)(Webview);
