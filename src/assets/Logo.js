import { Link, Typography, useTheme } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "../router/paths";
import LogoImg from "./logo.png";

function Logo() {
  const theme = useTheme();

  return (
    <Link
      component={RouterLink}
      variant="subtitle2"
      to={PATH_DASHBOARD.dashboard.root}
      sx={{ display: "flex", flexDirection: "row", textDecoration: "none" }}
    >
      <img
        src={LogoImg}
        alt="logo"
        class="logoImage"
        style={{
          height: "30px",
        }}
      />
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          ml: 0.4,
          color: "theme.primary",
        }}
      >
        i - Pangram
      </Typography>
    </Link>
  );
}

export default Logo;
