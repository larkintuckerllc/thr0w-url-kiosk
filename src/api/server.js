import { setBaseHttp, setBaseSocket } from './thr0w';

let server;
export const initialize = (cb) => {
  chrome.storage.local.get('serverStorage', ({ serverStorage }) => {
    server = serverStorage === undefined ? null : serverStorage;
    if (server !== null) {
      setBaseHttp(`${server}:3000`);
      setBaseSocket(`${server}:3001`);
    }
    cb();
  });
};
export const getServer = () => server;
export const setServer = (value) => {
  server = value;
  setBaseHttp(`${server}:3000`);
  setBaseSocket(`${server}:3001`);
  chrome.storage.local.set({ serverStorage: server });
};
export const removeServer = () => {
  chrome.storage.local.remove('serverStorage');
};
