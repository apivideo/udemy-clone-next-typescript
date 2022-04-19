import React from 'react';
import {
  Container,
  Title,
  Subtitle,
  Wrapper,
  Button,
  StyledInput,
  Col1,
  Col2,
  InputContainer,
  ButtonsContainer,
} from './style';
import LogoWhite from '@public/logo-white.svg';
import { ImKey } from 'react-icons/im';
import { FaUser } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import Loader from '@public/white-loader.svg';

interface ApiKeyInputProps {
  apiKey: string;
  userName: string;
  handleApiKey: (e: React.ChangeEvent) => void;
  handleName: (e: React.ChangeEvent) => void;
  getVideos: (apiKey: string, name: string) => void;
  loading: boolean;
  setLoading: (bool: boolean) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  apiKey,
  userName,
  handleApiKey,
  handleName,
  getVideos,
  loading,
  setLoading,
}): JSX.Element => {
  return (
    <Wrapper>
      <Container>
        <Col1>
          <Title>Quick integration</Title>
          <Subtitle>Enter your Sandbox API Key and name to test</Subtitle>
          <LogoWhite />
        </Col1>

        <Col2>
          <InputContainer>
            <ImKey color={'#fff'} size={'2rem'} />
            <StyledInput
              value={apiKey}
              onChange={handleApiKey}
              placeholder={'Enter your sandbox apikey'}
            />
          </InputContainer>

          <InputContainer>
            <FaUser color={'#fff'} size={'2rem'} />
            <StyledInput
              value={userName}
              onChange={handleName}
              placeholder={'Enter your name'}
            />
          </InputContainer>
          <ButtonsContainer>
            <Button
              onClick={() => {
                setLoading(true);
                getVideos(apiKey, userName);
              }}
            >
              {loading ? <Loader /> : <IoSend />}
              Submit
            </Button>
          </ButtonsContainer>
        </Col2>
      </Container>
    </Wrapper>
  );
};

export default ApiKeyInput;
