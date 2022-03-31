import ApiVideoClient from '@api.video/nodejs-client';

const handler = async (req, res) => {
  // Get the list of contents
  const { title } = req.body;
  const apiKey = process.env.API_KEY;

  const client = new ApiVideoClient({
    apiKey,
  });

  let result = await client.videos.list({ title });
  res.status(200).json({ ...result });
  return;
};
export default handler;
