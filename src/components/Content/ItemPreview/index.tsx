import Video from '@api.video/nodejs-client/lib/model/Video';
import React from 'react';
import {
  Container,
  ThumbnailContainer,
  PlayIcon,
  TitleContainer,
  Title
} from './style';
import { BiPlay } from 'react-icons/bi';
import Link from 'next/link';

interface ItemPreviewProps {
  video: Video;
}

const ItemPreview: React.FC<ItemPreviewProps> = ({ video }): JSX.Element => {
  return (
    <Link href={`/video/${video.videoId}`}>
      <Container>
        <ThumbnailContainer>
          <img src={video?.assets?.thumbnail} alt={'thumbnail'} />
          <PlayIcon>
            <BiPlay color={'#000000'} size={'4rem'} />
          </PlayIcon>
        </ThumbnailContainer>
        <TitleContainer>
          <Title>
            {video.title}
          </Title>
        </TitleContainer>
      </Container>
    </Link>
  );
};

export default ItemPreview;
