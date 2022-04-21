import { updateContent } from '../../../server/services/updateContentDb.service'

const handler = async (req, res) => {
  try {
    const { videos } = req.body
    const result = updateContent(videos)
    res.status(200).json({ result });
  }
  catch (err) {
    console.error(err)
  }
};

export default handler;
