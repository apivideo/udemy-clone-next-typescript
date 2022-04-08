import Head from 'next/head';
import Navbar from '@components/Navbar';
import Content from '@components/Content';
import React, { useEffect, useState } from 'react';
import ApiKeyInput from '@components/Content/apiKeyInput';
import { useAuthContext } from '@components/Providers/Auth'
import { AuthActions } from '@components/Providers/Auth/reducer';
import Video from '@api.video/nodejs-client/lib/model/Video';

export default function Home() {
  const [videos, setVideos] = useState<Array<Video>>([]);
  const [apiKey, setApiKey] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const { state, dispatch } = useAuthContext()

  useEffect(() => {
    getVideos();
    getAuthToken()
  }, []);

  const getVideos = async () => {
    const response = await fetch('api/content', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: apiKey }),
    });
    const { data } = await response.json();
    dispatch({ type: AuthActions.SET_API_KEY, payload: { apiKey, userName: userName || state.userName  }})
    setVideos(data);
  };

  const getAuthToken = async () => {
    const response = await fetch('api/auth', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
    });
    const accessToken = await response.json()
    dispatch({ type: AuthActions.SET_ACCESS_TOKEN, payload: accessToken })
  }

  const handleApiKey = (e) => {
    setApiKey(e.target.value);
  };

  const handleName = (e) => {
    setUserName(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Udemy</title>
        <link rel="icon" href="/learn-icon.png" />
      </Head>
      <Navbar />
      <ApiKeyInput
        apiKey={apiKey}
        userName={userName}
        handleApiKey={handleApiKey}
        handleName={handleName}
        getVideos={getVideos}
      />
      <Content videos={videos} />
    </>
  );
}
