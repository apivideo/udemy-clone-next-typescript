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
    if (playerSdk) {
      // In this EventListener we can activate our player SDK methods when the player is ready to use
      playerSdk.addEventListener('ready', () => {
        setPlayerTheme();
        getDuration();
        playerSdk.hideControls(['more']);
      });

      // Listen to the player's timestamp for notes
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
    if (videoId) {
      getVideoId();
    }
  }, [videoId]);

  useEffect(() => {
    if (video) {
      //When video ready, get conversationId
      // getConversationId()
      videoSdk();
    }
  }, [video]);

  useEffect(() => {
    //When we have conversationId, get summary, transcription and topics
    if (conversationId) {
      console.log({ conversationId })
      // getSummary()
      // getTranscription()
      // getTopics()
    }
  }, [conversationId])

  const setPlayerTheme = () => {
    playerSdk.setTheme({
      trackUnplayed: '#6a6f73ff',
      trackPlayed: '#a435f0ff',
      trackBackground: '#a435f0ff',
      link: '#d1d7dcff',
      linkActive: '#000'
    });
  }

  const getVideoId = async () => {
    const response = await fetch(`/api/video`, {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: process.env.API_KEY, videoId }),
    });
    const data = await response.json();
    setVideo(data);
  };

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
