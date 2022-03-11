/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import VeridaHelper from "./VeridaHelper";

const initialized = (to: any, next: any) => {
  if (VeridaHelper.connected && to.meta.field === "info" && to.query.uri) {
    return next();
  } else {
    if (VeridaHelper.connected) {
      return next();
    } else {
      if (to.query.uri) {
        localStorage.setItem(
          "uri_state",
          JSON.stringify({ uri: to.query.uri, path: to.path })
        );
      }
      next("/connect");
    }
  }
};

export const LocalRouteGuard = (to: any, from: any, next: unknown): any => {
  return initialized(to, next);
};
