import content from '../../../../db/content.json';

const handler = async (req, res) => {
    const { videoId } = req.query;
    const video = content.find((video) => video.videoId === videoId);
    if (video) {
        const response_object = {
            videoId: video.videoId,
            conversationId: video.conversationId,
            symbl_status: video.symbl_status,
        };
        res.status(200).json(response_object);
        return;
    } else {
        res.status(404).end();
    }
}

export default handler