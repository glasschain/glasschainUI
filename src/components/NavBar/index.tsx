import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";

// import logo from "../../assets/logo 1.png";
// import Web3Status from "../Web3Status";
import {
  ActiveMenuItem,
  LogoContainer,
  MenuContainer,
  MenuItem,
  Nav,
  StatusContainer,
} from "./styled";
import Web3Status from "../Web3Status";

const MenuItemLink = ({
  to,
  isActive,
  children,
}: {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}) => {
  const Component = isActive ? ActiveMenuItem : MenuItem;
  return (
    <Component to={to} style={{ textDecoration: "none", color: "#FFF" }}>
      {children}
    </Component>
  );
};

export const PageTabs = () => {
  const { pathname } = useLocation();

  const isHomeActive =
    pathname.startsWith("/") && !pathname.includes("companies");

  return (
    <>
      <MenuItemLink to="/home" isActive={isHomeActive}>
        <div>Home</div>
      </MenuItemLink>
      <MenuItemLink
        to="/companies"
        isActive={pathname.startsWith("/companies")}
      >
        <div>Companies</div>
      </MenuItemLink>
      {/* <MenuItemLink to="/breeding" isActive={pathname.startsWith("/breeding")}>
        <div>Breed</div>
      </MenuItemLink>
      <MenuItemLink
        to="/dailyQuests"
        isActive={pathname.startsWith("/dailyQuests")}
      >
        <div>Daily Quests</div>
      </MenuItemLink>
      <MenuItemLink
        to="/lastRites"
        isActive={pathname.startsWith("/lastRites")}
      >
        <div>Funeral Opportunity</div>
      </MenuItemLink> */}
    </>
  );
};

const Navbar = () => {
  const history = useHistory();

  const handleLogoIconClick = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <Nav>
      {/* <LogoContainer>
        <img
          height={"90px"}
          width={"90px"}
          src={logo}
          alt="logo"
          onClick={handleLogoIconClick}
          className={"desktop"}
        />
      </LogoContainer> */}

      <MenuContainer>
        <PageTabs />
      </MenuContainer>

      <StatusContainer>
        <Web3Status />
      </StatusContainer>
    </Nav>
  );
};

export default Navbar;
