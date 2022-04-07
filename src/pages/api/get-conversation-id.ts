import axios from 'axios';

const handler = async (req, res) => {
  try {
    const { videoUrl, accessToken } = req.body;
    const result = await axios.post(
      'https://api.symbl.ai/v1/process/video/url',
      { url: videoUrl },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const { conversationId } = result.data;
    res.status(200).json({ conversationId });
  } catch (err) {
    console.error(err);
  }
};
export default handler;
