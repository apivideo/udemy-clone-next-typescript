import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #d1d7dc;
  height: 150px;
  width: auto;
  display: flex;
  cursor: pointer;
  &:hover {
    background: #f6f9fa;
  }
`;

export const ThumbnailContainer = styled.div`
  width: 30%;
  height: 150px;
  position: relative;
  background: black;
  overflow: hidden;
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
`;

export const TitleContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
