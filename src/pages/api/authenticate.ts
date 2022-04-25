
import ApiVideoClient from '@api.video/nodejs-client'

const handler = async (req, res) => {
    try {
        const body = req.body;
        const client = new ApiVideoClient({ apiKey: body.apiKey });
        // const accessToken = await client.getAccessToken();
        res.status(200).end();
      } catch (e) {
        console.log('Error generating access token:', e);
        res.status(400);
        res.json(e).end();
      }
}

export default handler