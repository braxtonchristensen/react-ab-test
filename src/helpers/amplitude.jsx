import emitter from "../emitter";

let playSubscription, winSubscription;

export default {
  enable(analytics) {
    if (typeof analytics === "undefined") {
      const error = new Error(
        "React A/B Test Amplitude Helper: analytics parameter is not provided."
      );
      error.type = "PUSHTELL_HELPER_MISSING_GLOBAL";
      throw error;
    }
    playSubscription = emitter.addPlayListener(function(
      experimentName,
      variantName
    ) {
      analytics.logEvent("Experiment Viewed", {
        experimentName: experimentName,
        variationName: variantName
      });

      emitter.emit("amplitude-play", experimentName, variantName);
    });
    winSubscription = emitter.addWinListener(function(
      experimentName,
      variantName
    ) {
      analytics.logEvent("Experiment Won", {
        experimentName: experimentName,
        variationName: variantName
      });

      emitter.emit("amplitude-win", experimentName, variantName);
    });
  },
  disable() {
    if (!playSubscription || !winSubscription) {
      const error = new Error(
        "React A/B Test Amplitude Helper: Helper was not enabled."
      );
      error.type = "PUSHTELL_HELPER_INVALID_DISABLE";
      throw error;
    }
    playSubscription.remove();
    winSubscription.remove();
  }
};
