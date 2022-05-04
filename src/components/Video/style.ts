import styled from 'styled-components';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const Container = styled.div`
  display: flex;
  font-family: 'Roboto', sans-serif;
`;

export const TabsContainer = styled(TabsPrimitive.Root)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0 auto 50px auto;
`;

export const TabsList = styled(TabsPrimitive.List)`
  flex-shrink: 0;
  display: flex;
  border-bottom: 1px solid grey;
`;

export const TabsTrigger = styled(TabsPrimitive.Trigger)`
  all: unset;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
  padding: 10px 20px;
  height: 45;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15;
  line-height: 1;
  color: #6a6f73;
  user-select: none;
  font-size: 16px;
  width: fit-content;
  &:hover {
    color: black;
  }
  &[data-state='active'] {
    color: black;
    box-shadow: inset 0 -1px 0 0 black, 0 1px 0 0 black;
  }
  &:focus {
    position: relative;
    color: black;
    font-weight: bold;
    box-shadow: 0 2px black;
  }
`;

export const TabsContent = styled(TabsPrimitive.Content)`
  flex-grow: 1;
  padding: 20px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: 'white';
  border-bottom-left-radius: 6;
  border-bottom-right-radius: 6;
  outline: 'none';
  color: #1c1d1f;
`;

export const OverviewTitle = styled.div`
  font-size: 25px;
  font-weight: 700;
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 8px;
`;

export const ActionBtn = styled.button`
  cursor: pointer;
  border: none;
  height: 40px;
  width: 40px;
  background: #fff;
  color: #000;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #000;
    color: #fff;
  }
`;

export const NotesContent = styled(TabsPrimitive.Content)`
  width: 80%;
  margin: 0 auto;
`;

export const TranscriptContainer = styled.div`
  display: none;
  @media (min-width: 980px) {
    display: block;
    height: 100vh;
    width: 35%;
    background: #f8f9fa;
    font-size: 16px;
    color: #1c1d1f;
  }
`;

export const MobileTranscriptContainer = styled.div`
  width: 100%;
  background: #f8f9fa;
  font-size: 16px;
  color: #1c1d1f;
  @media (min-width: 980px) {
    display: none;
  }
`;

export const VideoAndTabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TranscriptTitle = styled.div`
  font-weight: bold;
  padding: 12px 16px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  @media (min-width: 980px) {
    box-shadow: none;
    border-bottom: 1px solid grey;
  }
`;

export const IconBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
`;

export const OverviewContent = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;

export const TranscriptContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const OverviewSummary = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TopicsOverview = styled.div`
  margin-top: 20px;
`;

export const TopicsContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: grey;
  padding-top: 10px;
  gap: 5px;
  flex-wrap: wrap;
  span {
    &:not(:last-child):after {
      content: ' • ';
    }
  }
`;
