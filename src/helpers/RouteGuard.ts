// const initialized = (to, next) => {
//   if (VeridaHelper.connected && to.meta.field === "info") {
//     if (store.state.qr && store.state.qr.info) {
//       return next();
//     } else {
//       return next("/connect");
//     }
//   } else {
//     if (VeridaHelper.connected) {
//       return next();
//     } else {
//       if (to.query.uri) {
//         localStorage.setItem(
//           "uri_state",
//           JSON.stringify({ uri: to.query.uri, path: to.path })
//         );
//       }
//       next("/connect");
//     }
//   }
// };

// export const LocalRouteGuard = (to, from, next) => initialized(to, next);
