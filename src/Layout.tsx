import { Suspense, useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Web3ReactProvider } from "@web3-react/core";
import Home from "./pages/home";
// import Navbar from "./components/NavBar";
import Companies from "./pages/companies";
import { Input } from "antd";

// import logo from "../../assets/logo 1.png";
import {
  ActiveMenuItem,
  LogoContainer,
  MenuContainer,
  MenuItem,
  Nav,
  SearchWrapper,
  StatusContainer,
  AnonAadharWrapper,
} from "../src/components/NavBar/styled";
import Web3Status from "../src/components/Web3Status/index";
import { SearchProps } from "antd/es/input/Search";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { useWeb3Context } from "./contexts/web3Context";
import fetchAllCompanies from "./hooks/interact/fetchAllCompanies";
import fetchCompanyRatings from "./hooks/interact/fetchCompanyRatings";
import CompanyPage from "./pages/companyPage";
import RegisterCompany from "./pages/RegisterCompany";

const { Search } = Input;

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
  // flex-flow: wrap;
`;

const Marginer = styled.div`
  margin-top: 5rem;
`;

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
    pathname.startsWith("/") &&
    !pathname.includes("companies") &&
    !pathname.includes("company");

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
      <MenuItemLink
        to="/company/details"
        isActive={pathname.startsWith("/company")}
      >
        <div>Overview</div>
      </MenuItemLink>
      <MenuItemLink to="/register" isActive={pathname.startsWith("/register")}>
        <div>Register</div>
      </MenuItemLink>
    </>
  );
};

export default function Layout() {
  const [anonAadhaar] = useAnonAadhaar();
  const [companiesList, setCompaniesList] = useState<Array<unknown>>([]);
  const [searchTerm, setSearchTerm] = useState<string>();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar);
  }, [anonAadhaar]);

  const { signer } = useWeb3Context();

  useEffect(() => {
    if (signer) {
      const fecthData = async () => {
        const res = await fetchAllCompanies(signer);
        return res;
      };
      const fetchCompRate = async (compDomain: string) => {
        const res = await fetchCompanyRatings(signer, compDomain);
        return res;
      };
      fecthData().then(async (res) => {
        const objKeys = Object.keys(res); // array of strings
        const objValues = Object.values(res); // array of 3 arrays

        // Transpose the matrix to group data by attribute
        const transposedData = objValues[0].map((_, colIndex) =>
          objValues.map((row) => row[colIndex])
        );

        // Create the result array in the desired format
        const resultArray = transposedData.map(async (attributeValues) => {
          const resultObject = {};
          objKeys.forEach((attribute, index) => {
            resultObject[attribute] = attributeValues[index];
          });

          const domain = resultObject["companyDomain"];
          const res1 = await fetchCompRate(domain);
          const ratings = res1.companyRating;
          const count = ratings.reduce((acc, curr) => acc + curr, 0);
          const weightedSum = ratings.reduce(
            (acc, curr, index) => acc + curr * (index + 1),
            0
          );
          resultObject["ratings"] = count === 0 ? 0 : weightedSum / count;
          return resultObject;
        });
        const res2 = await Promise.all(resultArray);

        console.log("resultArray", resultArray);
        const filteredList = searchTerm
          ? res2.filter((item) =>
              item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : res2;
        setCompaniesList(filteredList);
      });
    }
  }, [searchTerm, signer]);

  const Navbar = () => {
    // const history = useHistory();

    // const handleLogoIconClick = useCallback(() => {
    //   history.push("/");
    // }, [history]);

    const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
      console.log(info?.source, value);
      setSearchTerm(value);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    return (
      <Nav>
        <MenuContainer>
          <PageTabs />
        </MenuContainer>
        <AnonAadharWrapper>
          <LogInWithAnonAadhaar />
        </AnonAadharWrapper>

        {/* <SearchWrapper>
          <Search
            placeholder="0x44eb54695b4830e0fc02162b22cdee067bdd80b2search"
            enterButton
            onSearch={onSearch}
            value={searchTerm}
            onChange={onInputChange}
          />
        </SearchWrapper> */}
        <StatusContainer>
          <Web3Status />
        </StatusContainer>
      </Nav>
    );
  };
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
              <Route
                exact
                strict
                path="/companies"
                component={() => (
                  <Companies
                    list={companiesList}
                    searchTerm={searchTerm}
                  ></Companies>
                )}
              />
              <Route
                exact
                strict
                path="/company/details"
                component={CompanyPage}
              />
              <Route
                exact
                strict
                path="/register"
                component={() => (
                  <RegisterCompany signer={signer}></RegisterCompany>
                )}
              />
              <Redirect to="/" />
            </Switch>
          </Web3ReactProvider>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  );
}
