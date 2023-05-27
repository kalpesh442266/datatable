import React from "react";
//mui
import { Box, Button, Container, Typography, styled } from "@mui/material";
import Image404 from "../assets/404.png";
import { Link } from "react-router-dom";
//-------------------------------------
const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
  justifyContent: "center",
  //alignItems: "center",
  margin: "auto",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));
//------------------------------------------

function Page404() {
  return (
    <RootStyle>
      <Container>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <Box>
            <img src={Image404} alt="logo" class="image404" />
          </Box>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>
          <Button
            component={Link}
            to="/"
            size="large"
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}

export default Page404;
