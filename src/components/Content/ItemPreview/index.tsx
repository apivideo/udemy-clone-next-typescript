import Video from '@api.video/nodejs-client/lib/model/Video';
import React, { useEffect, useState } from 'react';
import {
  Container,
  ThumbnailContainer,
  PlayIcon,
  TitleContainer,
  Title,
  StyledProgress,
  StyledIndicator
} from './style';
import { BiPlay } from 'react-icons/bi';
import Link from 'next/link';
import { useAuthContext } from '@components/Providers/Auth';
import { getVideoLastPaused } from '@utils/functions';
interface ItemPreviewProps {
  video: Video;
}

const ItemPreview: React.FC<ItemPreviewProps> = ({ video }): JSX.Element => {
  const { state } = useAuthContext();
  const [videoDuration, setVideoDuration] = useState<number>(0)
  const [videoPaused, setVideoPaused] = useState<number>(0)

  useEffect(() => {
    getVideoProgress()
  }, [])

  const getVideoProgress = async () => {
    // 1. Get video duration
    const response = await fetch(`/api/status`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: state.apiKey,
        videoId: video.videoId,
      }),
    });
    const result = await response.json();
    setVideoDuration(result.metadata.duration)

    // 2. Get video analytics
    const analyticsResponse = await fetch(`/api/analytics`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: state.apiKey,
        videoId: video.videoId,
        metadata: { userName: state.userName },
      }),
    });
    const { data } = await analyticsResponse.json();
    if (data?.length) {
      const pauseSeconds = getVideoLastPaused(data);
      setVideoPaused(pauseSeconds)
    }
  }

  return (
    <>
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
            <StyledProgress value={videoPaused} max={videoDuration}>
              <StyledIndicator style={{ width: `${videoPaused}%` }} />
            </StyledProgress>
          </TitleContainer>
        </Container>
      </Link>
    </>

  );
};

export default ItemPreview;
