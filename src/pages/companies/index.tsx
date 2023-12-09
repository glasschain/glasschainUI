import styled from "styled-components";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const CompaniesCard = styled.div`
  display: flex;
  margin: 24px;
  width: 50%;
  background-color: var(--gd-theme-color-white, white);
  border-radius: 3px;
  box-shadow: 0 0 2px 0 #c4c7cc;
  padding: 24px !important;
  cursor: pointer;
  &:hover {
    border: 2px solid teal;
  }
`;

const CompanyName = styled.div`
  color: black;
`;

const RatingsText = styled.div`
  color: black;
`;

const RatingsWrapper = styled.div`
  display: flex;
  margin-left: auto;
  .anticon {
    color: black;
    margin-right: 2px;
  }
`;

const Ratings = styled.div`
  color: green;
  margin-left: 12px;
`;

export default function Companies(props) {
  return (
    <Wrapper>
      {props.list.map((company) => {
        return (
          <CompaniesCard>
            <CompanyName>{company.name}</CompanyName>
            <RatingsWrapper>
              {/* <RatingsText>Ratings:</RatingsText> */}
              {Array.from({ length: 5 }).map((_, idx) =>
                idx < +company.ratings ? <StarFilled /> : <StarOutlined />
              )}
              <Ratings>{company.ratings}</Ratings>
            </RatingsWrapper>
          </CompaniesCard>
        );
      })}
    </Wrapper>
  );
}
