import ApiVideoClient from '@api.video/nodejs-client';

const handler = async (req, res) => {
  const apiKey = req.body.apiKey || process.env.API_KEY;
  const client = new ApiVideoClient({
    apiKey,
  });
  const { videoId, metadata } = req.body

  let { data } = await client.rawStatistics.listVideoSessions({ videoId, metadata })
  if(data.length){
  // We want to get the last session in the list because it's the most recent one
  const lastSession = data[data.length - 1].session
  // Get the player's session info by its sessionId
  const playerSession = await client.rawStatistics.listSessionEvents({ sessionId: lastSession.sessionId })
  res.status(200).json({ ...playerSession });
  return;
  }
};
export default handler;
