import { updateContent } from '../../../server/services/updateContentDb.service'

const handler = async (req, res) => {
  try {
    const { data } = req.body
    const result = updateContent(data)
    res.status(200).json({ result });
  }
  catch (err) {
    console.error(err)
  }
};

export default handler;
