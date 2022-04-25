import { fetchSymblToken } from '../../services/processSymbl.service';

const handler = async (req, res) => {
    try {
        const accessToken = await fetchSymblToken();
        res.status(200).json({ accessToken });
    } catch (err) {
        console.error(err);
    }
};

export default handler;
