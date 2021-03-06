import Navbar from '@components/Navbar';
import Content from '@components/Content';
import React, { useEffect, useState } from 'react';
import ApiKeyInput from '@components/Content/apiKeyInput';
import { useAuthContext } from '@components/Providers/Auth'
import { AuthActions } from '@components/Providers/Auth/reducer';
import Video from '@api.video/nodejs-client/lib/model/Video';
import Footer from '@components/Footer'

export default function Home() {

  const [videos, setVideos] = useState<Array<Video>>([]);
  const [apiKey, setApiKey] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const { state, dispatch } = useAuthContext()

  useEffect(() => {
    const storedApiKey = localStorage.getItem('api_key')
    let currentApiKey = ''
    let currentUserName = ''
    if (storedApiKey) {
      currentApiKey = JSON.parse(storedApiKey).apiKey || ''
      currentUserName = JSON.parse(storedApiKey).userName
      setApiKey(currentApiKey)
      setUserName(currentUserName)
    }
    getVideos(currentApiKey, currentUserName);
    getAuthToken()
  }, []);

  const getVideos = async (apiKey, userName) => {
    try {
      const response = await fetch('api/content', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });
      const { data } = await response.json();
      if (process.env.NEXT_PUBLIC_API_KEY !== apiKey) {
        dispatch({ type: AuthActions.SET_API_KEY, payload: { apiKey, userName: userName || 'Aya' } })
      }
      setLoading(false)
      setVideos(data);
    }
    catch (err) {
      setLoading(false)
      console.error(err)
    }
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
      <Navbar />
      <ApiKeyInput
        apiKey={apiKey}
        userName={userName}
        handleApiKey={handleApiKey}
        handleName={handleName}
        getVideos={getVideos}
        loading={loading}
        setLoading={setLoading}
      />
      <Content videos={videos} />
      <Footer />
    </>
  );
}
