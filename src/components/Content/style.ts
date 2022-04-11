import styled from 'styled-components';

export const ContentContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  margin: 0 50px;
`;

export const BannerContainer = styled.div`
  position: relative;
  margin: 0 auto 40px auto;
    max-width: 1340px;
`;

export const StyledImg = styled.img`
  width: 100%;
`;

export const TextBox = styled.div`
  h1 {
    font-family: 'Times New Roman', Times, serif;
    margin: 0;
    font-size: 36px;
  }
  p {
    margin: 0;
    font-size: 16px;
  }
  background-color: white;
  padding: 24px;
  @media (min-width: 700px) {
    max-width: 400px;
    position: absolute;
    top: 24px;
    left: 44px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

export const SelectionContainer = styled.div`
  padding: 0px 20px;
  max-width: 1340px;
    margin: 0 auto;
`;

export const ItemsContainer = styled.div`
overflow: hidden;

  display: flex;
  flex-wrap: nowrap;
 
 
  padding-bottom: 40px;
`;

export const Inner = styled.div`
white-space: nowrap;
transition: transform 0.3s;
`

export const ContentTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 20px;
`;
