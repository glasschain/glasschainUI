import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const CompanyDetails = styled.div`
  width: 50%;
  border-right: 1px solid teal;
`;

const CompanyDetailsCard = styled.div`
  position: relative;
  background: linear-gradient(71deg, #080509, #1a171c, #080509);
  background-clip: padding-box;
  border-radius: 45px;
  padding: 40px;
  display: flex;
  border: 1px solid teal;
  width: 50%;
  height: 50vh;
  margin: auto;
  box-shadow: 10px 10px teal;
  color: white;
`;

const CompanyName = styled.div`
  font-size: 36px;
  border-bottom: 1px solid teal;
`;
const CompanyDesc = styled.div`
  margin-top: 12px;
  font-size: 18px;
`;

const CompanyReviews = styled.div`
  margin-left: 24px;
`;

const ReviewsText = styled.div`
  font-size: 20px;
  margin-bottom: 24px;
  margin-top: 24px;
`;

const Review = styled.div`
  margin-bottom: 12px;
`;

const Ratings = styled.div``;
export default function CompanyPage() {
  return (
    <Wrapper>
      <CompanyDetailsCard>
        <CompanyDetails>
          <CompanyName>IBM</CompanyName>
          <CompanyDesc>What does it do: bjcnkv nkd</CompanyDesc>
          <Ratings>Ratings: 2.5</Ratings>
        </CompanyDetails>
        <CompanyReviews>
          <ReviewsText>Reviews</ReviewsText>
          <Review>hcbdvjhbn</Review>
          <Review>hdbjbnjnjn</Review>
        </CompanyReviews>
      </CompanyDetailsCard>
    </Wrapper>
  );
}
