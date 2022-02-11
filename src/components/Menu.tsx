import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { Favorite, LocalMovies } from "@mui/icons-material";
import { Container } from "@mui/material";

const StyledMenu = styled.div`
  z-index: 99;
  height: 74px;
  position: fixed;
  width: 100%;
  backdrop-filter: saturate(180%) blur(5px);
  transition: box-shadow 0.4s ease 0s;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 -1px 0 0 hsla(0, 0%, 100%, 0.1);

  .menu-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  h1 {
    font-weight: 800;
    font-size: 1.6rem;
    letter-spacing: -1px;
    color: white;
    
    svg {
      vertical-align: -3px;
      color: var(--primary-color);
    }
  }
  ul {
    list-style: none;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 280px;
    li {
      font-weight: 800;
      font-size: 0.9rem;

      a {
        color: white;
        border-bottom: 2px solid transparent;
        transition: ease-in-out 0.2s;

        &.active,
        &:hover {
          border-bottom: 2px solid var(--primary-color);
        }
        svg {
          font-size: 1rem;
          vertical-align: -2px;
        }
      }
    }
  }
`;

export default function Menu() {
  return (
    <StyledMenu>
      <Container maxWidth="lg">
        <div className="menu-container">
          <Link to="/">
            <h1><LocalMovies /> AlloCinoche</h1>
          </Link>
          <ul>
            <li>
              <Link
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/list"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                List
              </Link>
            </li>
            <li>
              <Link
                to="/favorite"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Favorite <Favorite />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </StyledMenu>
  );
}
