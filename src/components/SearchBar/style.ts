import styled from 'styled-components';

export const Container = styled.div`
  height: 46px;
  border: 1px solid black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 30px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  max-width: 600px;
`;

export const StyledInput = styled.input.attrs({
    type: 'text',
})`
  border: none;
  outline: none;
`;
