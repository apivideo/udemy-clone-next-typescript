import updateContent from '../../../services/updateContentDb.service';

// get all videos when front-end loads first page
const handler = async (req, res) => {
  const data = req.body.data;
  const db = data.reduce((db, video) => {
    const new_video = {
      videoId: video.videoId,
      publishedAt: video.publishedAt,
      videoUrl: video.assets.mp4,
    };
    return db.concat(new_video);
  }, []);
  updateContent(db);
  res.status(200).end();
};

export default handler;
