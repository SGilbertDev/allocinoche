import React from "react";
import Menu from "@components/Menu";
import styled, { createGlobalStyle } from "styled-components";

const StyledLayout = styled.div<{ $isFullscreen?: boolean }>`
  padding-top: ${({ $isFullscreen }) => ($isFullscreen ? "" : "74px")};
`;

// Force the app to not overflowing when isFullscreen
const AppGlobalStyle = createGlobalStyle`
  .App {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
`;

interface Props {
  children: React.ReactNode;
  isFullscreen?: boolean;
}

export default function Layout({ children, isFullscreen }: Props) {
  return (
    <>
      {isFullscreen && <AppGlobalStyle />}
      <Menu />
      <StyledLayout $isFullscreen={isFullscreen}>{children}</StyledLayout>
    </>
  );
}
