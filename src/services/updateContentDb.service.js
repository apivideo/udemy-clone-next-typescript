import * as fs from 'fs';
import path from 'path';
import addVideos from './addVideos'
import Symbl from './processSymbl.service'

const content_file = fs.readFileSync('src/db/content.json');
let content = JSON.parse(content_file)

function updateContent(videos) {
  // Sorting videos so they are Always sorted by latest published video on top!!
  videos.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  if (videos.length > 0 && content.length > 0) {
    if (
      new Date(content[0].publishedAt).getTime() !==
      new Date(videos[0].publishedAt).getTime()
    ) {
      console.log('Updating...');
      // new videos have been added at top
      // add new videos to content
      const videos_to_be_added = videos.filter((video) => {
        const video_time = new Date(video.publishedAt).getTime();
        const content_time = new Date(content[0].publishedAt).getTime();
        return video_time > content_time;
      });
      addVideos.addVideos(videos_to_be_added, content); // actually adding the videos
    }
    // this means that we have caught up to latest videos
    // check if length is now equal
    // videos can only be equal or less than content
    // if equal, exit. if less than content, then videos have been deleted.
    if (content.length === videos.length) {
      // this means that no more updates. All done
      console.log('Update completed');
    } else {
      // some older video has been deleted
      // filter from content which are not in videos and perform deletions
      console.log('Something needs to be deleted.');
      return 'Update done';
    }
  } else {
    console.log('Adding new videos');
    addVideos.addVideos(videos, content);
    console.log('Update done');
  }
  Symbl.processSymbl();
  return 'Update done';
}

export default updateContent
