import styled from "styled-components";
import { useWeb3Context } from "../../contexts/web3Context";
import fetchCompanyRatings from "../../hooks/interact/fetchCompanyRatings";
import fetchReview from "../../hooks/interact/fetchReview";
import { useEffect, useState } from "react";

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
  const { signer, companyDetails } = useWeb3Context();
  const [reviews, setReviews] = useState<
    { rating: number; comment: string; domain: string }[]
  >([]);
  const allReviews = async (domain) => {
    const rawReviews = await fetchCompanyRatings(signer, domain);
    const ratingHashes = rawReviews.ratingHashes;
    const rl: { rating: number; comment: string; domain: string }[] = [];
    ratingHashes.forEach(async (element) => {
      fetchReview(signer, element).then((res) => {
        rl.push(res);
      });
    });
    return rl;
  };
  useEffect(() => {
    const fecthData = async () => {
      const res = await allReviews(companyDetails?.companyDomain);
      return res;
    };
    fecthData().then((res) => {
      console.log("arrrrrayyyyy", res);
      setReviews(res);
    });
  }, [companyDetails?.companyDomain]);
  return (
    <Wrapper>
      <CompanyDetailsCard>
        <CompanyDetails>
          <CompanyName>{companyDetails?.companyName}</CompanyName>
          <CompanyDesc>
            What does it do: {companyDetails?.companyDesc}
          </CompanyDesc>
          <Ratings>Overall Ratings: {companyDetails?.ratings}</Ratings>
        </CompanyDetails>
        <CompanyReviews>
          <ReviewsText>Reviews</ReviewsText>
          {reviews.map((review) => {
            return <div>{review.comment}</div>;
          })}
        </CompanyReviews>
      </CompanyDetailsCard>
    </Wrapper>
  );
}
