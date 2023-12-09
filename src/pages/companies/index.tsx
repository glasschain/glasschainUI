import styled from "styled-components";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import AddReview from "../../components/AddReview";
import { useEffect } from "react";
import { useWeb3Context } from "../../contexts/web3Context";
import fetchAllCompanies from "../../hooks/interact/fetchAllCompanies";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const CompaniesCard = styled.div`
  display: flex;
  margin: 24px;
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

const CompaniesWrapper = styled.div`
  width: 50%;
`;

const AddReviewWrapper = styled.div`
  display: flex;
  align-items: start;
  border: 1px solid grey;
  background: teal;
  width: 36%;
  justify-content: center;
  margin-left: auto;
  margin-right: 24px;
  margin-top: 24px;
  border-radius: 12px;
  .ant-form {
    margin-top: 56px;
  }
  height: 400px;
  .ant-btn-primary {
    background: black;
  }
`;

export default function Companies(props) {
  return (
    <Wrapper>
      <CompaniesWrapper>
        {props.list.map((company) => {
          return (
            <CompaniesCard>
              <CompanyName>{company.companyName}</CompanyName>
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
      </CompaniesWrapper>

      <AddReviewWrapper>
        <AddReview />
      </AddReviewWrapper>
    </Wrapper>
  );
}
