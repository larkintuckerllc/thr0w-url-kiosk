let defaultUrl;
export const initialize = (cb) => {
  chrome.storage.local.get('defaultUrlStorage', ({ defaultUrlStorage }) => {
    defaultUrl = defaultUrlStorage === undefined ? null : defaultUrlStorage;
    cb();
  });
};
export const getDefaultUrl = () => defaultUrl;
export const setDefaultUrl = (value) => {
  defaultUrl = value;
  chrome.storage.local.set({ defaultUrlStorage: defaultUrl });
};
export const removeDefaultUrl = () => {
  chrome.storage.local.remove('defaultUrlStorage');
};
