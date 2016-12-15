import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as fromServer from '../../../ducks/server';
import * as fromDefaultUrl from '../../../ducks/defaultUrl';
import ValidatedTextInput from '../../ValidatedTextInput';
import styles from './index.scss';

const SERVER_FORM = 'SERVER_FORM';
const Server = ({
  handleSubmit,
  removeDefaultUrl,
  submitting,
  valid,
}) => (
  <div id={styles.root}>
    <form onSubmit={handleSubmit}>
      <Field
        component={ValidatedTextInput} name="server"
        disabled={submitting} props={{ placeholder: 'http(s)://server' }}
      />
      <div className="form-group">
        <button
          disabled={!valid || submitting}
          type="submit" className="btn btn-default"
        >Set Server</button>
      </div>
      <div className="form-group">
        <button
          disabled={submitting}
          type="button"
          className="btn btn-default"
          onClick={removeDefaultUrl}
        >Unset Default</button>
      </div>
    </form>
  </div>
);
Server.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  removeDefaultUrl: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};
const ServerForm = reduxForm({
  form: SERVER_FORM,
  validate: ({ server }) => {
    const errors = {};
    if (
      server === undefined ||
      server === ''
    ) errors.server = '400';
    return errors;
  },
})(Server);
class ServerSubmit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit({ server }) {
    const { setServer } = this.props;
    setServer(server);
    return Promise.resolve();
  }
  render() {
    const { removeDefaultUrl } = this.props;
    return (
      <ServerForm
        onSubmit={this.handleSubmit}
        removeDefaultUrl={removeDefaultUrl}
      />
    );
  }
}
ServerSubmit.propTypes = {
  removeDefaultUrl: PropTypes.func.isRequired,
  setServer: PropTypes.func.isRequired,
};
export default connect(
  null,
  {
    removeDefaultUrl: fromDefaultUrl.removeDefaultUrl,
    setServer: fromServer.setServer,
  }
)(ServerSubmit);
