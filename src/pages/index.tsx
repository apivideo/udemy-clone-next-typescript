import Head from 'next/head';
import Navbar from '@components/Navbar';
import Content from '@components/Content';
import React, { useEffect, useState } from 'react';
import ApiKeyInput from '@components/Content/apiKeyInput';
import { useAuthContext } from '@components/Providers/Auth'
import { AuthActions } from '@components/Providers/Auth/reducer';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [apiKey, setApiKey] = useState('');
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
    dispatch({ type: AuthActions.SET_API_KEY, payload: { apiKey: apiKey } })
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

  return (
    <>
      <Head>
        <title>Udemy</title>
        <link rel="icon" href="/learn-icon.png" />
      </Head>
      <Navbar />
      <ApiKeyInput
        apiKey={apiKey}
        handleApiKey={handleApiKey}
        getVideos={getVideos}
      />
      <Content videos={videos} />
    </>
  );
}
