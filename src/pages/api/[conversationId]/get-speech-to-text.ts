import axios from 'axios';

const handler = async (req, res) => {
  try {
    const { conversationId } = req.query;
    const result = await axios.get(
      `https://api.symbl.ai/v1/conversations/${conversationId}/messages`, {
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json'
      }
    }
    );
    const { messages } = result.data
     res.status(200).json(messages);
  } catch (err) {
    console.error(err)
  }

};
export default handler;
