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
  TranscriptContainer,
  TranscriptTitle,
  IconBtn,
  VideoAndTabsContainer,
  OverviewContent,
  TranscriptContent,
  MobileTranscriptContainer,
  OverviewSummary,
} from './style';
import { PlayerSdk } from '@api.video/player-sdk';
import { getSecondsToHours, getMinutesFormat } from '@utils/functions';
import { MdEditNote } from 'react-icons/md';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';
import Notes from './Notes';
import { useAuthContext } from '@components/Providers/Auth';
import { AuthActions } from '@components/Providers/Auth/reducer';
import { access } from 'fs';

const tabNames = {
  OVERVIEW: 'Overview',
  NOTES: 'Notes',
};

export interface Timestamp {
  minutesFormat: string;
  seconds: number;
}

export interface Note {
  [key: string]: { note: string; seconds: number };
}

interface Summary {
  id: string;
  messageRefs: Array<{ id: string }>;
  text: string;
}

const VideoPage: React.FC = (): JSX.Element => {
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
  const [notesList, setNotesList] = useState<Note>(null);
  const [createNoteMode, setCreateNoteMode] = useState<boolean>(false);
  // [Symbl.ai]
  const [conversationId, setConversationId] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [summary, setSummary] = useState<Array<Summary>>([]);
  const [transcription, setTranscription] = useState([]);
  const [topics, setTopics] = useState([]);

  const { state, dispatch } = useAuthContext();

  useEffect(() => {
    const storedData = localStorage.getItem('api_key');
    if (storedData) {
      dispatch({
        type: AuthActions.SET_API_KEY,
        payload: {
          apiKey: JSON.parse(storedData).apiKey,
          userName: JSON.parse(storedData).userName,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (videoId) {
      // Getting the video details and setting the player SDK
      getVideoDetails();
      // Calling video insights
      getVideoInsights();
      // Generate symbl.ai access token
      getAccessToken();
    }
  }, [videoId]);

  const getVideoInsights = async () => {
    const result = await fetch(
      `http://localhost:3001/api/insights/${videoId}`,
      { method: 'Get' }
    );
    const res = await result.json();
    console.log('status', res);
    if (res.symbl_status === 'completed') {
      console.log('conversationId', res.conversationId);
      setConversationId(res.conversationId);
    }
  };

  useEffect(() => {
    if (playerSdk) {
      // 1. In this EventListener we can activate our player SDK methods when the player is ready to use
      playerSdk.addEventListener('ready', () => {
        setPlayerTheme();
        getDuration();
        playerSdk.hideControls(['more']);
      });

      // 2. Listen to the player's timestamp for notes
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      playerSdk.addEventListener('timeupdate', ({ currentTime }) => {
        setCurrTimestamp({
          minutesFormat: getMinutesFormat(currentTime),
          seconds: currentTime,
        });
        localStorage.setItem(`time_${videoId}`, JSON.stringify(currentTime));
      });
    }
  }, [playerSdk]);

  // [Symbl.ai]
  useEffect(() => {
    // If we have conversationId and accessToken, we can call the conversation api's
    if (conversationId && accessToken) {
      getSummary();
      getTranscription();
      getTopics()
    }
  }, [conversationId, accessToken]);

  const getAccessToken = async () => {
    const result = await fetch(`/api/getAccessToken`, {
      method: 'Get',
    });
    const { accessToken } = await result.json();
    if (accessToken) {
      setAccessToken(accessToken);
    }
  };

  const setPlayerTheme = () => {
    playerSdk.setTheme({
      trackPlayed: '#a435f0ff',
      trackUnplayed: '#6a6f73ff',
      trackBackground: '#6a6f73ff',
      link: '#d1d7dcff',
      linkActive: '#000',
    });
  };

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
      hidePoster: true,
    });
    const hasTime = localStorage.getItem(`time_${videoData.videoId}`);
    if (hasTime) {
      player.setCurrentTime(parseInt(hasTime));
    }
    setPlayerSdk(player);
  };

  // [Symbl.ai]
  const getSummary = async () => {
    const response = await fetch(`/api/${conversationId}/get-summary`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (data.length) {
      setSummary(data);
    }
  };

  const getTranscription = async () => {
    const response = await fetch(`/api/${conversationId}/get-speech-to-text`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (data.length) {
      setTranscription(data);
    }
    console.log('transcription', data);
  };

  const getTopics = async () => {
    console.log('getting topics')
    const response = await fetch(`/api/${conversationId}/get-topics`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('data', data)
    if (data.length) {
      setTopics(data)
      console.log('tpics', data)
    }
  };

  const getDuration = async () => {
    const duration = await playerSdk.getDuration();
    setVideoDuration(getSecondsToHours(duration));
  };

  const handleTranscript = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleNote = () => {
    setCurrTab(tabNames.NOTES);
    playerSdk.pause();
    setCreateNoteMode(true);
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
              />

              <ActionsContainer>
                <ActionBtn onClick={handleNote}>
                  <MdEditNote size={'2rem'} />
                </ActionBtn>
                {transcription && transcription.length ? (
                  <ActionBtn onClick={handleTranscript}>
                    <BsFillFileEarmarkTextFill size={'2rem'} />
                  </ActionBtn>
                ) : null}
              </ActionsContainer>
              {openSidebar && (
                <MobileTranscriptContainer>
                  <TranscriptTitle>
                    Transcript
                    <IconBtn onClick={() => setOpenSidebar(false)}>
                      <IoCloseOutline size={'2rem'} />
                    </IconBtn>
                  </TranscriptTitle>
                  <TranscriptContent>
                    {transcription.map((item, i) => {
                      return <span key={`t-${i}`}>{item.text}</span>;
                    })}
                  </TranscriptContent>
                </MobileTranscriptContainer>
              )}
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
                  <OverviewContent>
                    {`Duration: ${videoDuration && videoDuration} hours`}

                    {summary && summary.length ? (
                      <>
                        <OverviewSummary>
                          <h3>Summary</h3>
                          {summary.map((item, i) => {
                            return <span key={`s-${i}`}>{item.text}</span>;
                          })}
                        </OverviewSummary>
                      </>
                    ) : null}
                  </OverviewContent>
                </TabsContent>
                <NotesContent value={tabNames.NOTES}>
                  <Notes
                    notesList={notesList}
                    setNotesList={setNotesList}
                    playerSdk={playerSdk}
                    currTimestamp={currTimestamp}
                    createNoteMode={createNoteMode}
                    setCreateNoteMode={setCreateNoteMode}
                  />
                </NotesContent>
              </TabsContainer>
            </VideoAndTabsContainer>
            {openSidebar && (
              <TranscriptContainer>
                <TranscriptTitle>
                  Transcript
                  <IconBtn onClick={() => setOpenSidebar(false)}>
                    <IoCloseOutline size={'1.5rem'} />
                  </IconBtn>
                </TranscriptTitle>
                <TranscriptContent>
                  {transcription.map((item, i) => {
                    return <span key={`t-${i}`}>{item.text}</span>;
                  })}
                </TranscriptContent>
              </TranscriptContainer>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default VideoPage;
