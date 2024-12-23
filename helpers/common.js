import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage) => {
  const width = deviceWidth;
  return (width * percentage) / 100;
};
export const hp = (percentage) => {
  const height = deviceHeight;
  return (height * percentage) / 100;
};
