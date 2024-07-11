export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}:`;

    if (minutes < 10) {
      formattedTime += "0";
    }
  }

  formattedTime += `${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;

  return formattedTime;
};
