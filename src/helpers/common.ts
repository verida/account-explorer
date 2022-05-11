/**
 *
 * @param url
 * @returns {string}
 */

export const getUrlQuery = (url: string): string => {
  const paramsString = url.split("?")[1];
  const searchParams = new URLSearchParams(paramsString);
  const URI = searchParams.get("uri");
  return URI as string;
};

// @todo: update function that validate blockchain address
/**
 *
 * @param did
 * @returns {string}
 */
export const validateDid = (did: string): boolean => {
  const paths = did.split(":");

  if (paths[0] !== "did") {
    return false;
  }

  if (paths[1] !== "vda") {
    return false;
  }

  if (paths[2].length !== 42) {
    return false;
  }

  return true;
};
