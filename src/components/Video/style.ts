import styled from 'styled-components';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const Container = styled.div`
  margin-bottom: 100px;
  display: flex;
  font-family: 'Roboto', sans-serif;
`;

export const TabsContainer = styled(TabsPrimitive.Root)`
  display: flex;
  flex-direction: column;
  justify-content: center;
    width: 80%;
    margin: 0 auto;
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
  background: #000;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotesContent = styled(TabsPrimitive.Content)`
  width: 80%;
  margin: 0 auto;
`;


export const SidebarContainer = styled.div`
height: 100vh;
width: 35%;
background: #f8f9fa;
font-size: 16px;
color: #1c1d1f;

`

export const VideoAndTabsContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`


export const SidebarTitle = styled.div`
font-weight: bold;
padding: 12px 16px;
border-bottom: 1px solid grey;
height: 54px;
display: flex;
align-items: center;
justify-content: space-between;
background: #fff;
`

export const IconBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
`;