import styled from "styled-components/macro";

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${({ direction }) => direction};
  width: 100%;
  margin: auto;
  max-width: 1100px;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const Container = styled.div``;
export const Item = styled.div`
  border-bottom: 1px solid #222;
  color: white;
  padding: 50px 5%;
  overflow: hidden;

  @media (max-width: 400px) {
    padding: 30px 5px;
  }
`;
export const Pane = styled.div`
  width: 50%;
`;
export const Title = styled.h1`
  font-size: 50px;
  line-height: 1.1;
  margin-bottom: 8px;

  @media (max-width: 400px) {
    font-size: 35px;
  }
`;
export const SubTitle = styled.h2`
  font-size: 26px;
  line-height: normal;
  font-weight: normal;

  @media (max-width: 400px) {
    font-size: 18px;
  }
`;
export const Image = styled.img`
  max-width: 100%;
`;
