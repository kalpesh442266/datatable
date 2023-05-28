import React from "react";
import Lottie from "lottie-react";
import { spinner } from "./spinner";

function Loader({ style }) {
  return <Lottie animationData={spinner} loop={true} style={style} />;
}

export default Loader;
