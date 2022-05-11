/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosClient from "../api/axiosClient";

export const claimAccountPoints = async (
  did: string,
  skillType: string
): Promise<any> => {
  return axiosClient.post("/claim", {
    did,
    claim: skillType,
  });
};
