import React from "react";

let abContext;

export function getABContext() {
  if (!abContext) {
    abContext = React.createContext({});
  }

  return abContext;
}

export const ABConsumer = props => {
  const ABContext = getABContext();
  return (
    <ABContext.Consumer>
      {context => props.children(context.store)}
    </ABContext.Consumer>
  );
};

export const ABProvider = ({ store, children }) => {
  const ABContext = getABContext();

  return (
    <ABContext.Consumer>
      {(context = {}) => {
        if (store && context.store !== store) {
          context = Object.assign({}, context, { store });
        }

        return (
          <ABContext.Provider value={context}>{children}</ABContext.Provider>
        );
      }}
    </ABContext.Consumer>
  );
};
