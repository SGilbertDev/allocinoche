import React from "react";
import { LocalMovies } from "@mui/icons-material";
import styled from "styled-components";
import { Backdrop } from "@mui/material";

const StyledBackdropLoader = styled.div`
  svg {
    color: var(--primary-color);
    font-size: 3rem;
    animation: rotate 3s infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function BackdropLoader() {
  return (
    <Backdrop open>
      <StyledBackdropLoader>
        <LocalMovies />
      </StyledBackdropLoader>
    </Backdrop>
  );
}
