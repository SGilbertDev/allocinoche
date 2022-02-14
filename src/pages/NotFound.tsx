import React from "react";
import styled from "styled-components";
import { Button, Grid, Link } from "@mui/material";

import Layout from "@components/Layout";
import notFound from "@assets/images/404.jpeg";

const StyledNotFound = styled.div`
  padding-top: 150px;
  text-align: center;
  img {
    max-width: 400px;
    display: block;
  }
  button {
    margin-top: 40px;
  }
`;

export default function NotFound() {
  return (
    <Layout isFullscreen>
      <StyledNotFound>
        <Grid container justifyContent="center">
          <Grid item>
            <p className="title">This page doesn't exist</p>
            <img src={notFound} alt="" />
            <Link href="/" underline="none">
              <Button variant="contained">Please god, take me back</Button>
            </Link>
          </Grid>
        </Grid>
      </StyledNotFound>
    </Layout>
  );
}
