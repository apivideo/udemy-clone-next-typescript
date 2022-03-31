import React from 'react';
import { Container, StyledInput } from './style';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar: React.FC = (): JSX.Element => {
  return (
    <Container>
      <AiOutlineSearch size={'1.3em'} color={'#1c1d1f'} />
      <StyledInput placeholder={'Search for anything'} />
    </Container>
  );
};

export default SearchBar;
