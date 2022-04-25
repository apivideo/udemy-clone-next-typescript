import * as fs from 'fs';
import path from 'path';

function addVideos(videos_to_be_added, content) {
  if (videos_to_be_added) {
    videos_to_be_added.forEach((video) => {
      const content_object = {
        ...video,
        conversationId: null,
        symbl_status: 'pending',
        captions_uploaded: false,
      };
      content.unshift(content_object);
      const dbDir = path.resolve(process.cwd(), 'src/db');
      fs.writeFileSync(
        `${dbDir}/content.json`,
        JSON.stringify(content),
        (err) => {
          // Checking for errors
          if (err) throw err;
          console.log('Done writing'); // Success
        }
      );
    });
  }
  return;
}

module.exports = {
  addVideos,
};