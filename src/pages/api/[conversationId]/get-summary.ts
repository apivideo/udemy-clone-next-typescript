import axios from 'axios';

const handler = async (req, res) => {
  try {
    const { conversationId } = req.query;
    const result = await axios.get(
      `https://api.symbl.ai/v1/conversations/${conversationId}/summary?refresh=true`, {
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json'
      }
    }
    );
    const { summary } = result.data
    console.log('summaryRes', summary)
    res.status(200).json(summary);
  } catch (err) {
    console.error(err)
  }

};
export default handler;
