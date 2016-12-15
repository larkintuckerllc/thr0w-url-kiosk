import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromChannel from '../../ducks/channel';
import * as fromConnected from '../../ducks/connected';

class Connect extends Component {
  componentDidMount() {
    const { disconnect, thr0wConnect, removeChannel } = this.props;
    let connecting = true;
    const repeat = () => {
      if (!connecting) return;
      thr0wConnect()
      .then(
        () => {
          connecting = false;
        },
        error => {
          if (error.name !== 'Thr0wException') {
            console.log(error);
            return;
          }
          window.setTimeout(repeat, 5000);
        }
      );
    };
    const checkEsc = (e) => {
      if (e.keyCode !== 27) return;
      document.removeEventListener('keydown', checkEsc);
      connecting = false;
      removeChannel();
      disconnect();
    };
    document.addEventListener('keydown', checkEsc);
    repeat();
  }
  render() {
    return (
      null
    );
  }
}
Connect.propTypes = {
  disconnect: PropTypes.func.isRequired,
  thr0wConnect: PropTypes.func.isRequired,
  removeChannel: PropTypes.func.isRequired,
};
export default connect(
  null,
  {
    disconnect: fromConnected.disconnect,
    removeChannel: fromChannel.removeChannel,
    thr0wConnect: fromConnected.connect,
  }
)(Connect);
