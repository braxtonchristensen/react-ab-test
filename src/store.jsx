let store;

export const configureStore = passedStore => {
  store = passedStore;
  return store;
};

export const getStore = () => store;
