import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default () => {
  const middlewares = [
    thunk,
  ];
  return createStore(
    reducers,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ?
        window.devToolsExtension() : f => f
    )
  );
};
