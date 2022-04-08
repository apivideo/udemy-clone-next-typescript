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
  ActionBtn,
  NotesContent,
  SidebarContainer,
  SidebarTitle,
  IconBtn,
  VideoAndTabsContainer
} from './style';
import { PlayerSdk } from '@api.video/player-sdk';
import { getSecondsToHours, getMinutesFormat } from '@utils/functions';
import { MdEditNote } from 'react-icons/md';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';
import Notes from './Notes';
import { useAuthContext } from '@components/Providers/Auth';

interface VideoPageProps { }

const tabNames = {
  OVERVIEW: 'Overview',
  NOTES: 'Notes',
};

export interface Timestamp {
  minutesFormat: string;
  seconds: number;
}

const VideoPage: React.FC<VideoPageProps> = ({ }): JSX.Element => {
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
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string>('')
  const { state } = useAuthContext()

  useEffect(() => {
    if (videoId) {
      // Getting the video details and setting the player SDK
      getVideoDetails();
    }
  }, [videoId]);

  useEffect(() => {
    if (playerSdk) {
      // 1. In this EventListener we can activate our player SDK methods when the player is ready to use
      playerSdk.addEventListener('ready', () => {
        setPlayerTheme();
        getDuration();
        playerSdk.hideControls(['more']);
      });

      // 2. Listen to the player's timestamp for notes
      // @ts-ignore: Unreachable code error
      playerSdk.addEventListener('timeupdate', ({ currentTime }) => {
        setCurrTimestamp({
          minutesFormat: getMinutesFormat(currentTime),
          seconds: currentTime,
        });
      });
    }
  }, [playerSdk]);

  useEffect(() => {
    // Once our video details are set, we can process it with symbl.ai to get conversationId
    // getConversationId()

    // After we get the conversationId, we need to track the processing status with jobId, then we can use:
    // getSummary()
    // getTranscription()
    // getTopics() 
  }, [video])


  const setPlayerTheme = () => {
    playerSdk.setTheme({
      trackPlayed: '#a435f0ff',
      trackUnplayed: '#6a6f73ff',
      trackBackground: '#6a6f73ff',
      link: '#d1d7dcff',
      linkActive: '#000'
    });
  }

  const getVideoAnalytics = async (player) => {
    const response = await fetch(`/api/analytics`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey: state.apiKey, videoId, metadata: { userName: state.userName } }),
    });
    const { data } = await response.json();
    if (data?.length) {
      const pauseSeconds = getLastPaused(data)
      if (pauseSeconds) player.setCurrentTime(pauseSeconds)
    }
  }

  const getLastPaused = (playerSessionData) => {
    // 1. Get the video's pause events
    const pauseEvents = playerSessionData.filter((item) => item.type === 'pause');
    if (pauseEvents.length) {
      // 2. Take the most recent pause seconds which is the last in the events
      const lastPauseSeconds = pauseEvents[pauseEvents.length - 1].at;
      return lastPauseSeconds
    }
  }

  const getVideoDetails = async () => {
    // 1. Get video details by videoId
    const response = await fetch(`/api/video`, {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: state.apiKey, videoId }),
    });
    const videoData = await response.json();
    setVideo(videoData);

    // 2. Create and set our player SDK
    const player = new PlayerSdk(document.getElementById('myVideo'), {
      id: videoData.videoId,
      hideTitle: true,
      metadata: { userName: state.userName }
    });
    setPlayerSdk(player);
    getVideoAnalytics(player)
  };


  const getConversationId = async () => {
    const response = await fetch('/api/get-conversation-id', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoUrl: video.assets.mp4, accessToken: state.accessToken }),
    });
    const data = await response.json();
    setConversationId(data.conversationId)
  }

  const getSummary = async () => {
    const response = await fetch(`/api/${conversationId}/get-summary`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.accessToken}`
      },
    });
    const data = await response.json();
    console.log('summary', data)
  }

  const getTranscription = async () => {
    const response = await fetch(`/api/${conversationId}/get-speech-to-text`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.accessToken}`
      },
    });
    const data = await response.json();
    console.log('transcription', data)
  }

  const getTopics = async () => {
    const response = await fetch(`/api/${conversationId}/get-topics`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.accessToken}`
      },
    });
    const data = await response.json();
    console.log('topics', data)
  }

  const getDuration = async () => {
    const duration = await playerSdk.getDuration();
    setVideoDuration(getSecondsToHours(duration));
  };

  const handleTranscript = () => {
    setOpenSidebar(true);
  };

  return (
    <>
      {video && (
        <>
          <Navbar videoMode video={video} />
          <Container>
            <VideoAndTabsContainer>
              <iframe
                width="100%"
                id={'myVideo'}
                height="600px"
                allowFullScreen
                style={{ border: 0 }}
              ></iframe>


              <ActionsContainer>
                <ActionBtn onClick={() => setCurrTab(tabNames.NOTES)}>
                  <MdEditNote size={'2rem'} />
                </ActionBtn>
                <ActionBtn>
                  <BsFillFileEarmarkTextFill
                    size={'2rem'}
                    onClick={handleTranscript}
                  />
                </ActionBtn>
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
            </VideoAndTabsContainer>
            {openSidebar && (
              <SidebarContainer>
                <SidebarTitle>
                  Transcript{' '}
                  <IconBtn onClick={() => setOpenSidebar(false)}>
                    <IoCloseOutline size={'1.5rem'} />
                  </IconBtn>
                </SidebarTitle>
                  Transcript here
              </SidebarContainer>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default VideoPage;
