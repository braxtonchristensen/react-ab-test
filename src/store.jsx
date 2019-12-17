// import { getABContext } from "./Provider";
let store;

export const configureStore = passedStore => {
  store = passedStore;
  return store;
};

export const getStore = () => store;

// const noopStore = {
//   getItem: function() {},
//   setItem: function() {}
// };

// store = getABContext();

// if (store) {
//   try {
//     let key = "__pushtell_react__";
//     window.localStorage.setItem(key, key);
//     if (window.localStorage.getItem(key) !== key) {
//       store = noopStore;
//     } else {
//       window.localStorage.removeItem(key);
//       store = window.localStorage;
//     }
//   } catch (e) {
//     store = noopStore;
//   }
// } else {
//   store = noopStore;
// }

// export default store;
