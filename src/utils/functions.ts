export const getSecondsToHours = (seconds: number) => {
    return (seconds / 3600).toFixed(3);
};

export const getMinutesFormat = (seconds: number) => {
    //mm:ss format
    return new Date(seconds * 1000).toISOString().slice(14, 19)
}

export const getVideoLastPaused = (playerSessionData) => {
    // 1. Get the video's pause events
    const pauseEvents = playerSessionData.filter(
        (item) => item.type === 'pause'
    );
    if (pauseEvents.length) {
        // 2. Take the most recent pause seconds which is the last in the events
        const lastPauseSeconds = pauseEvents[pauseEvents.length - 1].at;
        return lastPauseSeconds;
    }
};