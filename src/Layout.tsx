import { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Web3ReactProvider } from "@web3-react/core";
import Home from "./pages/home";
import Navbar from "./components/NavBar";
import Companies from "./pages/companies";

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-flow: wrap;
`;

const Marginer = styled.div`
  margin-top: 5rem;
`;

export default function Layout() {
  return (
    <Suspense fallback={null}>
      <AppWrapper>
        <HeaderWrapper>
          <Navbar />
        </HeaderWrapper>
        <BodyWrapper>
          <Web3ReactProvider getLibrary={(web3) => web3}>
            <Switch>
              <Route exact strict path="/" component={Home} />
              <Route exact strict path="/companies" component={Companies} />
              <Redirect to="/" />
            </Switch>
          </Web3ReactProvider>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  );
}
