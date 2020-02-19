import React from "react";
import { Link } from "@reach/router";
import { css } from "@emotion/core";
import colors from "./colors";

const NavBar = () => (
  <header
    css={css`
      background-color: ${colors.secondary};
      padding: 10px;

      &:hover {
        text-decoration: underline;
      }
    `}
  >
    <Link to="/">Adopt!</Link>
    <span
      css={css`
        font-size: 50px;
      `}
      role="img"
      aria-label="logo"
    >
      🐹
    </span>
  </header>
);

export default NavBar;
