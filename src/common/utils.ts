export const getApiUrl = () => {
  const API_URL = "https://flight-status-mock.core.travelopia.cloud/flights";
  return API_URL;
};

export const formatUTCDateTime = (utcString: string): string => {
  const date = new Date(utcString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(date);
};
