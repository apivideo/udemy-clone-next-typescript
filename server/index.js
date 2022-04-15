const express = require('express')
const videos = require('./content.json')
const ApiVideoClient = require('@api.video/nodejs-client');
const updateContent = require('./services/updateContentDb.service')

const app = express()
app.use(express.json())
const PORT = 3001

/* 
// list all videos (all pages)
let allVideos = [];
for(let currentPage=1 ; ; currentPage++) {
  const res = await client.videos.list({ currentPage });
  allVideos = [...allVideos, ...res.data];
  if(currentPage >= res.pagination.pagesTotal) {
    break;
  }
}

// list videos that have all the given tags (only first results page)
const videosWithTags = await client.videos.list({ tags: ["tag1", "tag2"] });

// list videos that have all the given metadata values (only first results page)
const videosWithMetadata = await client.videos.list({ metadata: { "key1": "value1", "key2": "value2" } })
*/

// Test if backend is up
app.get('/', (request, response) => {
    console.log("Sending all content")
    response.json(videos).end()
})

// Set api.video API KEY 
app.get('/api/authenticate', (request, response) => {
    try {
        const body = request.body
        const client = new ApiVideoClient({ apiKey: body.apiKey });
        // const accessToken = await client.getAccessToken();
        response.status(200).end()
    }
    catch (e) {
        console.log("Error generating access token:", e)
        response.status(400)
        response.json(e).end()
    }
})

// Get conversation id for specific video
app.get('/api/insights/:videoId', (request, response) => {
    const videoId = request.params.videoId
    const video = videos.find(video => video.videoId === videoId)
    if (video) {
        let response_object = {
            "videoId": video.videoId,
            "conversationId": video.conversationId,
            "symbl_status": video.symbl_status
        }
        response.json(response_object)

    } else {
        response.status(404).end()
    }
})

// get all videos when front-end loads first page
app.post('/api/content', (request, response) => {
    const data = request.body.data;
    const db = data.reduce((db, video) => {
        const new_video = {
            "videoId": video.videoId,
            "publishedAt": video.publishedAt,
            "videoUrl": video.assets.mp4
        }
        return db.concat(new_video)
    }, [])
    updateContent.updateContent(db)

    response.status(200).end()
})

/*app.get('/api/content', (request, response) => {
    response.json()
})*/




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})