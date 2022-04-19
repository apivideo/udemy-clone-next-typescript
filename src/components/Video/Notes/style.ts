import styled from 'styled-components';

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

export const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 30px;
`;

export const NoteTextDisplay = styled.div`
  padding: 2.4rem;
  background: #f7f9fa;
  color: #1c1d1f;
  font-size: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NoteItem = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
`;

export const NoteActions = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 10px;
`;
