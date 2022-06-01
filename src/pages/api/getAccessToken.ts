import processSymbl from '../../services/processSymbl.service';

const handler = async (req, res) => {
    try {
        const accessToken = await processSymbl.fetchSymblToken();
        res.status(200).json({ accessToken });
    } catch (err) {
        console.error(err);
    }
};

export default handler;
