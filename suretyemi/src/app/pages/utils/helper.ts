
// timer for otp verification
export const convertMinutesSeconds = (time: any) => {
    const minutes = time / 60;
    const convertMinutesTostring = minutes.toString()?.split(".")[0];
    const mualtipleableValue = minutes.toString()?.split(".").length > 1 ? Number(convertMinutesTostring) : Number(convertMinutesTostring) - 1
    const second = time - (mualtipleableValue * 60);

    return { convertedminutes: mualtipleableValue, convertedseconds: second }
}

export const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};