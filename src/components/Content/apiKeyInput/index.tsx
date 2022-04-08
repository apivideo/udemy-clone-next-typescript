import React from "react";
import {
    Container,
    Title,
    Subtitle,
    Wrapper,
    Button,
    StyledInput,
    Col1,
    Col2,
} from "./style";
import LogoWhite from "@public/logo-white.svg";

interface ApiKeyInputProps {
    apiKey: string
    userName: string
    handleApiKey: (e: React.ChangeEvent) => void
    handleName: (e: React.ChangeEvent) => void
    getVideos: () => void
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, userName, handleApiKey, handleName, getVideos }): JSX.Element => {
    return (
        <Wrapper>
            <Container>
                <Col1>
                    <Title>Quick integration</Title>
                    <Subtitle>Enter your Sandbox API Key to test</Subtitle>
                    <LogoWhite />
                </Col1>

                <Col2>
                    <StyledInput
                        value={apiKey}
                        onChange={(e) => handleApiKey(e)}
                        placeholder={"Enter your sandbox apikey"}
                    />
                    <StyledInput
                        value={userName}
                        onChange={(e) => handleName(e)}
                        placeholder={"Enter your name"}
                    />
                    <Button onClick={getVideos}>Submit</Button>
                </Col2>
            </Container>
        </Wrapper>
    );
}

export default ApiKeyInput;