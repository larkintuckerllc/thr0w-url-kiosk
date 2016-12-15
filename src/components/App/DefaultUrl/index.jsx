import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as fromDefaultUrl from '../../../ducks/defaultUrl';
import ValidatedTextInput from '../../ValidatedTextInput';
import styles from './index.scss';

const DEFAULT_URL_FORM = 'DEFAULT_URL_FORM';
const DefaultUrl = ({
  handleSubmit,
  submitting,
  valid,
}) => (
  <div id={styles.root}>
    <form onSubmit={handleSubmit}>
      <Field
        component={ValidatedTextInput} name="defaultUrl"
        disabled={submitting} props={{ placeholder: 'http(s)://default' }}
      />
      <div className="form-group">
        <button
          disabled={!valid || submitting}
          type="submit" className="btn btn-default"
        >Set Default</button>
      </div>
    </form>
  </div>
);
DefaultUrl.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};
const DefaultUrlForm = reduxForm({
  form: DEFAULT_URL_FORM,
  validate: ({ defaultUrl }) => {
    const errors = {};
    if (
      defaultUrl === undefined ||
      defaultUrl === ''
    ) errors.defaultUrl = '400';
    return errors;
  },
})(DefaultUrl);
class DefaultUrlSubmit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit({ defaultUrl }) {
    const { setDefaultUrl } = this.props;
    setDefaultUrl(defaultUrl);
    return Promise.resolve();
  }
  render() {
    return (
      <DefaultUrlForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}
DefaultUrlSubmit.propTypes = {
  setDefaultUrl: PropTypes.func.isRequired,
};
export default connect(
  null,
  {
    setDefaultUrl: fromDefaultUrl.setDefaultUrl,
  }
)(DefaultUrlSubmit);
