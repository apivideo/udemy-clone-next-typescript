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
    CreateNoteBtn,
    TimestampBtn,
    NotesContent,
    NoteEditContainer,
    NoteEditor,
    ButtonsContainer,
    CancelBtn,
    SaveBtn,
    EditorContainer,
    NotesContainer,
    NoteText,
    NoteItem
} from './style';
import { PlayerSdk } from '@api.video/player-sdk';
import { getSecondsToHours, getMinutesFormat } from '@utils/functions';
import { MdEditNote } from 'react-icons/md';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { HiPlusCircle } from 'react-icons/hi';

interface VideoPageProps { }

const tabNames = {
    OVERVIEW: 'Overview',
    NOTES: 'Notes',
};
interface Note {
    [key: string]: string;
}

const VideoPage: React.FC<VideoPageProps> = ({ }): JSX.Element => {
    const router = useRouter();
    const videoId = router?.query?.videoId;
    const [video, setVideo] = useState<Video>(null);
    const [playerSdk, setPlayerSdk] = useState<PlayerSdk>(undefined);
    const [videoDuration, setVideoDuration] = useState<string>(undefined);
    const [currTab, setCurrTab] = useState<string>(tabNames.OVERVIEW);
    const [currTimestamp, setCurrTimestamp] = useState('00:00');
    const [createNoteMode, setCreateNoteMode] = useState<boolean>(false);
    const [note, setNote] = useState('');
    const [notesList, setNotesList] = useState<Note>(null);

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
                // ... other optional options
            });
            player.showControls(['download']);
            setPlayerSdk(player);
        } catch (err) {
            console.error(err);
        }
    };

    const getTimestamp = async () => {
        setCurrTab(tabNames.NOTES);
    };

    useEffect(() => {
        if (playerSdk) {
            getDuration();
            playerSdk.addEventListener('timeupdate', ({ currentTime }) => {
                setCurrTimestamp(getMinutesFormat(currentTime));
            });
        }
    }, [playerSdk]);

    const getDuration = async () => {
        playerSdk.addEventListener('ready', () => {
            playerSdk.getDuration().then((duration) => {
                setVideoDuration(getSecondsToHours(duration));
            });
        });
    };

    const handleChangeNote = (e) => {
        setNote(e.target.value);
    };

    const handleSubmitNote = () => {
        setNotesList({ ...notesList, [currTimestamp]: note });
        setCreateNoteMode(false);
        setNote('')
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
                            <IconBtn onClick={getTimestamp}>
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
                                {!createNoteMode && (
                                    <>
                                        <CreateNoteBtn onClick={() => setCreateNoteMode(true)}>
                                            {`Create a new note at ${currTimestamp}`}
                                            <HiPlusCircle color={'#000'} size={'1.3rem'} />
                                        </CreateNoteBtn>
                                        {notesList && (
                                            <NotesContainer>
                                                {Object.keys(notesList).map((key, i) => {
                                                    return (
                                                        <NoteItem key={`note-${i}`}>
                                                            <TimestampBtn>{key}</TimestampBtn>
                                                            <NoteText>{notesList[key]}</NoteText>
                                                        </NoteItem>
                                                    );
                                                })}
                                            </NotesContainer>
                                        )}
                                    </>
                                )}

                                {createNoteMode && (
                                    <NoteEditContainer>
                                        <TimestampBtn>
                                            {currTimestamp ? currTimestamp : '00:00'}
                                        </TimestampBtn>
                                        <EditorContainer>
                                            <NoteEditor value={note} onChange={handleChangeNote} />
                                            <ButtonsContainer>
                                                <CancelBtn onClick={() => setCreateNoteMode(false)}>
                                                    Cancel
                        </CancelBtn>
                                                <SaveBtn onClick={handleSubmitNote}>Save</SaveBtn>
                                            </ButtonsContainer>
                                        </EditorContainer>
                                    </NoteEditContainer>
                                )}
                            </NotesContent>
                        </TabsContainer>
                    </Container>
                </>
            )}
        </>
    );
};

export default VideoPage;
