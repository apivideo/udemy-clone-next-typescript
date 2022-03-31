import Video from '@api.video/nodejs-client/lib/model/Video';
import React from 'react';
import ItemPreview from './ItemPreview';
import {
    ContentContainer,
    BannerContainer,
    TextBox,
    SelectionContainer,
    ItemsContainer,
    ContentTitle
} from './style';

interface ContentProps {
    videos?: Array<Video>;
}

const Content: React.FC<ContentProps> = ({ videos }): JSX.Element => {
    return (
        <div>
            <ContentContainer>
                <BannerContainer>
                    <img src={'/udemy-banner.jpeg'} alt={'banner'} />
                    <TextBox>
                        <h1>Get there. From here.</h1>
                        <p>
                            Chart your path to success. Log in for limited-time savings on the
                            latest topics.
          </p>
                    </TextBox>
                </BannerContainer>
            </ContentContainer>
            <SelectionContainer>
                <ContentTitle>Let's start learning, Aya</ContentTitle>

                <ItemsContainer>
                    {videos.length
                        ? videos.map((video, i) => {
                            return <ItemPreview key={video.videoId} video={video} />;
                        })
                        : null}
                </ItemsContainer>
            </SelectionContainer>
        </div>
    );
};

export default Content;
