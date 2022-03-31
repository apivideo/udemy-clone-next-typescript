import styled from 'styled-components';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const Container = styled.div`
margin-bottom: 100px;
`

export const TabsContainer = styled(TabsPrimitive.Root)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
  width: 100%;
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

export const IconBtn = styled.button`
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

export const CreateNoteBtn = styled.button`
  width: 100%;
  cursor: pointer;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #6a6f73;
  border: 1px solid #1c1d1f;
  font-size: 16px;
  background: #fff;
  padding: 0 16px;
  &:hover {
    background: rgb(239, 239, 239);
  }
`;

export const TimestampBtn = styled.button`
  cursor: pointer;
  border: none;
  width: fit-content;
  background: black;
  color: white;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 10px;
`;

export const NotesContent = styled(TabsPrimitive.Content)`
  width: 800px;
  margin: 0 auto;
`;

export const NoteEditContainer = styled.div`
display: flex;
align-items: flex-start;
gap: 20px;
`

export const NoteEditor = styled.textarea`
min-height: 112px;
border: 1px solid black;
width: 100%;
padding: 20px;
font-family: 'Roboto', sans-serif;
font-size: 16px;
`

export const ButtonsContainer = styled.div`
display: flex;
gap: 10px;
align-items: center;
justify-content: flex-end;
`

export const CancelBtn = styled.button`
cursor: pointer;
font-size: 16px;
color: #1c1d1f;
background: transparent;
height: 34px;
border: none;
font-weight: bold;
`

export const SaveBtn = styled.button`
cursor: pointer;
font-size: 16px;
background: #1c1d1f;
color: #fff;
height: 34px;
padding: 0 16px;
border: none;
font-weight: bold;
`

export const EditorContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 40px;
`

export const NotesContainer = styled.div`
display: flex;
flex-direction: column;
margin-top: 30px;
gap: 30px;
`

export const NoteText = styled.div`
padding: 2.4rem;
background: #f7f9fa;
color: #1c1d1f;
font-size: 16px;
width: 100%;
`

export const NoteItem = styled.div`
display: flex;
gap: 15px;
align-items: flex-start;
`