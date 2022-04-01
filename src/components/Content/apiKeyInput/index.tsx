import React from "react";
import {
    Container,
    Title,
    Subtitle,
    Wrapper,
    Button,
    InputApikey,
    Col1,
    Col2,
} from "./style";
import LogoWhite from "@public/logo-white.svg";

interface ApiKeyInputProps {
    apiKey: string
    handleApiKey: (e: React.ChangeEvent) => void
    getVideos: () => void
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, handleApiKey, getVideos }): JSX.Element => {
    return (
        <Wrapper>
            <Container>
                <Col1>
                    <Title>Quick integration</Title>
                    <Subtitle>Enter your Sandbox API Key to test</Subtitle>
                    <LogoWhite />
                </Col1>
                <Col2>
                    <InputApikey
                        value={apiKey}
                        onChange={(e) => handleApiKey(e)}
                        placeholder={"Enter your sandbox apikey"}
                    />
                    <Button onClick={getVideos}>Submit</Button>
                </Col2>
            </Container>
        </Wrapper>
    );
}

export default ApiKeyInput;