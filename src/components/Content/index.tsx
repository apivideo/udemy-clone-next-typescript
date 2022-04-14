import Video from '@api.video/nodejs-client/lib/model/Video';
import React from 'react';
import ItemPreview from './ItemPreview';
import {
    ContentContainer,
    BannerContainer,
    TextBox,
    SelectionContainer,
    ItemsContainer,
    ContentTitle,
    StyledImg,
} from './style';
interface ContentProps {
    videos?: Array<Video>;
}

const Content: React.FC<ContentProps> = ({ videos }): JSX.Element => {

    return (
        <div>
            <ContentContainer>
                <BannerContainer>
                    <StyledImg src={'/udemy-banner.jpeg'} alt={'banner'} />
                    <TextBox>
                        <h1>Learning that gets you</h1>
                        <p>
                            Skills for your present (and your future). Get started with us.
            </p>
                    </TextBox>
                </BannerContainer>
            </ContentContainer>
            <SelectionContainer>

                <ContentTitle>Let's start learning, Aya</ContentTitle>

                <ItemsContainer>

                            {videos.length
                                ? videos.map((video) => {
                                    return <ItemPreview key={video.videoId} video={video} />
                                })
                                : null}

                </ItemsContainer>
            </SelectionContainer>
        </div>
    );
};

export default Content;
