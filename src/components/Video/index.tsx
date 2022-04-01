import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@components/Navbar';
import Video from '@api.video/nodejs-client/lib/model/Video';
import {
  Container,
  TabsContainer,
  TabsList,
  TabsTrigger,
  TabsContent,
  OverviewTitle,
  ActionsContainer,
  IconBtn,
  NotesContent,
} from './style';
import { PlayerSdk } from '@api.video/player-sdk';
import { getSecondsToHours, getMinutesFormat } from '@utils/functions';
import { MdEditNote } from 'react-icons/md';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import Notes from './Notes';

interface VideoPageProps {}

const tabNames = {
  OVERVIEW: 'Overview',
  NOTES: 'Notes',
};

export interface Timestamp {
  minutesFormat: string;
  seconds: number;
}

const VideoPage: React.FC<VideoPageProps> = ({}): JSX.Element => {
  const router = useRouter();
  const videoId = router?.query?.videoId;
  const [video, setVideo] = useState<Video>(null);
  const [playerSdk, setPlayerSdk] = useState<PlayerSdk>(undefined);
  const [videoDuration, setVideoDuration] = useState<string>(undefined);
  const [currTab, setCurrTab] = useState<string>(tabNames.OVERVIEW);
  const [currTimestamp, setCurrTimestamp] = useState<Timestamp>({
    minutesFormat: '00:00',
    seconds: 0,
  });

  const getVideoId = async () => {
    const response = await fetch(`/api/video`, {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: process.env.API_KEY, videoId }),
    });
    const data = await response.json();
    setVideo(data);
  };

  useEffect(() => {
    if (videoId) {
      getVideoId();
    }
  }, [videoId]);

  useEffect(() => {
    if (video) {
      videoSdk();
    }
  }, [video]);

  const videoSdk = async () => {
    try {
      const player = new PlayerSdk(document.getElementById('myVideo'), {
        id: video.videoId,
        hideTitle: true,
      });
      setPlayerSdk(player);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (playerSdk) {
      // In this EventListener we can activate our player SDK methods when the player is ready to use
      playerSdk.addEventListener('ready', () => {
        getDuration();
        playerSdk.hideControls(['more']);
      });

      // Listen to the player's timestamp for notes
      playerSdk.addEventListener('timeupdate', ({ currentTime }) => {
        setCurrTimestamp({
          minutesFormat: getMinutesFormat(currentTime),
          seconds: currentTime,
        });
      });
    }
  }, [playerSdk]);

  const getDuration = async () => {
    const duration = await playerSdk.getDuration();
    setVideoDuration(getSecondsToHours(duration));
  };

  return (
    <>
      {video && (
        <>
          <Navbar videoMode video={video} />
          <Container>
            <iframe
              width="100%"
              id={'myVideo'}
              height="600px"
              allowFullScreen
              style={{ border: 0 }}
            ></iframe>
            <ActionsContainer>
              <IconBtn onClick={() => setCurrTab(tabNames.NOTES)}>
                <MdEditNote size={'1.4rem'} />
              </IconBtn>
              <IconBtn>
                <BsFillFileEarmarkTextFill size={'1.4rem'} />
              </IconBtn>
            </ActionsContainer>
            <TabsContainer
              defaultValue={tabNames.OVERVIEW}
              onValueChange={(e) => setCurrTab(e)}
              value={currTab}
            >
              <TabsList aria-label="Manage your account">
                <TabsTrigger value={tabNames.OVERVIEW}>
                  {tabNames.OVERVIEW}
                </TabsTrigger>
                <TabsTrigger value={tabNames.NOTES}>
                  {tabNames.NOTES}
                </TabsTrigger>
              </TabsList>
              <TabsContent value={tabNames.OVERVIEW}>
                <OverviewTitle>About this course</OverviewTitle>
                {`Duration: ${videoDuration && videoDuration} hours`}
              </TabsContent>
              <NotesContent value={tabNames.NOTES}>
                <Notes playerSdk={playerSdk} currTimestamp={currTimestamp} />
              </NotesContent>
            </TabsContainer>
          </Container>
        </>
      )}
    </>
  );
};

export default VideoPage;
