import axios from 'axios';

const handler = async (req, res) => {
    try {
        const { conversationId } = req.query;
        const result = await axios.get(
            `https://api.symbl.ai/v1/conversations/${conversationId}/topics`, {
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json'
            }
        }
        );
        const { topics } = result.data
        console.log('topicsRes', topics)
        res.status(200).json(topics);
    } catch (err) {
        console.error(err)
    }

};
export default handler;
