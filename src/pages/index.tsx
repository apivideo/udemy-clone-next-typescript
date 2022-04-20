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
  const [loading, setLoading] = useState<boolean>(false)
  const { state, dispatch } = useAuthContext()

  useEffect(() => {
    const hasLocalStorage = localStorage.getItem('api_key')
    let currentApiKey = ''
    let currentUserName = ''
    if (hasLocalStorage) {
      currentApiKey = JSON.parse(hasLocalStorage).apiKey || ''
      currentUserName = JSON.parse(hasLocalStorage).userName
      setApiKey(currentApiKey)
      setUserName(currentUserName)
    }
    getVideos(currentApiKey, currentUserName);
    // getAuthToken()
  }, []);

  const getVideos = async (apiKey, userName) => {
    try {
      const response = await fetch('api/videos', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey }),
      });
      const { data } = await response.json();
      dispatch({ type: AuthActions.SET_API_KEY, payload: { apiKey, userName: userName || state.userName } })
      setLoading(false)
      getContent(data)
      setVideos(data);
    }
    catch (err) {
      setLoading(false)
      console.error(err)
    }
  };

  const getContent = async (data) => {
    const response = await fetch('api/content', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videos: data }),
    });
    const res = await response.json()
    console.log('resssponse', res)

    // dispatch({ type: AuthActions.SET_ACCESS_TOKEN, payload: accessToken })
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
    </>
  );
}
