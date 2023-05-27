import React from "react";
import spinner from "../assets/spinner.json";
import { useLottie } from "lottie-react";
import { Box, useTheme } from "@mui/material";

function Loader() {
  const options = {
    animationData: spinner,
    loop: true,
  };

  const { View } = useLottie(options);
  const theme = useTheme();
  return (
    <Box
      sx={{
        right: 0,
        bottom: 0,
        zIndex: 99999,
        width: "100%",
        height: "100%",
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {View}
    </Box>
  );
}

export default Loader;
