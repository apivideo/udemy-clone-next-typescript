const content = require("../content.json")
const httpClient = require("axios");
const process = require('process')

const fetchSymblToken = async () => {
  try {
    const url = 'https://api.symbl.ai/oauth2/token:generate';
    const data = {
      type: 'application',
      appId: config.SYMBL_APP_ID,
      appSecret: config.SYMBL_APP_SECRET,
    };
    const response = await httpClient.post(url, data);
    const token = await response.data.accessToken;
    console.log('🦄 Symbl Authentication Successful - ', token);
    return token; // Store the response token
  } catch (error) {
    console.log(error);
  }
};

const postAsyncVideo = async (accessToken, videoUrl, videoId) => {
  const url = 'https://api.symbl.ai/v1/process/video/url';
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'x-api-key': accessToken,
    },
  };
  const data = {
    url: videoUrl,
    name: videoId ? videoId : '',
    enableSummary: true,
  };
  try {
    const response = await httpClient.post(url, data, axiosConfig);
    const conversationId = await response.data.conversationId;
    const jobId = await response.data.jobId;
    console.log('🦄 Symbl Async Request Successful! ', response.data);
    return { conversationId: conversationId, jobId: jobId };
  } catch (error) {
    console.log('🦄 Error in Async Request -', error);
  }
};

const poll = async function (accessToken, jobId, fnCondition, ms) {
  let result = await checkJobStatus(accessToken, jobId);
  while (fnCondition(result)) {
    await wait(ms);
    result = await checkJobStatus(accessToken, jobId);
  }
  return result;
};

const wait = function (ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const checkJobStatus = async (accessToken, jobId) => {
    const url = `https://api.symbl.ai/v1/job/${jobId}`
    const axiosConfig = {
        'headers': {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'x-api-key': accessToken
        }
    }
    console.log("CHECKING JOB STATUS for", jobId)
    try {
        const response = await httpClient.get(url, axiosConfig);
        const job_status = await response.data.status;
        return job_status;
    } catch (error) {
        console.log("Error in getting job status - ", error)
    }
}

const processSymbl = async () => {
  console.log('Symbl Processing Starting...');
  // get a list of all videos for whom symbl_status is "pending"
  const videos_to_process = content.filter(
    (video) => video.symbl_status === 'pending'
  );

  // get Symbl Access Token
  const accessToken = await fetchSymblToken();

    // we will process all videos one by one
    let next = 0;
    while (videos_to_process[next]) {
        const video = videos_to_process[next]
        console.log(video)
        const response = await postAsyncVideo(accessToken, video.videoUrl, video.videoId)
        const conversationId = await response.conversationId;
        const jobId = await response.jobId;
        video.symbl_status = `${jobId} in_progress`;
        video.conversationId = conversationId

    // Wait for processing to be complete
    let validate = (result) =>
      result === 'in_progress' || result === 'scheduled';
    let job_status = await poll(accessToken, jobId, validate, 3000); // loop executes for validate conditions
    console.log(`Job ${jobId}`, job_status);
    video.symbl_status = job_status;
    next += 1;
  }
};

module.exports = {
  processSymbl,
  fetchSymblToken,
};
