import React from "react";
import styled from "styled-components";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import Layout from "@components/Layout";
import notFound from "@assets/images/404.jpeg";
import routes from "@routes";

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
            <Link to={routes.HOME}>
              <Button variant="contained">Please god, take me back</Button>
            </Link>
          </Grid>
        </Grid>
      </StyledNotFound>
    </Layout>
  );
}
