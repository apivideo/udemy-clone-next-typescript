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
} from './style';
import LogoWhite from '@public/logo-white.svg';
import { ImKey } from 'react-icons/im';
import { FaUser } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

interface ApiKeyInputProps {
    apiKey: string;
    userName: string;
    handleApiKey: (e: React.ChangeEvent) => void;
    handleName: (e: React.ChangeEvent) => void;
    getVideos: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
    apiKey,
    userName,
    handleApiKey,
    handleName,
    getVideos,
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
                            onChange={(e) => handleApiKey(e)}
                            placeholder={'Enter your sandbox apikey'}
                        />
                    </InputContainer>

                    <InputContainer>
                        <FaUser color={'#fff'} size={'2rem'} />
                        <StyledInput
                            value={userName}
                            onChange={(e) => handleName(e)}
                            placeholder={'Enter your name'}
                        />
                    </InputContainer>
                    <Button onClick={getVideos}><IoSend />Submit</Button>
                </Col2>
            </Container>
        </Wrapper>
    );
};

export default ApiKeyInput;
