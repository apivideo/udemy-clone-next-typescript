import Head from 'next/head';
import Navbar from '@components/Navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Udemy</title>
        <link rel="icon" href="/learn-icon.png" />
      </Head>
      <Navbar />
    </div>
  );
}
