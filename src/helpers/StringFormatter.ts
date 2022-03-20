export const getUrlQuery = (url: string): string => {
  const paramsString = url.split("?")[1];
  const searchParams = new URLSearchParams(paramsString);
  const URI = searchParams.get("uri");
  return URI as string;
};
