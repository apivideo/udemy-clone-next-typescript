import styled from 'styled-components'

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

export const NoteEditContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

export const NoteEditor = styled.textarea`
  min-height: 112px;
  border: 1px solid black;
  width: 100%;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
`;

export const CancelBtn = styled.button`
  cursor: pointer;
  font-size: 16px;
  color: #1c1d1f;
  background: transparent;
  height: 34px;
  border: none;
  font-weight: bold;
`;

export const SaveBtn = styled.button`
  cursor: pointer;
  font-size: 16px;
  background: #1c1d1f;
  color: #fff;
  height: 34px;
  padding: 0 16px;
  border: none;
  font-weight: bold;
`;

export const EditorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;