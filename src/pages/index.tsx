import Head from 'next/head';
import Navbar from '@components/Navbar';
import Content from '@components/Content';
import React, { useEffect, useState } from 'react';
import ApiKeyInput from '@components/Content/apiKeyInput';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [apiKey, setApiKey] = useState('');


  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const response = await fetch('api/content', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: apiKey }),
    });
    const { data } = await response.json();
    setVideos(data);
  };

  const handleApiKey = (e) => {
    setApiKey(e.target.value);
  };

  return (
    <div>
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
    </div>
  );
}
