import styled from 'styled-components';

export const ContentContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  @media (min-width: 980px) {
    margin: 0 50px 0 50px;
  }
`;

export const BannerContainer = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

export const StyledImg = styled.img`
  width: -webkit-fill-available;
`;

export const TextBox = styled.div`
  h1 {
    font-family: 'Times New Roman', Times, serif;
    margin: 0;
  }
  p {
    margin: 0;
  }
  background-color: white;
  padding: 24px;
  @media (min-width: 700px) {
    max-width: 400px;
    position: absolute;
    top: 24px;
    left: 44px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  }
`;

export const SelectionContainer = styled.div`
  padding: 0 80px;
  width: 100%;
`;

export const ItemsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const ContentTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 20px;
`;
