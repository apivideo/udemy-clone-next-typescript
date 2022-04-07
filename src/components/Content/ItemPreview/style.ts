import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #d1d7dc;
  height: 150px;
  width: 400px;
  display: flex;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  &:hover {
    background: #f6f9fa;
  }
`;

export const ThumbnailContainer = styled.div`
  width: 100px;
  height: 150px;
  position: relative;
  background: black;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
  }
`;

export const PlayIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 52px;
  left: calc(50% - 26px);
  svg{
    margin-left: 5px;
  }
`;

export const TitleContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  word-break: break-word;
  font-size: 16px;
  font-weight: bold;
`;
