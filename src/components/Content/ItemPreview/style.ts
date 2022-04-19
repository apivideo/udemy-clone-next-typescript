import styled from 'styled-components';
import * as ProgressPrimitive from '@radix-ui/react-progress';

export const Container = styled.div`
  border: 1px solid #d1d7dc;
  height: 150px;
  width: 400px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  display: flex;
  margin: 0 5px;
  &:hover {
    background: #f6f9fa;
  }
`;

export const ThumbnailContainer = styled.div`
  width: 120px;
  height: 150px;
  position: relative;
  background: #000;
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
  svg {
    margin-left: 5px;
  }
`;

export const TitleContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
`;

export const Title = styled.span`
  padding: 20px;
  font-size: 16px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledProgress = styled(ProgressPrimitive.Root)`
  position: relative;
  overflow: hidden;
  background: #d1d7dc;
  width: 100%;
  height: 12px;
`;

export const StyledIndicator = styled(ProgressPrimitive.Indicator)`
  background-color: #5624d0;
  height: 100%;
  transition: width 660ms cubic-bezier(0.65, 0, 0.35, 1);
`;
