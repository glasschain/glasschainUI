import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const PuppiesButton = styled.button`
  border-radius: 50px;
  background: #e19143;
  border: none;
  padding: 12px 54px;
  color: #fff;
  font-family: sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin: auto;
`;

const PuppiesWrapper = styled.div`
  padding-top: 164px;
  display: flex;
`;
export default function Home() {
  const history = useHistory();

  const handleGetPuppies = useCallback(() => {
    history.push("/mint");
  }, [history]);
  return <Wrapper></Wrapper>;
}
