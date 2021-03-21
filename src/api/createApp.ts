import { uploadFile } from "api";
import axios from "axios";
import { FormikValues } from "formik";
import React from "react";
import { CategoryID, User } from "ts";
import { Category, PlatformID } from "ts/types";

const createApp = async (
  currentUser: User,
  appData: FormikValues,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
): Promise<string> => {
  if (!currentUser) {
    setErrorMessage("Must be logged in.");
    return;
  }
  const {
    name,
    description,
    categories,
    screenshots,
    icon,
    testflightIos,
    testflightIpados,
  } = appData;
  // set up Platforms array
  let platforms: PlatformID[] = [];
  if (!!testflightIos) platforms.push("ios");
  if (!!testflightIpados) platforms.push("ipados");

  // set up appId for uploading screenshots later
  let appId: string;

  const postAppData = {
    devId: currentUser._id,
    devName: currentUser.name,
    devWebsite: currentUser.website,
    name,
    description,
    platforms,
    categories: categories.map((cat: Category) => cat.id),
    testflightIos,
    testflightIpados,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/createApp`,
      postAppData
    );
    appId = res.data.app._id;
    screenshots.map(async (screenshot: File, i: number) => {
      console.log(`Uploading screenshot: ${screenshot.name}`);
      await uploadFile(screenshot, (i + 1).toString(), setErrorMessage, appId);
    });
    await uploadFile(icon[0], "icon", setErrorMessage, appId);
  } catch (err) {
    setErrorMessage(err.response.data.err);
  }

  return appId;
};

export default createApp;
