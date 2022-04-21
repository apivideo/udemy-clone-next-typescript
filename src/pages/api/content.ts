import ApiVideoClient from '@api.video/nodejs-client';

const handler = async (req, res) => {
  // Get the list of contents
  const apiKey = req.body.apiKey || process.env.NEXT_PUBLIC_API_KEY;
  const client = new ApiVideoClient({
    apiKey,
  });

  const result = await client.videos.list({});
  res.status(200).json({ ...result });
  return;
};
export default handler;
