import React from "react";
import Menu from "@components/Menu";
import styled from "styled-components";
import BackdropLoader from "@components/commons/BackdropLoader";

const StyledLayout = styled.div<{ $isFullscreen?: boolean }>`
  padding-top: ${({ $isFullscreen }) => ($isFullscreen ? "" : "74px")};
  padding-bottom: 40px;
`;

interface Props {
  children: React.ReactNode;
  isFullscreen?: boolean;
  isLoading?: boolean;
}

export default function Layout({ children, isFullscreen, isLoading }: Props) {
  return (
    <>
      <Menu />
      <StyledLayout $isFullscreen={isFullscreen}>
        {isLoading ? <BackdropLoader /> : children}
      </StyledLayout>
    </>
  );
}
