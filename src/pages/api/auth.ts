import axios from 'axios';

const handler = async (req, res) => {
  try {
    const appId = process.env.SYMBL_APP_ID;
    const appSecret = process.env.SYMBL_APP_SECRET;
    const url = 'https://api.symbl.ai/oauth2/token:generate';
    const data = {
      type: 'application',
      appId,
      appSecret,
    };
    const result = await axios.post(url, data);
      const { accessToken } = result.data;
      res.status(200).json({ accessToken });
  }
  catch (err) {
    console.error(err)
  }
};

export default handler;
