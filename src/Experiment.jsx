import React, { Component } from "react";
import PropTypes from "prop-types";
import CoreExperiment from "./CoreExperiment";
import emitter from "./emitter";
import { getStore } from "./store";
import calculateActiveVariant from "./calculateActiveVariant";
import { ABConsumer } from "./Provider";

emitter.addActiveVariantListener(function(
  experimentName,
  variantName,
  skipSave
) {
  if (skipSave) {
    return;
  }
  getStore().setItem("PUSHTELL-" + experimentName, variantName);
});

export default class Experiment extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    defaultVariantName: PropTypes.string,
    userIdentifier: PropTypes.string
  };

  state = { variant: null };

  static displayName = "Pushtell.Experiment";

  win = () => {
    emitter.emitWin(this.props.name);
  };

  getActiveVariant = async store => {
    return await calculateActiveVariant(
      this.props.name,
      this.props.userIdentifier,
      this.props.defaultVariantName,
      store
    );
  };

  render() {
    return (
      <ABConsumer>
        {store => (
          <CoreExperiment
            {...this.props}
            value={this.getActiveVariant.bind(this, store)}
          />
        )}
      </ABConsumer>
    );
  }
}
