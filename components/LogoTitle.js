import React from "react";
import { Image } from "react-native";

const LogoTitle = () => {
  return (
    <Image
      source={require("../assets/logo.png")}
      style={{ width: 130, height: 100, resizeMode: "contain" }}
    />
  );
};

export default LogoTitle;
