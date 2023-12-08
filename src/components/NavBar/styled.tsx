import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
// import { darken, lighten } from 'polished';

// import { Box } from 'nft/components/Box';

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  background: rgba(42, 42, 43, 0.61);
`;

export const LogoContainer = styled.div`
  display: flex;
  margin-right: 12px;
  align-items: center;

  img {
    cursor: pointer;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex: 0.7;
  align-items: center;
  justify-content: space-around;
  margin: 0px 12px;
`;

const baseLinkCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 0px 12px;
  padding: 12px 0px;
  width: fit-content;
  position: relative;
  text-align: center;
  text-decoration: none;
  line-height: 22px;
  font-weight: 750;
  text-transform: uppercase;
`;

const BaseMenuItem = styled(NavLink)`
  ${baseLinkCss};
  color: "#FFF";
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  background: rgba(0, 0, 0, 0.17);
  margin-left: auto;
  backdrop-filter: blur(20px);
`;

export const MenuItem = styled(BaseMenuItem)``;

export const ActiveMenuItem = styled(BaseMenuItem)`
  padding: 0px 24px;
  height: 100%;
  background: linear-gradient(180deg, #757070 0%, rgba(112, 112, 112, 0) 100%);
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0.8)
      ),
      linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%);
    box-shadow: rgba(49, 255, 156, 0.5) 0px 0px 18.9113px,
      rgba(49, 255, 156, 0.5) 0px 0px 73.2115px,
      rgba(49, 255, 156, 0.5) 0px 0px 7.32115px inset;
  }
`;

export const ExternalMenuItem = styled.a`
  ${baseLinkCss};
`;
