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
  flex-flow: wrap;
`;

const Marginer = styled.div`
  margin-top: 5rem;
`;

const companiesList = [
  {
    id: "1",
    name: "Heroku",
    ratings: "4",
  },
  {
    id: "2",
    name: "Deloitte",
    ratings: "2",
  },
  {
    id: "3",
    name: "TCS",
    ratings: "5",
  },
  {
    id: "4",
    name: "IBM",
    ratings: "4",
  },
];

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
      const fetchCompRate = async (compDomain : string) => {
        const res = await fetchCompanyRatings(signer, compDomain);
        return res;
      }
      fecthData().then((res) => {
        const objKeys = Object.keys(res); // array of strings
        const objValues = Object.values(res); // array of 3 arrays

        // Transpose the matrix to group data by attribute
        const transposedData = objValues[0].map((_, colIndex) =>
          objValues.map((row) => row[colIndex])
        );

        // Create the result array in the desired format
        const resultArray = transposedData.map((attributeValues) => {
          const resultObject = {};
          objKeys.forEach((attribute, index) => {
            resultObject[attribute] = attributeValues[index];
          });

          const domain = resultObject['companyDomain']
          fetchCompRate(domain).then ((res) => {
            const ratings = res.companyRating;
            const count = ratings.reduce((acc, curr) => acc + curr, 0);
            const weightedSum = ratings.reduce((acc, curr, index) => acc + curr*(index + 1) , 0)
            resultObject['ratings'] = count === 0 ? 0 : weightedSum / count;
          })
          return resultObject;
        });

        console.log("resultArray", resultArray);
        const filteredList = searchTerm
          ? resultArray.filter(
              (item) =>
                searchTerm &&
                item.companyName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
          : resultArray;
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
        <AnonAadharWrapper>
          <LogInWithAnonAadhaar />
          {/* <div>{anonAadhaar?.status}</div> */}
        </AnonAadharWrapper>

        <SearchWrapper>
          <Search
            placeholder="Enter to search"
            enterButton
            onSearch={onSearch}
            value={searchTerm}
            onChange={onInputChange}
          />
        </SearchWrapper>
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
              <Redirect to="/" />
            </Switch>
          </Web3ReactProvider>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  );
}
