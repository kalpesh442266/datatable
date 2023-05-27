import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { randomNumber } from "../Constants";

function RandomAvatar({ gender, height, width, sx }) {
  const imagePath = useMemo(() => {
    return gender && require(`../assets/${gender}_${randomNumber(5)}.png`);
  }, [gender]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${imagePath})`,
        height: height || 150,
        width: width || 120,
        borderRadius: "15px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 100,
        ...sx,
      }}
    ></Box>
  );
}

export default RandomAvatar;
