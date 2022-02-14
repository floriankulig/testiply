import { PlatformID } from "ts/types";

interface Links {
  testflightIos: string;
  testflightIpados: string;
  website: string;
}

const generateNewPlatforms = (values: Links): Array<PlatformID> => {
  const newPlatforms: Array<PlatformID> = [];

  !!values.testflightIos && newPlatforms.push("ios");
  !!values.testflightIpados && newPlatforms.push("ipados");
  !!values.website && newPlatforms.push("web");

  return newPlatforms;
};

export default generateNewPlatforms;
