import styled from 'styled-components';

export const ContentContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  margin: 0 50px 0 50px;
`;

export const BannerContainer = styled.div`
  position: relative;
  max-width: 1340px;
  margin: 0 auto 40px auto;
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
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  position: absolute;
  top: 24px;
  left: 44px;
  padding: 24px;
  max-width: 400px;
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
