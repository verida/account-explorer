import { CREDENTIAL_URI } from "@/constant";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { VeridaHelper } from "./VeridaHelper";

export const RouteGuard = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  if (VeridaHelper.connected && to.meta.field === "info" && to.query.uri) {
    return next();
  } else {
    if (VeridaHelper.connected) {
      return next();
    } else {
      if (to.query.uri) {
        localStorage.setItem(
          CREDENTIAL_URI,
          JSON.stringify({ uri: to.query.uri, path: to.path })
        );
      }
      next("/connect");
    }
  }
};
