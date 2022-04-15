const fs = require("fs");
function addVideos(videos_to_be_added, content) {
    videos_to_be_added.forEach(video => {
        const content_object = {
            ...video,
            "conversationId": null,
            "symbl_status": "pending",
            "captions_uploaded": false
        }
        content.unshift(content_object)
        fs.writeFileSync("../content.json", JSON.stringify(content), err => {
            // Checking for errors
            if (err) throw err;
            console.log("Done writing"); // Success
        });
    })
    return;
}

module.exports = {
    addVideos
}