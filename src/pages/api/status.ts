import ApiVideoClient from '@api.video/nodejs-client';

const handler = async (req, res) => {
    const apiKey = req.body.apiKey || process.env.API_KEY;
    const client = new ApiVideoClient({
        apiKey,
    });
    const { videoId } = req.body
    const { encoding } = await client.videos.getStatus(videoId);
    res.status(200).json({ ...encoding });
    return;
};
export default handler;
