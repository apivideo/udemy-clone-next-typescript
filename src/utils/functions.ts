export const getSecondsToHours = (seconds: number) => {
    return (seconds / 3600).toFixed(3);
};

export const getMinutesFormat = (seconds: number) => {
    //mm:ss format
    return new Date(seconds * 1000).toISOString().slice(14, 19)
}