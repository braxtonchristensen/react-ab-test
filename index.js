module.exports = {
  Experiment: require("./lib/Experiment").default,
  Provider: require("./lib/Provider"),
  store: require("./lib/store"),
  Variant: require("./lib/Variant").default,
  emitter: require("./lib/emitter").default,
  experimentDebugger: require("./lib/debugger"),
  mixpanelHelper: require("./lib/helpers/mixpanel").default,
  segmentHelper: require("./lib/helpers/segment").default
};
