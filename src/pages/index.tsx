import Head from 'next/head';
import Navbar from '@components/Navbar';
import Content from '@components/Content';
import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const response = await fetch('api/content', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
    });

    const { data } = await response.json();
    setVideos(data);
  };
  return (
    <div>
      <Head>
        <title>Udemy</title>
        <link rel="icon" href="/learn-icon.png" />
      </Head>
      <Navbar />
      <Content videos={videos} />
    </div>
  );
}
