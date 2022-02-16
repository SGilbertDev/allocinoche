import React, { useState } from "react";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import { NavLink as Link } from "react-router-dom";
import {
  Favorite,
  LocalMovies,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import {
  Container,
  Badge,
  BadgeProps,
  Box,
  SwipeableDrawer,
} from "@mui/material";
import { useRecoilState } from "recoil";

import favoritesAtom from "@recoil/favorites/atom";
import routes from "@routes";

const StyledBadge = materialStyled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    width: "16px",
    minWidth: "16px",
    height: "16px",
    fontSize: "12px",
  },
}));

const StyledMenu = styled.div`
  top: 0;
  z-index: 99;
  height: 74px;
  position: fixed;
  width: 100%;
  backdrop-filter: saturate(180%) blur(5px);
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

const StyledDrawer = styled(SwipeableDrawer)`
  .MuiDrawer-paper {
    min-width: 80%;
    background-image: none;
    backdrop-filter: saturate(180%) blur(5px);
    background-color: rgba(0, 0, 0, 0.85);
    box-shadow: inset 0 -1px 0 0 hsla(0, 0%, 100%, 0.1);
  }
  .close-menu-button {
    color: white;
    font-size: 1.8rem;
    position: absolute;
    top: 15px;
    right: 15px;
  }
  ul {
    list-style: none;
    padding: 30px 80px 0 40px;
    li {
      padding: 14px 0;
      font-size: 1.4rem;
      a {
        color: white;

        &.active {
          border-bottom: 2px solid var(--primary-color);
        }
      }
    }
  }
`;

const MenuItems = ({ favorites }: { favorites: number[] }) => {
  return (
    <ul>
      <li>
        <Link
          to={routes.HOME}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to={routes.LIST}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          List
        </Link>
      </li>
      <li>
        <Link
          to={routes.FAVORITE}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Favorite{" "}
          <StyledBadge badgeContent={favorites.length} color="primary">
            <Favorite />
          </StyledBadge>
        </Link>
      </li>
    </ul>
  );
};

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function Menu() {
  const [favorites] = useRecoilState(favoritesAtom);
  const [openedDrawer, setOpenedDrawer] = useState(false);

  return (
    <StyledMenu>
      <Container maxWidth="lg">
        <div className="menu-container">
          <Link to={routes.HOME}>
            <h1>
              <LocalMovies /> AlloCinoche
            </h1>
          </Link>
          <Box component="div" sx={{ display: { xs: "none", md: "block" } }}>
            <MenuItems favorites={favorites} />
          </Box>
          {/* Mobile menu */}
          <Box component="div" sx={{ display: { md: "none" } }}>
            <MenuIcon onClick={() => setOpenedDrawer(true)} />
            <StyledDrawer
              anchor="right"
              open={openedDrawer}
              onClose={() => setOpenedDrawer(false)}
              onOpen={() => setOpenedDrawer(true)}
              disableBackdropTransition={!iOS}
              disableDiscovery={iOS}
            >
              <Close
                className="close-menu-button"
                onClick={() => setOpenedDrawer(false)}
              />
              <MenuItems favorites={favorites} />
            </StyledDrawer>
          </Box>
        </div>
      </Container>
    </StyledMenu>
  );
}
