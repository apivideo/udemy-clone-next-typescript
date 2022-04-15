const addVideos = require("./addVideos")
const content = require('../content.json');
const Symbl = require("./processSymbl.service")

function updateContent(videos) {
    if (content.length > 0)
    // ASSUMING THAT videos are Always sent sorted by publishedAt time with latest video on top!! 
    {
        if (new Date(content[0].publishedAt).getTime() !== new Date(videos[0].publishedAt).getTime()) {
            console.log("Updating...")
            // new videos have been added at top
            // add new videos to content

            const videos_to_be_added = videos.filter(video => {
                const video_time = new Date(video.publishedAt).getTime()
                const content_time = new Date(content[0].publishedAt).getTime()
                return (video_time > content_time)
            })
            addVideos.addVideos(videos_to_be_added, content);
            Symbl.processSymbl()
        }
        // this means that we have caught up to latest videos
        // check if length is now equal
        // videos can only be equal or less than content
        // if equal, exit. if less than content, then videos have been deleted.
        if (content.length === videos.length) {
            // this means that no more updates. All done
            console.log("Update completed")
            return "Update done";
        }
        else {
            // some older video has been deleted
            // filter from content which are not in videos and perform deletions
            console.log("Something needs to be deleted.")
            return "Update done";
        }
    } else {
        console.log("Adding new videos")
        addVideos.addVideos(videos, content)
        Symbl.processSymbl()
        console.log("Update done")
    }
}


module.exports = {
    updateContent
}