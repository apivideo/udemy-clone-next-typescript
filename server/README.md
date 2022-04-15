# Set up Symbl Credentials
- Sign up for a Symbl Account by logging on to [platform.symbl.ai](https://platform.symbl.ai/#/signup?utm_source=get-info&utm_medium=janhavi&utm_campaign=rep). You can start off with Symbl's free plan that offers 1000 minutes every month. Upon sign up, you will be able to access your App ID and App Secret. 
- In the `server/config/config.json` file, enter these credentials in the double quotes:
  ```
  const SYMBL_APP_ID = "YOUR_APP_ID"
  const SYMBL_APP_SECRET = "YOUR_APP_SECRET"
  ```

# Run the server
## Development
You can start the server in development mode by running the following command:
```bash
npm run server-dev
```
from the root directory.

## Production
You can start the server in production by running the following command:
```bash
npm run server
```
in the root directory.

# How to use the server

## Send the videos you want to process
Start by sending the backend all the videos for which you want to get additional intelligence to the backend by hitting:
```
POST /api/content
```
The body of the request should be of the format 
```json
{
    "data": [
        {
            "videoId": "viXXXXXXXXXXXXXXXXXXXXXX",
            "publishedAt": "YYYY-MM-DDTHH:MM:SS+XX:YY",
            "assets": {
                "mp4": "https://cdn.api.video/vod/{videoId}/mp4/source.mp4"
            }
        },
        {
            "videoId": "viXXXXXXXXXXXXXXXXXXXXXX",
            "publishedAt": "YYYY-MM-DDTHH:MM:SS+XX:YY",
            "assets": {
                "mp4": "https://cdn.api.video/vod/{videoId}/mp4/source.mp4"
            }
        },
        ...
    ]
}
```
This follows the response returned by the [List All Videos](https://docs.api.video/reference/list-videos) request. 
Fields shown above are mandatory, whereas the other fields may or may not be sent.

**IMP:** The videos MUST be sent in the descending order of `publishedAt` time, i.e. the last published video should be at the top.

## Retrieve insights for specific videos
You can retrieve the insights per video using
```
GET /api/insights/:videoId
```
where `videoId` is the api.video videoId. The response will be as follows:
```json
    {
        "videoId": "viXXXXXXXXXXXXXXXXXXXXXX",
        "conversationId": "5815170693595136",
        "symbl_status": "completed"
    }
```
```
Parameter | Values
------------ | -------------
videoId | api.video videoId 
conversationId | Symbl's 16 digit conversation id
symbl_status | can be "pending", "job <JOB_ID> in_progress" or "completed".
```
All values are of type `string`. 

You can display insights when `symbl_status` becomes `"completed"`.
## Retrieve all data for all videos
You can retrieve data for all videos on backend by hitting
```
GET /
```
The response looks as follows:
```json
    [
        {
            "videoId": "viXXXXXXXXXXXXXXXXXXXXXX",
            "publishedAt": "2022-04-14T04:19:41+00:00",
            "videoUrl": "https://cdn.api.video/vod/viXXXXXXXXXXXXXXXXXXXXXX/mp4/source.mp4",
            "conversationId": "5920524994609152",
            "symbl_status": "completed",
            "captions_uploaded": false
        },
        {
            "videoId": "viXXXXXXXXXXXXXXXXXXXXXX",
            "publishedAt": "2022-04-14T17:48:51+00:00",
            "videoUrl": "https://cdn.api.video/vod/viXXXXXXXXXXXXXXXXXXXXXX/mp4/source.mp4",
            "conversationId": "5919959686316032",
            "symbl_status": "completed",
            "captions_uploaded": false
        }
    ]
```
